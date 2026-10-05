import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import user from "models/user.js";
import authorization from "models/authorization.js";
import { ForbidenError } from "infra/errors.js";

const router = createRouter();
router.use(controller.injectAnonymousOrUser);
router.get(getHandler);
router.patch(controller.canRequest("update:user"), patchHandler);

export default router.handler(controller.errorsHandler);

async function getHandler(request, response) {
  const username = request.query.username;

  const userFound = await user.findOneByUsername(username);

  return response.status(200).json(userFound);
}

async function patchHandler(request, response) {
  const username = request.query.username;
  const userInputValues = request.body;

  const targetUser = await user.findOneByUsername(username);
  const userTryingtoRequest = request.context.user;

  if (!authorization.can(userTryingtoRequest, "update:user", targetUser)) {
    throw new ForbidenError({
      message: "Você não possui permissão para atualizar outro usuário.",
      action:
        "Verifique se você possui a feature necessária para atualizar outro usuário.",
    });
  }

  const updatedUser = await user.update(username, userInputValues);

  return response.status(200).json(updatedUser);
}
