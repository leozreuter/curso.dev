export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("Um erro interno não esperado aconteceu.", { cause });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o Suporte";
    this.statusCode = statusCode || 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Método de requisição não permitido.");
    this.name = "MethodNotAllowedError";
    this.action = "Verifique se o método HTTP é valido para este endpoint.";
    this.statusCode = 405;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
export class ServicesError extends Error {
  constructor({ cause, message }) {
    super(message || "Serviço indisponível no momento", { cause });
    this.name = "ServicesError";
    this.action = "Verifique se o serviço está disponível no momento.";
    this.statusCode = 503;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
