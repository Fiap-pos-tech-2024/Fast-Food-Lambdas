import { APIGatewayEvent } from "aws-lambda";
import { handler } from "../src/signUp";
import * as userRepository from "../src/utils";

jest.mock("../src/utils");

describe("signUp handler", () => {
    it("should return 201 when user is created successfully", async () => {
        const event: APIGatewayEvent = {
            body: JSON.stringify({ cpf: "12345678900", password: "password" }),
            headers: {},
            multiValueHeaders: {},
            httpMethod: "POST",
            isBase64Encoded: false,
            path: "/auth/signup",
            pathParameters: null,
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            requestContext: {} as any,
            resource: "",
        };

        (userRepository.createUser as jest.Mock).mockResolvedValue({
            cpf: "12345678900",
            password: "password",
        });

        const result = await handler(event);

        expect(result.statusCode).toBe(201);
        expect(JSON.parse(result.body)).toEqual({
            message: "Usuário criado com sucesso.",
        });
    });

    it("should return 409 when user already exists", async () => {
        const event: APIGatewayEvent = {
            body: JSON.stringify({ cpf: "12345678900", password: "password" }),
            headers: {},
            multiValueHeaders: {},
            httpMethod: "POST",
            isBase64Encoded: false,
            path: "/auth/signup",
            pathParameters: null,
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            requestContext: {} as any,
            resource: "",
        };

        (userRepository.createUser as jest.Mock).mockRejectedValue(
            new Error("Usuário já existe")
        );

        const result = await handler(event);

        expect(result.statusCode).toBe(409);
        expect(JSON.parse(result.body)).toEqual({
            message: "Usuário já existe.",
        });
    });

    it("should return 400 when request body is invalid", async () => {
        const event: APIGatewayEvent = {
            body: null,
            headers: {},
            multiValueHeaders: {},
            httpMethod: "POST",
            isBase64Encoded: false,
            path: "/auth/signup",
            pathParameters: null,
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            requestContext: {} as any,
            resource: "",
        };

        const result = await handler(event);

        expect(result.statusCode).toBe(400);
        expect(JSON.parse(result.body)).toEqual({
            message: "Invalid request body",
        });
    });
});
