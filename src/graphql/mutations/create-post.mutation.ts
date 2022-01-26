import { gql } from '@apollo/client';
import { Post } from '../../types';

export const UPDATE_POST = gql`
  mutation($params: PostInputType!) {
    updatePost(input: { params: $params }) {
      id
      title
      body
    }
  }
`;

export interface UpdatePostData {
  post: Post;
}

export interface PostInputType {
  params: {
    id: number;
    title?: string;
    body?: string;
  };
}