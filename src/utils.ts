import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient({
    endpoint: "http://host.docker.internal:8000",
    credentials: new AWS.Credentials("fakeAccessKeyId", "fakeSecretAccessKey"),
});

const TABLE_NAME = process.env.USERS_TABLE || "Users";

export async function createUser(user: { cpf: string; password: string }) {
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

export async function findByCpf(cpf: string) {
    const params = {
        TableName: TABLE_NAME,
        Key: { cpf },
    };

    const result = await dynamoDb.get(params).promise();
    return result.Item;
}
