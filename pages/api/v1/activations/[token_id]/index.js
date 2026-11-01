import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import activation from "models/activation.js";
import authorization from "models/authorization.js";

const router = createRouter();
router.use(controller.injectAnonymousOrUser);
router.patch(controller.canRequest("read:activation_token"), patchHandler);

export default router.handler(controller.errorsHandler);

async function patchHandler(request, response) {
  const activationTokenId = request.query.token_id;

  const validTokenId = await activation.findOneValidById(activationTokenId);

  await activation.activateUserByUserId(validTokenId.user_id);

  const usedActivationToken = await activation.markTokenAsUsed(validTokenId.id);

  const secureOutputValues = authorization.filterOutput(
    request.context.user,
    "read:activation_token",
    usedActivationToken,
  );

  return response.status(200).json(secureOutputValues);
}
