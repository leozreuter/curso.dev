import { createRouter } from "next-connect";

import controller from "infra/controller.js";
import authentication from "models/authentication.js";
import session from "models/session.js";

const router = createRouter();
router.post(postHandler);
router.delete(deleteHandler);

export default router.handler(controller.errorsHandler);

async function postHandler(request, response) {
  const userInputValues = request.body;

  const authenticatedUser = await authentication.getAuthenticatedUser(
    userInputValues.email,
    userInputValues.password,
  );

  const newSessionToken = await session.create(authenticatedUser.id);

  controller.setSessionCookie(newSessionToken.token, response);

  return response.status(201).json(newSessionToken);
}

async function deleteHandler(request, response) {
  const token = request.cookies.session_id;
  const sessionObject = await session.findOneValidByToken(token);

  const expiredSessionObject = await session.expireById(sessionObject.id);

  controller.clearSessionCookie(response);

  return response.status(200).json(expiredSessionObject);
}
