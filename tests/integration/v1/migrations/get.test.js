import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("DROP Schema public cascade; create schema public;");
});

describe("GET api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Running pending migrations", async () => {
      // Verifica se a aplicação está viva
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      //Se ta respondendo um array...
      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });

    test("Shouldn't make a real migration", async () => {
      const { rows: queryResponse } = await database.query(
        "SELECT * FROM pgmigrations",
      );

      expect(Array.isArray(queryResponse)).toBe(true);
      expect(queryResponse.length).toBe(0);
    });
  });
});
