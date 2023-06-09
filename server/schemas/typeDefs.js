const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    projects: [Project]
  }

  type Project {
    _id: ID
    projectName: String
    initialCode: String
    projectDescription: String
    createdAt: String
    iterations: [CodeBlock]
  }

  type CodeBlock {
    _id: ID
    instruction: String
    block: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    projects: [Project]
    project(projectId: ID!): Project
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    newProject(initialCode: String!, projectName: String!, projectDescription: String!): Project
    saveProject(blockId: ID!, currentCode: String!): Project
    editProject(projectID: ID!, currentCode: String!, prompt: String!): Project
    removeProjectfromUser(projectId: ID!): User
    findSingleProject(projectId: ID!): Project
  }
`;

module.exports = typeDefs;
