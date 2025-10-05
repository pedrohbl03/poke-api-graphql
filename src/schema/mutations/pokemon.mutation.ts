const pokemonMutations = `#graphql
  extend type Mutation {
    addPokemon(name: String!, nickname: String, favorite: Boolean, powerLevel: Int): Pokemon
    updatePokemon(id: ID!, name: String, nickname: String, favorite: Boolean, powerLevel: Int): Pokemon
    deletePokemon(id: ID!): Boolean
    createPokemonAttributes(input: PokemonAttributesInput!): Pokemon!
  }
`;

export default pokemonMutations;