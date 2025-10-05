const userQueries = `#graphql
  extend type Query {
    users: [User!]
    user(id: ID!): User
  }
`;

export default userQueries;