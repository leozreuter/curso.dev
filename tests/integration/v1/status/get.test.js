test("Get should be 200 on api/v1/status", async () => {
  // Verifica se a aplicação está viva
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
});

test("Verify updated_at valid format", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  //Verifica se o update_at está sendo preenchido
  expect(responseBody.updated_at).toBeDefined();

  //Verifica a fundo se o valor informado na chave update_at é realmente válido
  //Converte a entrada para ISO novamente, se a entrada for diferente de uma data válida o teste quebra
  const parsedDateNow = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedDateNow);
});

test("Verify database integrity", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  //Verifica se o database está sendo preenchido
  expect(responseBody.dependecies.database.version).toBeDefined();
  expect(responseBody.dependecies.database.max_connections).toBeDefined();
  expect(responseBody.dependecies.database.opend_connections).toBeDefined();

  const valueVersion = responseBody.dependecies.database.version;
  expect(valueVersion).toEqual("16.0");

  const valueMaxConnections = responseBody.dependecies.database.max_connections;
  expect(valueMaxConnections).toEqual(100);

  const valueUsedConnections =
    responseBody.dependecies.database.opend_connections;
  expect(valueUsedConnections).toEqual(1);
});
