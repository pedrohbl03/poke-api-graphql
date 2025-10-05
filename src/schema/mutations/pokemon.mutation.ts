const pokemonMutations = `#graphql
  extend type Mutation {
    createPokemonAttributes(input: PokemonAttributesInput!): Pokemon!
    updatePokemonAttributes(name: String!, input: PokemonAttributesInput!): Pokemon
    deletePokemonAttributes(name: String!): Boolean
  }
`;

export default pokemonMutations;