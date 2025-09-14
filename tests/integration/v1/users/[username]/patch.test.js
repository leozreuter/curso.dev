import orchestrator from "tests/orchestrator.js";
import { version as uuidVersion } from "uuid";

import user from "models/user.js";
import password from "models/password.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With a nonexistent 'username'", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/nonExistentUsername",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "test",
          }),
        },
      );

      const responseBodyDuplicated = await response.json();

      expect(responseBodyDuplicated).toEqual({
        name: "NotFoundError",
        message: "O username informado não foi encontrado no sistemas.",
        action: "Verifique se o username informado está digitado corretamente.",
        status_code: 404,
      });
      expect(response.status).toBe(404); // HTTP 400 = Error
    });

    test("With duplicated 'username'", async () => {
      await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Username1",
          email: "Username1@curso.dev",
          password: "123",
        }),
      });

      await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Username2",
          email: "Username2@curso.dev",
          password: "123",
        }),
      });

      const response = await fetch(
        "http://localhost:3000/api/v1/users/Username1",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
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
      expect(response.status).toBe(400); // HTTP 400 = Error
    });

    test("With duplicated 'email'", async () => {
      await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Email1",
          email: "Email1@curso.dev",
          password: "123",
        }),
      });

      await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Email2",
          email: "Email2@curso.dev",
          password: "123",
        }),
      });

      const response = await fetch(
        "http://localhost:3000/api/v1/users/Email1",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
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
      await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "uniqueUsername1",
          email: "uniqueUsername1@curso.dev",
          password: "123",
        }),
      });

      const response = await fetch(
        "http://localhost:3000/api/v1/users/uniqueUsername1",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "uniqueUsername2",
          }),
        },
      );

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "uniqueUsername2",
        email: "uniqueUsername1@curso.dev",
        password: responseBody.password,
        created_at: responseBody.created_at,
        update_at: responseBody.update_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.update_at)).not.toBeNaN();
      expect(responseBody.update_at > responseBody.created_at).toBe(true);
    });

    test("With unique 'email'", async () => {
      await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "uniqueEmail1",
          email: "uniqueEmail1@curso.dev",
          password: "123",
        }),
      });

      const response = await fetch(
        "http://localhost:3000/api/v1/users/uniqueEmail1",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "uniqueEmail2@curso.dev",
          }),
        },
      );

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "uniqueEmail1",
        email: "uniqueEmail2@curso.dev",
        password: responseBody.password,
        created_at: responseBody.created_at,
        update_at: responseBody.update_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.update_at)).not.toBeNaN();
      expect(responseBody.update_at > responseBody.created_at).toBe(true);
    });

    test("Update 'password'", async () => {
      await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "updatePassword",
          email: "updatePassword@curso.dev",
          password: "password1",
        }),
      });

      const response = await fetch(
        "http://localhost:3000/api/v1/users/updatePassword",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: "password2",
          }),
        },
      );

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "updatePassword",
        email: "updatePassword@curso.dev",
        password: responseBody.password,
        created_at: responseBody.created_at,
        update_at: responseBody.update_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.update_at)).not.toBeNaN();
      expect(responseBody.update_at > responseBody.created_at).toBe(true);

      const userInDatabase = await user.findOneByUsername("updatePassword");
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
});
