import orchestrator from "tests/orchestrator.js";
import database from "infra/database.js";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET api/v1/migrations", () => {
  describe("Anonymous and default user", () => {
    test("Running pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbidenError",
        status_code: 403,
        message: "Você não possui permissão para essa ação.",
        action: 'Verifique se o seu usuário possui a feature "read:migration".',
      });
      expect(response.status).toBe(403);
    });
  });
  describe("Privilege user", () => {
    test("Running pending migrations", async () => {
      const privilegeCreatedUser = await orchestrator.createUser();
      await orchestrator.activateUser(privilegeCreatedUser);
      await user.addFeatures(privilegeCreatedUser.id, ["read:migration"]);
      const privilegeSessionObject = await orchestrator.createSession(
        privilegeCreatedUser.id,
      );

      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        headers: { Cookie: `session_id=${privilegeSessionObject.token}` },
      });
      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);
      expect(response.status).toBe(200);
      //expect(responseBody.length).toBeGreaterThan(0);
    });

    // test("Shouldn't make a real migration", async () => {
    //   const { rows: queryResponse } = await database.query(
    //     "SELECT * FROM pgmigrations",
    //   );

    //   expect(Array.isArray(queryResponse)).toBe(true);
    //   expect(queryResponse.length).toBe(0);
    // });
  });
});
