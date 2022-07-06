import gql from "graphql-tag";

export const getPosts = gql`
  {
    posts {
      id
      title
      body
    }
  }
`;

export const getFilteredPost = gql`
  query getFilteredPost($title: String!) {
    post(title: $title) {
      id
      title
    }
  }
`;