import crypto from "node:crypto";
import database from "infra/database.js";

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

const session = {
  create,
  EXPIRATION_IN_MILLISECONDS,
};

export default session;
