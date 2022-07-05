import gql from "graphql-tag";

export const getPosts = gql`
  {
    posts {
      id
      title
    }
  }
`;