const pokemonQueries =`#graphql
  extend type Query {
    pokemons: [Pokemon!]!
    pokemon(id: ID!): Pokemon!
  }
`;

export default pokemonQueries;