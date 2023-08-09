const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    snippets: [Snippet]
  }

  type Snippet {
    _id: ID!
    title: String!
    description: String!
    code: String!
    language: String!
    tags: [String]
    user: User
    private: Boolean
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User]
    user(username: String!): User
    snippets: [Snippet]
    snippet(_id: ID!): Snippet
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthPayload
    addSnippet(title: String!, description: String!, code: String!, language: String!, tags: [String], private: Boolean): Snippet
    updateSnippet(_id: ID!, title: String!, description: String!, code: String!, language: String!, tags: [String], private: Boolean): Snippet
    removeSnippet(_id: ID!): Snippet
  }  
`;

module.exports = typeDefs;