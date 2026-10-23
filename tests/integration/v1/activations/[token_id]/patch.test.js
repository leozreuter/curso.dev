import webserver from "infra/webserver";
import activation from "models/activation";
import user from "models/user";
import orchestrator from "tests/orchestrator.js";
import { version as uuidVersion } from "uuid";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("PATCH api/v1/activations/[token_id]", () => {
  describe("Anonymous user", () => {
    test("With non-existent token", async () => {
      const response = await fetch(
        `${webserver.origin}/api/v1/activations/12345678-abcd-abcd-abcd-123456789abc`,
        { method: "PATCH" },
      );
      expect(response.status).toBe(404);
      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "NotFoundError",
        message:
          "O token de ativação não foi encontrado no sistema ou expirou.",
        action: "Realize um novo cadastro.",
        status_code: 404,
      });
    });

    test("With expired token", async () => {
      jest.useFakeTimers({
        now: new Date(Date.now() - activation.EXPIRATION_IN_MILLISECONDS),
      });

      const createdUser = await orchestrator.createUser();
      const expiredActivationToken = await activation.create(createdUser.id);

      jest.useRealTimers();

      const response = await fetch(
        `${webserver.origin}/api/v1/activations/${expiredActivationToken.id}`,
        { method: "PATCH" },
      );

      expect(response.status).toBe(404);
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "NotFoundError",
        message:
          "O token de ativação não foi encontrado no sistema ou expirou.",
        action: "Realize um novo cadastro.",
        status_code: 404,
      });
    });

    test("With already used token", async () => {
      const createdUser = await orchestrator.createUser();
      const activationObject = await activation.create(createdUser.id);

      const resp1 = await fetch(
        `${webserver.origin}/api/v1/activations/${activationObject.id}`,
        { method: "PATCH" },
      );

      expect(resp1.status).toBe(200);

      const resp2 = await fetch(
        `${webserver.origin}/api/v1/activations/${activationObject.id}`,
        { method: "PATCH" },
      );
      expect(resp2.status).toBe(404);
      const resp2Body = await resp2.json();
      expect(resp2Body).toEqual({
        name: "NotFoundError",
        message:
          "O token de ativação não foi encontrado no sistema ou expirou.",
        action: "Realize um novo cadastro.",
        status_code: 404,
      });
    });

    test("With valid token", async () => {
      const createdUser = await orchestrator.createUser();
      const activationObject = await activation.create(createdUser.id);

      const response = await fetch(
        `${webserver.origin}/api/v1/activations/${activationObject.id}`,
        { method: "PATCH" },
      );
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        id: activationObject.id,
        user_id: createdUser.id,
        used_at: responseBody.used_at,
        expires_at: activationObject.expires_at.toISOString(),
        created_at: activationObject.created_at.toISOString(),
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(uuidVersion(responseBody.user_id)).toBe(4);

      expect(Date.parse(responseBody.expires_at)).not.toBeNaN();
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      expect(responseBody.updated_at > responseBody.created_at).toBe(true);

      const expiresAt = new Date(responseBody.expires_at);
      const createdAt = new Date(responseBody.created_at);

      expiresAt.setMilliseconds(0);
      createdAt.setMilliseconds(0);

      expect(expiresAt - createdAt).toBe(activation.EXPIRATION_IN_MILLISECONDS);

      const activatedUser = await user.findOneById(responseBody.user_id);
      expect(activatedUser.features).toEqual([
        "create:session",
        "read:session",
        "update:user",
      ]);
    });

    test("With valid token but already activated user", async () => {
      const createdUser = await orchestrator.createUser();
      await orchestrator.activateUser(createdUser);

      const activationObject = await activation.create(createdUser.id);

      const response = await fetch(
        `${webserver.origin}/api/v1/activations/${activationObject.id}`,
        { method: "PATCH" },
      );

      expect(response.status).toBe(403);
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbidenError",
        message: "Você não pode mais usar um token de ativação.",
        action: "Entre em contato com o suporte.",
        status_code: 403,
      });
    });
  });
  describe("Default user", () => {
    test("With valid token but already logged user", async () => {
      const createdUser1 = await orchestrator.createUser();
      await orchestrator.activateUser(createdUser1);
      const sessionObjectUser1 = await orchestrator.createSession(
        createdUser1.id,
      );

      const createdUser2 = await orchestrator.createUser();
      const activationObjectUser2 = await activation.create(createdUser2.id);

      const response = await fetch(
        `${webserver.origin}/api/v1/activations/${activationObjectUser2.id}`,
        {
          method: "PATCH",
          headers: { Cookie: `session_id=${sessionObjectUser1.token}` },
        },
      );

      expect(response.status).toBe(403);
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbidenError",
        message: "Você não possui permissão para essa ação.",
        action:
          'Verifique se o seu usuário possui a feature "read:activation_token".',
        status_code: 403,
      });
    });
  });
});
