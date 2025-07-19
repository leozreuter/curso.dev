import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("PUT api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Returning method not allowed error", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "PUT",
      });

      const responseBody = await response.json();
      expect(response.status).toBe(405);
      expect(responseBody).toEqual({
        name: "MethodNotAllowedError",
        message: "Método de requisição não permitido.",
        action: "Verifique se o método HTTP é valido para este endpoint.",
        status_code: 405,
      });
    });
  });
});
