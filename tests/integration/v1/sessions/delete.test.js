import orchestrator from "tests/orchestrator.js";
import setCookieParser from "set-cookie-parser";
import { version as uuidVersion } from "uuid";
import session from "models/session.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("DELETE api/v1/sessions", () => {
  describe("Anonymous user", () => {
    test("With nonexistent session", async () => {
      const response = await fetch("http://localhost:3000/api/v1/sessions", {
        method: "DELETE",
        headers: { Cookie: `session_id=sessaoInexistente` },
      });

      const responseBody = await response.json();

      expect(response.status).toBe(401);
      expect(responseBody).toEqual({
        name: "UnathorizedError",
        message: "O usuário não possui sessão ativa.",
        action: "Verifique se este usuário está logado e tente novamente",
        status_code: 401,
      });
    });

    test("With expired session", async () => {
      jest.useFakeTimers({
        now: new Date(Date.now() - session.EXPIRATION_IN_MILLISECONDS),
      });

      const createdUser = await orchestrator.createUser({
        username: "ExpiredSession",
      });
      const sessionObject = await orchestrator.createSession(createdUser.id);

      jest.useRealTimers();

      const response = await fetch("http://localhost:3000/api/v1/sessions", {
        method: "DELETE",
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
      });

      const responseBody = await response.json();

      expect(response.status).toBe(401);
      expect(responseBody).toEqual({
        name: "UnathorizedError",
        message: "O usuário não possui sessão ativa.",
        action: "Verifique se este usuário está logado e tente novamente",
        status_code: 401,
      });
    });

    test("With valid session", async () => {
      const createdUser = await orchestrator.createUser({
        username: "ValidSession",
      });

      const sessionObject = await orchestrator.createSession(createdUser.id);

      const response = await fetch("http://localhost:3000/api/v1/sessions", {
        method: "DELETE",
        headers: { Cookie: `session_id=${sessionObject.token}` },
      });

      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody).toEqual({
        id: sessionObject.id,
        token: sessionObject.token,
        user_id: createdUser.id,
        created_at: sessionObject.created_at.toISOString(),
        expires_at: responseBody.expires_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.expires_at)).not.toBeNaN();
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      const dateNow = new Date().toISOString();

      expect(dateNow > responseBody.expires_at).toEqual(true);
      expect(
        responseBody.updated_at > sessionObject.updated_at.toISOString(),
      ).toEqual(true);

      // Set-Cookie asserts
      const parsedSetCookie = setCookieParser(response, {
        map: true,
      });

      expect(parsedSetCookie.session_id).toEqual({
        name: "session_id",
        value: "invalid",
        path: "/",
        maxAge: -1,
        httpOnly: true,
      });
    });
  });
});
