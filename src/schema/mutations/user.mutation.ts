const userMutations = `#graphql
  extend type Mutation {
    addUser(username: String!, email: String!): User
    updateUser(id: ID!, username: String, email: String): User
    deleteUser(id: ID!): Boolean
    login(username: String!, password: String!): String
    register(username: String!, email: String!, password: String!): User
  }
`;

export default userMutations;
