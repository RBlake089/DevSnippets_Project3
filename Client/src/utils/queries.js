import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query GetMySnippets {
    me {
      snippets {
        _id
        title
        description
        code
        language
        tags
        user {
          _id
        }
        private
      }
    }
  }
`;
