import { gql } from "@apollo/client";

export const USER_FIND_QUERY = gql`
  query user($id: ID) {
    user(id: $id) {
        id
        name
        github_id
        avatar_url
        bio
    }
  }
`;