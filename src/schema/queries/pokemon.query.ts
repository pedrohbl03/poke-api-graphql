const pokemonQueries =`#graphql
  extend type Query {
    pokemons: [Pokemon!]
    pokemon(name: String!): Pokemon
  }
`;

export default pokemonQueries;