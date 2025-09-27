import user from "models/user.js";
import password from "models/password";
import { NotFoundError, UnathorizedError } from "infra/errors.js";

async function getAuthenticatedUser(providedEmail, providedPassword) {
  try {
    const storedUser = await findUserByEmail(providedEmail);
    await validatePassowrd(providedPassword, storedUser.password);

    return storedUser;
  } catch (error) {
    // console.log(error.name);
    // console.log(error.message);
    if (error instanceof UnathorizedError) {
      throw new UnathorizedError({
        message: "Credenciais inválidas.",
        action: "Verifique as credenciais fornecidas e tente novamente.",
      });
    }
    throw error;
  }

  async function findUserByEmail(email) {
    let storedUser;
    try {
      storedUser = await user.findOneByEmail(email);
    } catch (error) {
      if (error instanceof NotFoundError)
        throw new UnathorizedError({
          message: "Email inválido.",
          action: "Verifique as credenciais fornecidas e tente novamente.",
        });

      throw error;
    }
    return storedUser;
  }

  async function validatePassowrd(providedPassword, storedPassword) {
    const correctPasswordMatch = await password.compare(
      providedPassword,
      storedPassword,
    );

    if (!correctPasswordMatch) {
      throw new UnathorizedError({
        message: "Senha inválida.",
        action: "Verifique as credenciais fornecidas e tente novamente.",
      });
    }
  }
}

const authentication = {
  getAuthenticatedUser,
};

export default authentication;
