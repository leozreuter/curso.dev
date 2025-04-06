import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("DROP Schema public cascade; create schema public;");
});

describe("POST api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        // Verifica se a aplicação está viva
        const response1 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        expect(response1.status).toBe(201); // HTTP 201 = Created
        const response1Body = await response1.json();
        expect(Array.isArray(response1Body)).toBe(true);
        expect(response1Body.length).toBeGreaterThan(0);
      });

      test("For the second time", async () => {
        //Verifica se o segundo POST não quebra os testes
        const response2 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(response2.status).toBe(200);
        const response2Body = await response2.json();
        expect(Array.isArray(response2Body)).toBe(true);
        expect(response2Body.length).toBe(0);
      });

      test("Should make a real migration", async () => {
        const { rows: queryResponse } = await database.query(
          "SELECT * FROM pgmigrations",
        );
        expect(Array.isArray(queryResponse)).toBe(true);
        expect(queryResponse.length).toBeGreaterThan(0);
      });
    });
  });
});
