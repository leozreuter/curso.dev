import { version as uuidVersion } from "uuid";

import orchestrator from "tests/orchestrator.js";
import webserver from "infra/webserver";
import user from "models/user.js";
import password from "models/password.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST api/v1/users", () => {
  describe("Anonymous user", () => {
    test("With unique and valid data", async () => {
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "lreuter",
          email: "lreuter@curso.dev",
          password: "teste",
        }),
      });

      const responseBody = await response.json();

      expect(response.status).toBe(201); // HTTP 201 = Created
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "lreuter",
        features: ["read:activation_token"],
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      const userInDatabase = await user.findOneByUsername("lreuter");
      const correctPassword = await password.compare(
        "teste",
        userInDatabase.password,
      );
      const incorrectPassword = await password.compare(
        "senhaErrada",
        userInDatabase.password,
      );

      expect(correctPassword).toBe(true);
      expect(incorrectPassword).toBe(false);
    });

    test("With duplicated 'email'", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "emailduplicado1",
          email: "email@email.qa",
          password: "qa_passwd",
        }),
      });
      const responseBody1 = await response1.json();
      expect(responseBody1).toEqual({
        id: responseBody1.id,
        username: "emailduplicado1",
        features: ["read:activation_token"],
        created_at: responseBody1.created_at,
        updated_at: responseBody1.updated_at,
      });
      expect(response1.status).toBe(201); // HTTP 201 = Created

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "emailduplicado2",
          email: "Email@email.qa",
          password: "qa_passwd",
        }),
      });

      const responseBodyDuplicated = await response2.json();

      expect(responseBodyDuplicated).toEqual({
        name: "ValidationError",
        message: "O email informado já está em uso.",
        action: "Utilize outro email para realizar esta operação.",
        status_code: 400,
      });
      expect(response2.status).toBe(400);
    });

    test("With duplicated 'username'", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "username",
          email: "username@email.qa",
          password: "qa_passwd",
        }),
      });
      expect(response1.status).toBe(201); // HTTP 201 = Created

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Username",
          email: "username2@email.qa",
          password: "qa_passwd",
        }),
      });

      const responseBodyDuplicated = await response2.json();

      expect(responseBodyDuplicated).toEqual({
        name: "ValidationError",
        message: "O username informado já está em uso.",
        action: "Utilize outro username para realizar esta operação.",
        status_code: 400,
      });
      expect(response2.status).toBe(400); // HTTP 400 = Error
    });
  });

  describe("Default user", () => {
    test("Logged user trying to create another user", async () => {
      const createdUser = await orchestrator.createUser();
      await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(createdUser.id);

      const resp = await fetch(`${webserver.origin}/api/v1/users`, {
        method: "POST",
        body: JSON.stringify({
          username: "lreuter",
          email: "lreuter@curso.dev",
          password: "teste",
        }),
        headers: { Cookie: `session_id=${sessionObject.token}` },
      });

      expect(resp.status).toBe(403);
      const respBody = await resp.json();
      expect(respBody).toEqual({
        name: "ForbidenError",
        message: "Você não possui permissão para essa ação.",
        action: `Verifique se o seu usuário possui a feature "create:user".`,
        status_code: 403,
      });
    });
  });
});
