const pokemonMutations = `#graphql
  extend type Mutation {
    createPokemonAttributes(input: PokemonAttributesInput!): Pokemon!
    updatePokemonAttributes(input: PokemonAttributesInput!): Pokemon
    deletePokemonAttributes(name: String!): Boolean
  }
`;

export default pokemonMutations;