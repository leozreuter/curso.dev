import orchestrator from "tests/orchestrator.js";
import setCookieParser from "set-cookie-parser";
import { version as uuidVersion } from "uuid";
import webserver from "infra/webserver.js";
import session from "models/session.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST api/v1/sessions", () => {
  describe("Anonymous user", () => {
    let userCreated;
    test("With incorrect `email` but correct `password`", async () => {
      const inactivatedUser = await orchestrator.createUser({
        email: "correct.email@curso.dev",
        password: "correct-password",
      });

      userCreated = await orchestrator.activateUser(inactivatedUser);

      const response = await fetch(`${webserver.origin}/api/v1/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "incorrect.email@curso.dev",
          password: "correct-password",
        }),
      });

      const responseBody = await response.json();
      expect(response.status).toBe(401);
      expect(responseBody).toEqual({
        name: "UnathorizedError",
        message: "Credenciais inválidas.",
        action: "Verifique as credenciais fornecidas e tente novamente.",
        status_code: 401,
      });
    });

    test("With correct `email` but incorrect `password`", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "correct.email@curso.dev",
          password: "incorrect-password",
        }),
      });

      const responseBody = await response.json();
      expect(response.status).toBe(401);
      expect(responseBody).toEqual({
        name: "UnathorizedError",
        message: "Credenciais inválidas.",
        action: "Verifique as credenciais fornecidas e tente novamente.",
        status_code: 401,
      });
    });

    test("With incorrect `email` and incorrect `password`", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "incorrect.email@curso.dev",
          password: "incorrect-password",
        }),
      });

      const responseBody = await response.json();
      expect(response.status).toBe(401);
      expect(responseBody).toEqual({
        name: "UnathorizedError",
        message: "Credenciais inválidas.",
        action: "Verifique as credenciais fornecidas e tente novamente.",
        status_code: 401,
      });
    });

    test("With correct `email` and correct `password`", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "correct.email@curso.dev",
          password: "correct-password",
        }),
      });

      const responseBody = await response.json();
      expect(response.status).toBe(201);
      expect(responseBody).toEqual({
        id: responseBody.id,
        token: responseBody.token,
        user_id: userCreated.id,
        expires_at: responseBody.expires_at,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.expires_at)).not.toBeNaN();
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      const expiresAt = new Date(responseBody.expires_at);
      const createdAt = new Date(responseBody.created_at);

      //* `expires_at` é calculado na aplicação antes da persistência.
      //* `created_at` é calculado depois na camada do banco de dados.

      //* Por isso, o tempo real entre as duas datas pode ficar ligeiramente
      // menor do que o tempo de expiração configurado e não bater 30 dias nos
      // milissegundos caso seja calculado apenas `expires_at` - `created_at`.

      //* Então a ideia é garantir que no momento `expires_at` seja maior que
      // `created_at`, e também que possa existir distância de até 5 segundos
      // entre as duas datas para cobrir o caso do banco sofrer algum load
      // inesperado nos testes.
      expect(expiresAt >= createdAt).toBe(true);

      const actualLifetimeInMilliseconds = expiresAt - createdAt;
      const lifetimeDifferenceInMilliseconds =
        session.EXPIRATION_IN_MILLISECONDS - actualLifetimeInMilliseconds;

      expect(lifetimeDifferenceInMilliseconds).toBeLessThanOrEqual(5000);

      const parsedSetCookie = setCookieParser(response, {
        map: true,
      });

      expect(parsedSetCookie.session_id).toEqual({
        name: "session_id",
        value: responseBody.token,
        path: "/",
        maxAge: session.EXPIRATION_IN_MILLISECONDS / 1000,
        httpOnly: true,
        sameSite: "Lax",
      });
    });
  });
});
