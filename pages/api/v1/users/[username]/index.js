import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import user from "models/user.js";

const router = createRouter();
router.get(getHandler);
router.patch(patchHandler);

export default router.handler(controller.errorsHandler);

async function getHandler(request, response) {
  const username = request.query.username;

  const userFound = await user.findOneByUsername(username);

  return response.status(200).json(userFound);
}

async function patchHandler(request, response) {
  const currentUser = request.query.username;
  const userInputValues = request.body;

  const updatedUser = await user.update(currentUser, userInputValues);

  return response.status(200).json(updatedUser);
}
