// src/signUp.ts
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { createUser } from "./utils";

interface SignUpBody {
  cpf: string;
  password: string;
}

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid request body" }),
      };
    }

    const body: SignUpBody = JSON.parse(event.body);
    const { cpf, password } = body;

    try {
      await createUser({ cpf, password });
    } catch (error: any) {
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
  } catch (error: any) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
