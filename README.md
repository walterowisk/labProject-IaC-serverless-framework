<div align="center">
<h1  align="center">PROJETO PRÁTICO BOOTCAMP CLOUD AWS ꞏ DIO</h1>
</div>
<div align="center"> <img src="https://hermes.digitalinnovation.one/tracks/af22d4a0-463f-48c5-a70c-4961d5e618d0.png" alt="Linux Experience" width="300"> </div>

## :spiral_notepad: Infraestrutura Como Código com Serverless Framework na AWS

## :wrench: Ferramentas que utilizei

<div align="center"> 
<img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="Git badge"/>
<img src="https://img.shields.io/badge/Serverless-FD5750.svg?style=for-the-badge&logo=Serverless&logoColor=white" alt="Serverless"/>
<img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="Git badge"/>
<img src="https://img.shields.io/badge/Postman-FF6C37.svg?style=for-the-badge&logo=Postman&logoColor=white" alt="Git badge"/> 
<img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" alt="Git badge"/> 
<img src="https://img.shields.io/badge/GitKraken-179287.svg?style=for-the-badge&logo=GitKraken&logoColor=white" alt="Github Badge"/> 
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="Github Badge"/> 
</div>

## :chart_with_upwards_trend: Diagrama do projeto

<div align="center"> <img src="https://github.com/walterowisk/labProject-api-security-cognito-AWS/blob/main/img/lab-project-cognito-diagram.jpg" alt="AWS Diagram" width="600"> </div>

## :cloud: Serviços AWS neste projeto

- **CLOUDFORMATION:** Serviço que fornece aos desenvolvedores e empresas uma forma fácil de criar um conjunto de recursos relacionados da AWS e de terceiros para provisioná-los e gerenciá-los de forma organizada e previsível. [Saiba mais.](https://aws.amazon.com/pt/cloudformation/)
- **API GATEWAY:** Serviço gerenciado que permite criação, publicação, manutenção, monitoramento e proteção de APIs REST e WebSocket em qualquer escala. [Saiba mais.](https://aws.amazon.com/pt/api-gateway/)
- **LAMBDA:** Serviço de computação sem servidor e orientado a eventos que permite executar código para praticamente qualquer tipo de aplicação ou serviço de backend sem provisionar ou gerenciar servidores. [Saiba mais.](https://aws.amazon.com/pt/lambda/)
- **DYNAMODB:** Banco de dados de chave-valor NoSQL, sem servidor e totalmente gerenciado, projetado para executar aplicações de alta performance em qualquer escala. [Saiba mais.](https://aws.amazon.com/pt/dynamodb/)

## :page_facing_up: Descrição do desafio de projeto

Oferecer autenticação, autorização e gerenciamento de usuários para suas aplicações Web e Mobile com o Amazon Cognito. Esse serviço, totalmente gerenciado pela AWS, suporta os principais mecanismos de segurança do mercado, além da integração com terceiros, como Facebook, Google, Apple ou a própria Amazon.

---

# API Node.js com Serverless Framework em ambiente AWS

Este repositório contém o código fonte do Live Coding da DIO no dia 29/07/2021. Neste projeto vamos criar uma infraestrutra em nuvem AWS com API Gateway, DynamoDB, AWS Lambda e AWS CloudFormation utilizando o framework Serverless para o desenvolvimento baseada em Infraestrutura as a Code.

## Etapas

Pré requisitos:

- possuir uma conta na AWS e instalar Node.js na máquina.
- Instalar o AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html

### Setup Inicial

#### Credenciais AWS

- Criar usuário: AWS Management Console -> IAM Dashboard -> Create New User -> <nome do usuário> -> Permissions "Administrator Access" -> Programmatic Access -> Dowload Keys
- No terminal: `$ aws configure` -> colar as credenciais geradas anteriormente
-

#### Configurar o framework Serverless

`$ npm i -g serverless`

### Desenvolvimento do projeto

```
$ serverless
Login/Register: No
Update: No
Type: Node.js REST API
Name: dio-live
```

```
$ cd dio-live
$ code .
```

- No arquivo `serverless.yml` adicionar a região `region: us-east-1` dentro do escopo de `provider:`
- Salvar e realizar o deploy `$ serverless deploy -v`

#### Estruturar o código

- Criar o diretório "src" e mover o arquivo "handler.js" para dentro dele
- Renomear o arquivo "handler.js" para "hello.js"
- Atualizar o código

```
const hello = async (event) => {
/////
module.exports = {
    handler:hello
}
```

- Atualizar o arquivo "serverless.yml "

```
handler: src/hello.handler
```

`$ serverless deploy -v `

#### DynamoDB

Atualizar o arquivo serverless.yml

```
resources:
  Resources:
    ItemTable:
      Type: AWS::DynamoDB::Table
      Properties:
          TableName: ItemTable
          BillingMode: PAY_PER_REQUEST
          AttributeDefinitions:
            - AttributeName: id
              AttributeType: S
          KeySchema:
            - AttributeName: id
              KeyType: HASH
```

#### Desenvolver funções lambda

    - Pasta /src do repositório

- Obter arn da tabela no DynamoDB AWS Console -> DynamoDB -> Overview -> Amazon Resource Name (ARN)
- Atualizar arquivo serverless.yml com o código a seguir, abaixo do `region:`

```
	iam:
    role:
        statements:
          - Effect: Allow
            Action:
              - dynamodb:PutItem
              - dynamodb:UpdateItem
              - dynamodb:GetItem
              - dynamodb:Scan
            Resource:
              - arn:aws:dynamodb:us-east-1:167880115321:table/ItemTable
```

- Instalar dependências

`npm init`
`npm i uuid aws-sdk`

- Atualizar lista de funções no arquivo serverless.yml

```
functions:
hello:
  handler: src/hello.handler
  events:
    - http:
        path: /
        method: get
insertItem:
  handler: src/insertItem.handler
  events:
    - http:
        path: /item
        method: post
fetchItems:
  handler: src/fetchItems.handler
  events:
    - http:
        path: /items
        method: get
fetchItem:
  handler: src/fetchItem.handler
  events:
    - http:
        path: /items/{id}
        method: get
updateItem:
  handler: src/updateItem.handler
  events:
    - http:
        path: /items/{id}
        method: put
```
