const pokemonType = `#graphql
  type Pokemon {
    name: String!
    height: Int
    weight: Int
    types: [PokemonType!]

    # Additional fields for local database
    nickname: String
    favorite: Boolean
    powerLevel: Int
  }

  type PokemonType {
    slot: Int
    type: PokemonTypeInfo
  }
  
  type PokemonTypeInfo {
    name: String
    url: String
  }

  input PokemonAttributesInput {
    name: String!
    nickname: String
    favorite: Boolean
    powerLevel: Int
  }

  type PokemonPagination {
    count: Int!
    hasNext: Boolean!
    hasPrevious: Boolean!
    page: Int!
    totalPages: Int!
    results: [Pokemon!]!
  }

`;
export default pokemonType;