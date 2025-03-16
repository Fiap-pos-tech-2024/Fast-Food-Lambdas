# Fast-Food-Auth

## Descrição

API de autenticação para fast-food utilizando AWS Lambda e DynamoDB.

## Pré-requisitos

- Node.js (versão 18.x)
- AWS SAM CLI
- Docker (para executar o DynamoDB Local)

## Instalação

### 1. Instalar Node.js

Baixe e instale a versão 18.x do Node.js a partir do nvm. Para instalar o nvm, siga as instruções no [repositório oficial](https://github.com/nvm-sh/nvm).

Depois de instalar o nvm, execute os seguintes comandos para usar a versão correta do Node.js de acordo com o arquivo .nvmrc:

```bash
nvm install
nvm use
```

### 2. Instalar AWS SAM CLI

Siga as instruções de instalação da AWS SAM CLI no [site oficial](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).

### 3. Instalar DynamoDB Local

Você pode instalar e executar o DynamoDB Local utilizando Docker. Execute o comando:

```bash
docker run -p 8000:8000 amazon/dynamodb-local
```

### 4. Instalar dependências do projeto

No diretório raiz do projeto, execute o comando:

```bash
npm install
```

## Executar o projeto localmente

### 1. Iniciar o DynamoDB Local

Se ainda não tiver iniciado, execute o comando:

```bash
docker run -p 8000:8000 amazon/dynamodb-local
```

### 2. Iniciar a aplicação com AWS SAM CLI

No diretório raiz do projeto, execute o comando:

```bash
npm run start
```

## Testar o Código

Para executar os testes, utilize o comando:

```bash
npm run test
```

## Observações

- Certifique-se de que as variáveis de ambiente estão configuradas corretamente no arquivo `env.json`.
