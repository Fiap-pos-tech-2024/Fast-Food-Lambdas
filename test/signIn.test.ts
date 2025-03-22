import { APIGatewayEvent } from "aws-lambda";
import { handler } from "../src/signIn";
import * as userRepository from "../src/utils";

jest.mock("../src/utils");
describe("signIn handler", () => {
  it("should return 200 when authentication is successful", async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({ cpf: "12345678900", password: "password" }),
      headers: {},
      multiValueHeaders: {},
      httpMethod: "POST",
      isBase64Encoded: false,
      path: "/auth/signin",
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {} as any,
      resource: "",
    };

    (userRepository.findByCpf as jest.Mock).mockResolvedValue({
      cpf: "12345678900",
      password: "password",
    });

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
      message: "Autenticação bem-sucedida.",
    });
  });

  it("should return 404 when user is not found", async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({ cpf: "12345678900", password: "password" }),
      headers: {},
      multiValueHeaders: {},
      httpMethod: "POST",
      isBase64Encoded: false,
      path: "/auth/signin",
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {} as any,
      resource: "",
    };

    (userRepository.findByCpf as jest.Mock).mockResolvedValue(null);

    const result = await handler(event);

    expect(result.statusCode).toBe(404);
    expect(JSON.parse(result.body)).toEqual({
      message: "Usuário não encontrado.",
    });
  });

  it("should return 401 when password is incorrect", async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        cpf: "12345678900",
        password: "wrongpassword",
      }),
      headers: {},
      multiValueHeaders: {},
      httpMethod: "POST",
      isBase64Encoded: false,
      path: "/auth/signin",
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {} as any,
      resource: "",
    };

    (userRepository.findByCpf as jest.Mock).mockResolvedValue({
      cpf: "12345678900",
      password: "password",
    });

    const result = await handler(event);

    expect(result.statusCode).toBe(401);
    expect(JSON.parse(result.body)).toEqual({
      message: "Falha na autenticação.",
    });
  });

  it("should return 400 when request body is invalid", async () => {
    const event: APIGatewayEvent = {
      body: null,
      headers: {},
      multiValueHeaders: {},
      httpMethod: "POST",
      isBase64Encoded: false,
      path: "/auth/signin",
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
