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
        try {
            await (0, utils_1.createUser)({ cpf, password });
        }
        catch (error) {
            if (error.message === "Usuário já existe") {
                return {
                    statusCode: 409, // conflito
                    body: JSON.stringify({ message: "Usuário já existe." }),
                };
            }
            throw error;
        }
        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Usuário criado com sucesso." }),
        };
    }
    catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
exports.handler = handler;
