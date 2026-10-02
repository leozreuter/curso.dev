import * as cookie from "cookie";
import session from "models/session.js";
import user from "models/user.js";
import authorization from "models/authorization.js";

import {
  InternalServerError,
  MethodNotAllowedError,
  ValidationError,
  NotFoundError,
  UnathorizedError,
  ForbidenError,
} from "infra/errors";

function onNoMatchHandler(resquest, response) {
  const publicError = new MethodNotAllowedError();
  response.status(publicError.statusCode).json(publicError);
}

function onErrorHandler(error, resquest, response) {
  if (
    error instanceof ValidationError ||
    error instanceof NotFoundError ||
    error instanceof ForbidenError
  ) {
    return response.status(error.statusCode).json(error);
  }

  if (error instanceof UnathorizedError) {
    clearSessionCookie(response);
    return response.status(error.statusCode).json(error);
  }

  const publicErrorObject = new InternalServerError({
    cause: error,
    statusCode: error.statusCode,
  });
  console.error(publicErrorObject);
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

async function setSessionCookie(sessionToken, response) {
  const setCookie = cookie.serialize("session_id", sessionToken, {
    path: "/",
    maxAge: session.EXPIRATION_IN_MILLISECONDS / 1000,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  response.setHeader("Set-Cookie", setCookie);
}

async function clearSessionCookie(response) {
  const setCookie = cookie.serialize("session_id", "invalid", {
    path: "/",
    maxAge: -1,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  response.setHeader("Set-Cookie", setCookie);
}

async function injectAnonymousOrUser(request, response, next) {
  if (request.cookie?.session_id) {
    await injectAuthenticatedUser(request);
    return next();
  }

  injectAnonymousUser(request);
  return next();
}

async function injectAuthenticatedUser(request) {
  const sessionToken = request.cookie.session_id;
  const sessionObject = await session.findOneValidByToken(sessionToken);
  const userObject = await user.findOneById(sessionObject.user_id);

  request.context = {
    ...request.context,
    user: userObject,
  };
}

function injectAnonymousUser(request) {
  request.context = {
    ...request.context,
    user: {
      name: "Anonymous",
      features: ["create:session", "create:user", "read:activation_token"],
    },
  };
}

function canRequest(feature) {
  return function canRequestMiddleware(request, response, next) {
    const userTryingToRequest = request.context.user;
    if (authorization.can(userTryingToRequest, feature)) {
      return next();
    }

    throw new ForbidenError({
      message: "Você não possui permissão para essa ação",
      action: `Verifique se o seu usuário possui a feature "${feature}"`,
    });
  };
}

const controller = {
  onErrorHandler,
  onNoMatchHandler,
  errorsHandler: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
  setSessionCookie,
  clearSessionCookie,
  injectAnonymousOrUser,
  canRequest,
};

export default controller;
