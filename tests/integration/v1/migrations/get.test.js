import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("DROP Schema public cascade; create schema public;");
}

test("GET should be 200 on api/v1/migrations", async () => {
  // Verifica se a aplicação está viva
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});

test("GET shouldn't be make a real migration", async () => {
  const { rows: queryResponse } = await database.query(
    "SELECT * FROM pgmigrations",
  );

  expect(Array.isArray(queryResponse)).toBe(true);
  expect(queryResponse.length).toBe(0);
});
