import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("Get should be 200 on api/v1/status", async () => {
  // Verifica se a aplicação está viva
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  expect(response.status).toBe(200);

  //Verifica se o update_at está sendo preenchido
  expect(responseBody.updated_at).toBeDefined();
  //Verifica a fundo se o valor informado na chave update_at é realmente válido
  //Converte a entrada para ISO novamente, se a entrada for diferente de uma data válida o teste quebra
  const parsedDateNow = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedDateNow);

  //Verify database integrity
  //Verifica se o database está sendo preenchido
  expect(responseBody.dependecies.database.version).toEqual("16.0");
  expect(responseBody.dependecies.database.max_connections).toEqual(100);
  expect(responseBody.dependecies.database.opend_connections).toEqual(1);
});
