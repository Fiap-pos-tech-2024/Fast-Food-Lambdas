import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { findByCpf } from "./utils";

interface SignInBody {
    cpf: string;
    password: string;
}

export const handler = async (
    event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Invalid request body" }),
            };
        }

        const body: SignInBody = JSON.parse(event.body);
        const { cpf, password } = body;

        // Verificar se usuário (CPF) existe
        const user = await findByCpf(cpf);
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
    } catch (error: any) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
