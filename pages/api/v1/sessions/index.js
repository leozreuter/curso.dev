import { createRouter } from "next-connect";

import controller from "infra/controller.js";
import authentication from "models/authentication.js";
import session from "models/session.js";

const router = createRouter();
router.post(postHandler);

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
