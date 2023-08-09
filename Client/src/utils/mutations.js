import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      email
      username
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_SNIPPET = gql`
  mutation AddSnippet(
    $title: String!
    $description: String!
    $code: String!
    $language: String!
    $tags: [String]
    $private: Boolean
  ) {
    addSnippet(
      title: $title
      description: $description
      code: $code
      language: $language
      tags: $tags
      private: $private
    ) {
      _id
      title
      description
      code
      language
      tags
      private
      user {
        _id
      }
    }
  }
`;

export const DELETE_SNIPPET = gql`
  mutation DeleteSnippet($snippetId: ID!) {
    removeSnippet(_id: $snippetId) {
      _id
    }
  }
`;

export const UPDATE_SNIPPET = gql`
  mutation UpdateSnippet(
    $snippetId: ID!
    $title: String!
    $description: String!
    $code: String!
    $language: String!
    $tags: [String]
    $private: Boolean
  ) {
    updateSnippet(
      _id: $snippetId
      title: $title
      description: $description
      code: $code
      language: $language
      tags: $tags
      private: $private
    ) {
      _id
      title
      description
      code
      language
      tags
      private
      user {
        _id
      }
    }
  }
`;
