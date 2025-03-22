"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const utils_1 = require("./utils");
const handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid request body" }),
      };
    }
    const body = JSON.parse(event.body);
    const { cpf, password } = body;
    // Verificar se usuário (CPF) existe
    const user = await (0, utils_1.findByCpf)(cpf);
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Usuário não encontrado." }),
      };
    }
    // Verificar senha
    if (user.password !== password) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Falha na autenticação." }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Autenticação bem-sucedida." }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
exports.handler = handler;
