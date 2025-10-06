# Pokémon GraphQL API

Uma API GraphQL que permite buscar informações de Pokémon através da PokeAPI e gerenciar atributos personalizados como favoritos, níveis de poder e apelidos.

## 📋 Sobre o Projeto

Esta aplicação oferece:
- **Consulta de Pokémon**: Busca dados da PokeAPI externa
- **Atributos Personalizados**: Adicione nickname, favorite e powerLevel
- **Validações de Negócio**: 
  - PowerLevel deve estar entre 1 e 100
  - Máximo de 3 Pokémon podem ser favoritos
- **Interface GraphQL**: Playground para testar queries e mutations

## 🛠 Tecnologias

- **Node.js** + **TypeScript**
- **GraphQL** + **Apollo Server**
- **MongoDB** + **Mongoose**
- **Express**
- **Jest** (testes)

## ⚡ Como Rodar

### 1. Pré-requisitos

- Node.js (versão 18 ou superior)
- MongoDB (local ou Atlas)
- npm

### 2. Instalação

```bash
# Clone o repositório
git clone https://github.com/pedrohbl03/poke-api-graphql.git
cd poke-api-graphql

# Instale as dependências
npm install
```

### 3. Configuração do Ambiente

Copie o arquivo de exemplo e configure as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
PORT=4000
MONGO_DB_URI=seu_url_acesso_mongo
POKE_API_BASE_URL=https://pokeapi.co/api/v2
```

> ⚠️ **IMPORTANTE**: Você DEVE configurar a `MONGO_DB_URI` para que o projeto funcione!

#### Opções para MongoDB:

**Opção 1 - MongoDB Local:**
```env
MONGO_DB_URI=mongodb://localhost:27017/pokemon-graphql
```

**Opção 2 - MongoDB Atlas (Nuvem - Recomendado):**
```env
MONGO_DB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/pokemon-graphql
```

### 4. Executar a Aplicação

```bash
# Modo desenvolvimento (com hot-reload)
npm run dev

# Modo produção
npm run build
npm start
```

A aplicação estará disponível em: **http://localhost:4000/graphql**

## 🧪 Como Rodar os Testes

Execute todos os testes:
```bash
npm test
```

Execute testes específicos:
```bash
# Testes de regras de negócio
npm test business-rules.unit.test.ts

# Testes de validação de schema
npm test schema-validation.unit.test.ts
```

Execute testes com coverage:
```bash
npm run test:coverage
```

Execute em modo watch:
```bash
npm run test:watch
```

## 📁 Arquivo .env.example

O arquivo `.env.example` contém as variáveis de ambiente necessárias:

```env
PORT=your_preferred_port_number
MONGO_DB_URI=your_mongodb_connection_string
POKE_API_BASE_URL=https://pokeapi.co/api/v2
```

### Explicação das Variáveis:

- **PORT**: Porta onde a aplicação irá rodar (padrão: 4000)
- **MONGO_DB_URI**: String de conexão com o MongoDB ⚠️ **OBRIGATÓRIO**
- **POKE_API_BASE_URL**: URL base da PokeAPI (opcional, já tem valor padrão)

> 🔴 **ATENÇÃO**: A variável `MONGO_DB_URI` é obrigatória! Sem ela, a aplicação não conseguirá conectar ao banco de dados e falhará ao iniciar.

## 🚀 Testando a API

Acesse o GraphQL Playground em: **http://localhost:4000/graphql**

### Exemplos de Queries:

**Buscar um Pokémon:**
```graphql
query {
  pokemon(name: "pikachu") {
    name
    height
    weight
    types {
      type {
        name
      }
    }
    powerLevel
    favorite
    nickname
  }
}
```

**Criar atributos personalizados:**
```graphql
mutation {
  createPokemonAttributes(input: {
    name: "pikachu"
    nickname: "Sparky"
    favorite: true
    powerLevel: 85
  }) {
    name
    nickname
    favorite
    powerLevel
  }
}
```

## 🛡️ Regras de Negócio

1. **PowerLevel**: Deve estar entre 1 e 100 (caso contrário, retorna erro)
2. **Favoritos**: Máximo de 3 Pokémon podem ser marcados como favoritos
3. **Nome**: Campo obrigatório para criar/atualizar atributos

## 📊 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Compila o TypeScript
- `npm start` - Executa a versão compilada
- `npm test` - Executa todos os testes
- `npm run test:watch` - Executa testes em modo watch
- `npm run test:coverage` - Executa testes com coverage
- `npm run lint` - Executa o linter

## 🔧 Estrutura do Projeto

```
src/
├── config/          # Configurações (env)
├── middlewares/     # Middlewares Express/GraphQL
├── models/          # Modelos Mongoose
├── repositories/    # Camada de acesso a dados
├── resolvers/       # Resolvers GraphQL
├── schema/          # Schema GraphQL
├── services/        # Lógica de negócio
├── tests/           # Testes unitários
├── types/           # Tipos TypeScript
├── utils/           # Utilitários
├── app.ts           # Configuração do servidor
└── index.ts         # Entrada da aplicação
```

## 🐛 Troubleshooting

### Problemas Comuns:

**Erro de conexão com MongoDB:**
- Verifique se o MongoDB está rodando
- Confirme se a `MONGO_DB_URI` no `.env` está correta

**Porta já em uso:**
- Altere a `PORT` no arquivo `.env`

**Dependências:**
- Delete `node_modules` e execute `npm install` novamente

**Testes falhando:**
- Verifique se todas as dependências estão instaladas
- Execute `npm run build` antes dos testes

## 📝 Autor

Pedro Lima - [GitHub](https://github.com/pedrohbl03)
