import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Returning method not allowed error", async () => {
      // Verifica se a aplicação está viva
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
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
