import { createRouter } from "next-connect";

import controller from "infra/controller.js";
import authentication from "models/authentication.js";
import authorization from "models/authorization.js";
import session from "models/session.js";

import { ForbidenError } from "infra/errors.js";

const router = createRouter();

router.use(controller.injectAnonymousOrUser);
router.post(controller.canRequest("create:session"), postHandler);
router.delete(deleteHandler);

export default router.handler(controller.errorsHandler);

async function postHandler(request, response) {
  const userInputValues = request.body;

  const authenticatedUser = await authentication.getAuthenticatedUser(
    userInputValues.email,
    userInputValues.password,
  );

  if (!authorization.can(authenticatedUser, "create:session")) {
    throw new ForbidenError({
      message: "Você não possiu permissão para fazer login.",
      action: "Contate o suporte caso você acredite que isso seja um erro.",
    });
  }

  const newSessionToken = await session.create(authenticatedUser.id);
  controller.setSessionCookie(newSessionToken.token, response);

  const secureOutputValues = authorization.filterOutput(
    authenticatedUser,
    "read:session",
    newSessionToken,
  );

  return response.status(201).json(secureOutputValues);
}

async function deleteHandler(request, response) {
  const token = request.cookies.session_id;
  const sessionObject = await session.findOneValidByToken(token);

  const expiredSessionObject = await session.expireById(sessionObject.id);

  controller.clearSessionCookie(response);

  const secureOutputValues = authorization.filterOutput(
    request.context.user,
    "read:session",
    expiredSessionObject,
  );

  return response.status(200).json(secureOutputValues);
}
