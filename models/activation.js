import email from "infra/email.js";
import database from "infra/database.js";
import webserver from "infra/webserver.js";
import { ForbidenError, NotFoundError } from "infra/errors.js";
import user from "models/user.js";
import authorization from "models/authorization.js";

const EXPIRATION_IN_MILLISECONDS = 1000 * 60 * 15; // 15 minutes

async function create(userId) {
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);

  const newToken = await runInsertQuery(userId, expiresAt);
  return newToken;

  async function runInsertQuery(userId, expiresAt) {
    const results = await database.query({
      text: `
        INSERT INTO 
          user_activation_tokens(user_id, expires_at)
        VALUES
          ($1, $2)
        RETURNING
          *
      ;`,
      values: [userId, expiresAt],
    });

    return results.rows[0];
  }
}

async function findOneValidById(id) {
  const activationTokenFound = await runSelectQuery(id);
  return activationTokenFound;

  async function runSelectQuery(id) {
    const result = await database.query({
      text: `
      SELECT
        *
      FROM
        user_activation_tokens
      WHERE
        id = $1
          AND
        expires_at > NOW()
          AND 
        used_at IS NULL
      LIMIT 1;`,
      values: [id],
    });
    if (result.rowCount === 0) {
      throw new NotFoundError({
        message:
          "O token de ativação não foi encontrado no sistema ou expirou.",
        action: "Realize um novo cadastro.",
      });
    }

    return result.rows[0];
  }
}

async function markTokenAsUsed(tokenId) {
  const activationObject = await runUpdateQuery(tokenId);
  return activationObject;

  async function runUpdateQuery(tokenId) {
    const result = await database.query({
      text: `
        UPDATE
          user_activation_tokens
        SET
          used_at = timezone('utc', now()),
          updated_at = timezone('utc', now())
        WHERE
          id = $1
            AND
          expires_at > NOW()
            AND 
          used_at IS NULL
        RETURNING *;`,
      values: [tokenId],
    });
    if (result.rowCount === 0) {
      throw new NotFoundError({
        message:
          "O token de ativação não foi encontrado no sistema ou expirou.",
        action: "Realize um novo cadastro.",
      });
    }

    return result.rows[0];
  }
}

async function activateUserByUserId(userId) {
  const userObject = await user.findOneById(userId);

  if (!authorization.can(userObject, "read:activation_token")) {
    throw new ForbidenError({
      message: "Você não pode mais usar um token de ativação.",
      action: "Entre em contato com o suporte.",
    });
  }

  const activatedUser = await user.setFeatures(userId, [
    "create:session",
    "read:session",
    "update:user",
  ]);
  return activatedUser;
}

async function sendEmailToUser(user, activationToken) {
  await email.send({
    from: "CursoDev <noreply@curso.dev>",
    to: user.email,
    subject: "Ative seu cadastro!",
    text: `${user.username}, ative sua conta clicando no link abaixo:
    
${webserver.origin}/cadastro/ativar/${activationToken.id}

Atenciosamente,
Equipe Curso.dev`,
  });
}

const activation = {
  activateUserByUserId,
  findOneValidById,
  markTokenAsUsed,
  sendEmailToUser,
  create,
  EXPIRATION_IN_MILLISECONDS,
};

export default activation;
