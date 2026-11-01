import orchestrator from "tests/orchestrator.js";
import webserver from "infra/webserver";
import user from "models/user.js";
import password from "models/password.js";

import { version as uuidVersion } from "uuid";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("PATCH api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With a existent 'username'", async () => {
      await orchestrator.createUser({ username: "user1" });

      const response = await fetch(`${webserver.origin}/api/v1/users/user1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "user2",
        }),
      });

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "ForbidenError",
        message: "Você não possui permissão para essa ação.",
        action: 'Verifique se o seu usuário possui a feature "update:user".',
        status_code: 403,
      });
    });
  });

  describe("Default user", () => {
    test("With user1 targeting user2", async () => {
      const createdUser = await orchestrator.createUser();
      await orchestrator.activateUser(createdUser);
      const sessionObject1 = await orchestrator.createSession(createdUser.id);

      const createdsUser2 = await orchestrator.createUser();

      const response = await fetch(
        `${webserver.origin}/api/v1/users/${createdsUser2.username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject1.token}`,
          },
          body: JSON.stringify({
            username: `${createdsUser2.username}updated`,
          }),
        },
      );
      expect(response.status).toBe(403);

      const responseBodyDuplicated = await response.json();

      expect(responseBodyDuplicated).toEqual({
        name: "ForbidenError",
        message: "Você não possui permissão para atualizar outro usuário.",
        action:
          "Verifique se você possui a feature necessária para atualizar outro usuário.",
        status_code: 403,
      });
    });

    test("With a nonexistent 'username'", async () => {
      const createdUser = await orchestrator.createUser();
      await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(createdUser.id);

      const response = await fetch(
        `${webserver.origin}/api/v1/users/nonExistentUsername`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({
            username: "test",
          }),
        },
      );

      const responseBodyDuplicated = await response.json();

      expect(responseBodyDuplicated).toEqual({
        name: "NotFoundError",
        message: "O username informado não foi encontrado no sistema.",
        action: "Verifique se o username informado está digitado corretamente.",
        status_code: 404,
      });
      expect(response.status).toBe(404); // HTTP 400 = Error
    });

    test("With duplicated 'username'", async () => {
      const createdUser = await orchestrator.createUser();
      await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(createdUser.id);

      await orchestrator.createUser({
        username: "Username2",
      });

      const response = await fetch(
        `${webserver.origin}/api/v1/users/${createdUser.username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({
            username: "Username2",
          }),
        },
      );

      const responseBodyDuplicated = await response.json();

      expect(responseBodyDuplicated).toEqual({
        name: "ValidationError",
        message: "O username informado já está em uso.",
        action: "Utilize outro username para realizar esta operação.",
        status_code: 400,
      });
      expect(response.status).toBe(400);
    });

    test("With duplicated 'email'", async () => {
      const createdUser = await orchestrator.createUser();
      await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(createdUser.id);

      await orchestrator.createUser({
        email: "Email2@curso.dev",
      });

      const response = await fetch(
        `${webserver.origin}/api/v1/users/${createdUser.username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({
            email: "Email2@curso.dev",
          }),
        },
      );

      const responseBodyDuplicated = await response.json();

      expect(responseBodyDuplicated).toEqual({
        name: "ValidationError",
        message: "O email informado já está em uso.",
        action: "Utilize outro email para realizar esta operação.",
        status_code: 400,
      });
      expect(response.status).toBe(400); // HTTP 400 = Error
    });

    test("With unique 'username'", async () => {
      const createdUser = await orchestrator.createUser();
      await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(createdUser.id);

      const response = await fetch(
        `${webserver.origin}/api/v1/users/${createdUser.username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({
            username: "uniqueUsername2",
          }),
        },
      );

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "uniqueUsername2",
        email: createdUser.email,
        password: responseBody.password,
        features: ["create:session", "read:session", "update:user"],
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With unique 'email'", async () => {
      const createdUser = await orchestrator.createUser();
      await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(createdUser.id);

      const response = await fetch(
        `${webserver.origin}/api/v1/users/${createdUser.username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({
            email: "uniqueEmail2@curso.dev",
          }),
        },
      );

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: createdUser.username,
        email: "uniqueEmail2@curso.dev",
        password: responseBody.password,
        features: ["create:session", "read:session", "update:user"],
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("Update 'password'", async () => {
      const createdUser = await orchestrator.createUser();
      await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(createdUser.id);

      const response = await fetch(
        `${webserver.origin}/api/v1/users/${createdUser.username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({
            password: "password2",
          }),
        },
      );

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: createdUser.username,
        email: createdUser.email,
        password: responseBody.password,
        features: ["create:session", "read:session", "update:user"],
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      expect(responseBody.updated_at > responseBody.created_at).toBe(true);

      const userInDatabase = await user.findOneByUsername(createdUser.username);
      const correctPassword = await password.compare(
        "password2",
        userInDatabase.password,
      );
      const incorrectPassword = await password.compare(
        "password1",
        userInDatabase.password,
      );

      expect(correctPassword).toBe(true);
      expect(incorrectPassword).toBe(false);
    });
  });

  describe("Privilege user", () => {
    test("With `update:user:others` targeting `defaultUser`", async () => {
      const privilegedUser = await orchestrator.createUser();
      await orchestrator.activateUser(privilegedUser);
      const sessionObject1 = await orchestrator.createSession(
        privilegedUser.id,
      );
      await user.addFeatures(privilegedUser.id, ["update:user:others"]);

      const defaultUser = await orchestrator.createUser();

      const response = await fetch(
        `${webserver.origin}/api/v1/users/${defaultUser.username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject1.token}`,
          },
          body: JSON.stringify({
            username: `${defaultUser.username}updated`,
          }),
        },
      );

      expect(response.status).toBe(200);
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: `${defaultUser.username}updated`,
        features: defaultUser.features,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });
  });
});
