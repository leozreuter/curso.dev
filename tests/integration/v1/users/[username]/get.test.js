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
      await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "lreuter",
          email: "lreuter@curso.dev",
          password: "passwd",
        }),
      });

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/lreuter",
      );
      const response2Body = await response2.json();

      expect(response2Body).toEqual({
        id: response2Body.id,
        username: "lreuter",
        email: "lreuter@curso.dev",
        password: response2Body.password,
        created_at: response2Body.created_at,
        update_at: response2Body.update_at,
      });
      expect(uuidVersion(response2Body.id)).toBe(4);
      expect(Date.parse(response2Body.created_at)).not.toBeNaN();
      expect(Date.parse(response2Body.update_at)).not.toBeNaN();

      expect(response2.status).toBe(200);
    });

    test("With mismatch case", async () => {
      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/Lreuter",
      );
      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        id: response2Body.id,
        username: "lreuter",
        email: "lreuter@curso.dev",
        password: response2Body.password,
        created_at: response2Body.created_at,
        update_at: response2Body.update_at,
      });
      expect(uuidVersion(response2Body.id)).toBe(4);
      expect(Date.parse(response2Body.created_at)).not.toBeNaN();
      expect(Date.parse(response2Body.update_at)).not.toBeNaN();

      expect(response2.status).toBe(200); // HTTP 400 = Error
    });

    test("With nonexist user case", async () => {
      const response2 = await fetch("http://localhost:3000/api/v1/users/test");
      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        name: "NotFoundError",
        message: "O username informado não foi encontrado no sistemas.",
        action: "Verifique se o username informado está digitado corretamente.",
        status_code: 404,
      });

      expect(response2.status).toBe(404); // HTTP 404 = NotFoundError
    });
  });
});
