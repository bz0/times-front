import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($user_id: ID, $content: String!) {
    createPost(input: {
      user_id: $user_id,
      content: $content
    }) {
      user_id
      content
    }
  }
`;

export interface PostInputType {
  params: {
    content?: string;
  };
}