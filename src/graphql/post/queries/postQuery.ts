import { gql } from "@apollo/client";

export const POSTS_QUERY = gql`
  query Post($first: Int, $page: Int) {
    posts(first:$first, page:$page) {
      data{
        id
        user_id
        content
        created_at
        user {
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