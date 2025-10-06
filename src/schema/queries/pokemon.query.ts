const pokemonQueries =`#graphql
  extend type Query {
    pokemons(page: Int, limit: Int): PokemonPagination!
    pokemon(name: String!): Pokemon
  }
`;

export default pokemonQueries;