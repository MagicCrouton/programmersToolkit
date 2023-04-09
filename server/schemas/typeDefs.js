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
    project(_id: ID): Project
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    newProject(initialCode: String!, projectName: String!, projectDescription: String!): Project
    saveProject(currentCode: String!, prompt: String!, projectID: ID): Project
  }
`;

module.exports = typeDefs;
