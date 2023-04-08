const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Project {
  _id: ID
  projectName: String
  initialCode: String
  projectDescription: String
  createdAt: String
  iterations: [String]
}
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }
  input savedProject {
    projectId: String
    projectName: String
    toolType: String
    projectDescription: String
    createdAt: String
    iterations: [String]
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
    saveProject(input: savedProject!): User
    newProject(initialCode: String!, projectName: String!, projectDescription: String!): Project
  }
`;

module.exports = typeDefs;
