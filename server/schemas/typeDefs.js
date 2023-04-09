const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    projects: [ID]
  }

  type Project {
    _id: ID
    projectName: String
    initialCode: String
    projectDescription: String
    createdAt: String
    iterations: [ID]
  }

  type codeBlock {
    _id: ID
    block: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    newProject(initialCode: String!, projectName: String!, projectDescription: String!): Project
  }
`;

module.exports = typeDefs;
