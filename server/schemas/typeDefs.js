const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Tool {
    _id: ID!
    toolId: String
    name: String
  }
type User {
    _id: ID!
    username: String
    email: String
    savedTools: [Tool]
  }
//   Input for savedTool?? 
  type Query {
    me: User  
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
//    Need one with user linked with savedTool
}
type Auth {
    token: ID!
    user: User
  }
`;



// export the typeDefs
module.exports = typeDefs;
