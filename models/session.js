import crypto from "node:crypto";
import database from "infra/database.js";
import { UnathorizedError } from "infra/errors.js";

const EXPIRATION_IN_MILLISECONDS = 60 * 60 * 24 * 30 * 1000; // 30days

async function create(userId) {
  const token = crypto.randomBytes(48).toString("hex");
  const expires_at = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);

  const newSession = await runInsertQuery(token, userId, expires_at);
  return newSession;

  async function runInsertQuery(token, userId, expires_at) {
    const result = await database.query({
      text: `
        INSERT INTO 
          sessions (token, user_id, expires_at)
        VALUES
          ($1,$2,$3)
        RETURNING
          *
      ;`,
      values: [token, userId, expires_at],
    });

    return result.rows[0];
  }
}

async function findOneValidByToken(sessionToken) {
  const sessionFound = await runSelectQuery(sessionToken);

  return sessionFound;

  async function runSelectQuery(sessionToken) {
    const result = await database.query({
      text: `
      SELECT
        *
      FROM
        sessions
      WHERE
        token = $1
          AND
        expires_at > NOW()
      LIMIT
        1
      ;`,
      values: [sessionToken],
    });
    if (result.rowCount === 0) {
      throw new UnathorizedError({
        message: "O usuário não possui sessão ativa.",
        action: "Verifique se este usuário está logado e tente novamente",
        status_code: "401",
      });
    }
    return result.rows[0];
  }
}

async function renew(sessionId) {
  const expires_at = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);
  const renewedSession = await runUpdateQuery(sessionId, expires_at);

  return renewedSession;

  async function runUpdateQuery(sessionId, expires_at) {
    const result = await database.query({
      text: `
      UPDATE
        sessions
      SET
        expires_at = $2,
        updated_at = NOW()
      WHERE
        id = $1
      RETURNING
        *
      ;`,
      values: [sessionId, expires_at],
    });

    return result.rows[0];
  }
}

const session = {
  create,
  findOneValidByToken,
  renew,
  EXPIRATION_IN_MILLISECONDS,
};

export default session;
