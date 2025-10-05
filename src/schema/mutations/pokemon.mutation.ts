const pokemonMutations = `#graphql
  extend type Mutation {
    createPokemonAttributes(input: PokemonAttributesInput!): Pokemon!
    updatePokemonAttributes(id: ID!, input: PokemonAttributesInput!): Pokemon
    deletePokemonAttributes(id: ID!): Boolean
  }
`;

export default pokemonMutations;