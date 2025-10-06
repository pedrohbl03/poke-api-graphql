import type { CodegenConfig } from '@graphql-codegen/cli';
import typeDefs from './src/schema';

const config: CodegenConfig = {
  schema: typeDefs,
  generates: {
    './src/types/graphql-generated.types.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers'
      ],
      config: {
        useIndexSignature: true,
        contextType: '../types/graphql-context.type#GraphQLContext',
        mappers: {
          Pokemon: '../types/pokeapi-response.type#IPokemon',
        },
        scalars: {
          ID: 'string',
          String: 'string',
          Boolean: 'boolean',
          Int: 'number',
          Float: 'number',
        }
      }
    }
  },
  hooks: {
    afterAllFileWrite: ['prettier --write']
  }
};

export default config;