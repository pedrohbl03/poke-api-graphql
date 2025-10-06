const pokemonQueries =`#graphql
  extend type Query {
    pokemons: PokemonPagination!
    pokemon(name: String!): Pokemon
  }
`;

export default pokemonQueries;