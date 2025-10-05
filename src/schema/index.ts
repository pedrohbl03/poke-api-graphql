import * as mutations from './mutations';
import * as queries from './queries';
import * as types from './types';

const baseSchema = `#graphql
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = [
  baseSchema,

  // Pokemon Schema
  types.pokemonType,
  queries.pokemonQueries,
  mutations.pokemonMutations,

  // User Schema
  types.userType,
  queries.userQueries,
  mutations.userMutations
];

export default typeDefs;