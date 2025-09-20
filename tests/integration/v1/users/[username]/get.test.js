import orchestrator from "tests/orchestrator.js";
import { version as uuidVersion } from "uuid";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With exact case match", async () => {
      await orchestrator.createUser({
        username: "lreuter",
        email: "lreuter@curso.dev",
      });

      const response = await fetch(
        "http://localhost:3000/api/v1/users/lreuter",
      );
      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "lreuter",
        email: "lreuter@curso.dev",
        password: responseBody.password,
        created_at: responseBody.created_at,
        update_at: responseBody.update_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.update_at)).not.toBeNaN();

      expect(response.status).toBe(200);
    });

    test("With mismatch case", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/Lreuter",
      );
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "lreuter",
        email: "lreuter@curso.dev",
        password: responseBody.password,
        created_at: responseBody.created_at,
        update_at: responseBody.update_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.update_at)).not.toBeNaN();

      expect(response.status).toBe(200); // HTTP 400 = Error
    });

    test("With nonexist user case", async () => {
      const response = await fetch("http://localhost:3000/api/v1/users/test");
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O username informado não foi encontrado no sistemas.",
        action: "Verifique se o username informado está digitado corretamente.",
        status_code: 404,
      });

      expect(response.status).toBe(404); // HTTP 404 = NotFoundError
    });
  });
});
