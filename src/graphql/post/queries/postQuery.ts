import { gql } from "@apollo/client";

export const POSTS_QUERY = gql`
  query Post($first: Int, $page: Int, $user_id: ID) {
    posts(first:$first, page:$page, user_id:$user_id) {
      data{
        id
        user_id
        content
        created_at
        user {
          id
          name
          avatar_url
          github_id
          bio
        }
      }
      paginatorInfo{
        total
        currentPage
        lastPage
        hasMorePages
      }
    }
  }
`;