const pokemonType = `#graphql
  type Pokemon {
    id: ID!
    name: String!
    height: Int
    weight: Int
    types: [String!]!

    # Additional fields for local database
    nickname: String
    favorite: Boolean
    powerLevel: Int
  }

  input PokemonAttributesInput {
    pokemonName: String!
    nickname: String
    favorite: Boolean
    powerLevel: Int
  }
`;
export default pokemonType;