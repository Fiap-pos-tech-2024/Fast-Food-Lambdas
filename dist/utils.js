"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.findByCpf = findByCpf;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dynamoDb = new aws_sdk_1.default.DynamoDB.DocumentClient({
    endpoint: "http://host.docker.internal:8000",
    credentials: new aws_sdk_1.default.Credentials("fakeAccessKeyId", "fakeSecretAccessKey"),
});
const TABLE_NAME = process.env.USERS_TABLE || "Users";
async function createUser(user) {
    const existingUser = await findByCpf(user.cpf);
    if (existingUser) {
        throw new Error("Usuário já existe");
    }
    const params = {
        TableName: TABLE_NAME,
        Item: {
            cpf: user.cpf,
            password: user.password,
        },
        ConditionExpression: "attribute_not_exists(cpf)",
    };
    await dynamoDb.put(params).promise();
    return user;
}
async function findByCpf(cpf) {
    const params = {
        TableName: TABLE_NAME,
        Key: { cpf },
    };
    const result = await dynamoDb.get(params).promise();
    return result.Item;
}
