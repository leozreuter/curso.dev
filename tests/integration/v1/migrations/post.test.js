import orchestrator from "tests/orchestrator.js";
//import database from "infra/database.js";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Trying to run pendings migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
      });

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbidenError",
        status_code: 403,
        message: "Você não possui permissão para essa ação.",
        action:
          'Verifique se o seu usuário possui a feature "create:migration".',
      });
      expect(response.status).toBe(403);
    });
  });
  describe("Privilege user", () => {
    describe("Running pending migrations", () => {
      let sessionObject;
      test("For the first time", async () => {
        const createdUser = await orchestrator.createUser();
        await orchestrator.activateUser(createdUser);
        await user.addFeatures(createdUser.id, ["create:migration"]);
        sessionObject = await orchestrator.createSession(createdUser.id);
        const response1 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
            headers: { Cookie: `session_id=${sessionObject.token}` },
          },
        );

        const response1Body = await response1.json();
        expect(Array.isArray(response1Body)).toBe(true);
        expect(response1.status).toBe(200); // Should be to 201, but is not possible because orchestrator.runPendingsMigrations()
        //expect(response1Body.length).toBeGreaterThan(0);
      });

      // test("For the second time", async () => {
      //   //Verifica se o segundo POST não quebra os testes
      //   const response2 = await fetch(
      //     "http://localhost:3000/api/v1/migrations",
      //     {
      //       method: "POST",
      //       headers: { Cookie: `session_id=${sessionObject.token}` },
      //     },
      //   );
      //   expect(response2.status).toBe(200);
      //   const response2Body = await response2.json();
      //   expect(Array.isArray(response2Body)).toBe(true);
      //   expect(response2Body.length).toBe(0);
      // });

      // test("Should make a real migration", async () => {
      //   const { rows: queryResponse } = await database.query(
      //     "SELECT * FROM pgmigrations",
      //   );
      //   expect(Array.isArray(queryResponse)).toBe(true);
      //   expect(queryResponse.length).toBeGreaterThan(0);
      // });
    });
  });
});
