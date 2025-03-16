const AWS = require("aws-sdk");

// Configuração do DynamoDB Local
const dynamoDb = new AWS.DynamoDB({
    endpoint: "http://localhost:8000",
    region: "localhost",
    credentials: new AWS.Credentials("fakeAccessKeyId", "fakeSecretAccessKey"),
});

// Definição da tabela
const params = {
    TableName: "User",
    AttributeDefinitions: [
        { AttributeName: "cpf", AttributeType: "S" }, // Chave primária CPF (String)
    ],
    KeySchema: [
        { AttributeName: "cpf", KeyType: "HASH" }, // Chave primária
    ],
    BillingMode: "PAY_PER_REQUEST", // Sem necessidade de definir capacidade
};

// Função para criar a tabela
const createTable = async () => {
    try {
        console.log("Criando tabela Users...");
        await dynamoDb.createTable(params).promise();
        console.log("Tabela User criada com sucesso!");
    } catch (error) {
        if (error.code === "ResourceInUseException") {
            console.log("A tabela User já existe.");
        } else {
            console.error("Erro ao criar a tabela:", error);
        }
    }
};

// Executar a função
createTable();
