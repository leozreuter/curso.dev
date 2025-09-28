import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import session from "models/session";
import user from "models/user";

const router = createRouter();
router.get(getHandler);

export default router.handler(controller.errorsHandler);

async function getHandler(request, response) {
  const token = request.cookies.session_id;

  const sessionObject = await session.findOneValidByToken(token);
  const renewedSessionObject = await session.renew(sessionObject.id);

  controller.setSessionCookie(renewedSessionObject.token, response);

  const userFound = await user.findOneById(sessionObject.user_id);
  return response.status(200).json(userFound);
}
