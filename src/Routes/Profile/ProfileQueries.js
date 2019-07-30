import { gql } from "apollo-boost";

export const GET_USER = gql`
  query seeUser($userName: String!) {
    seeUser(userName: $userName) {
      id
      avatar
      userName
      fullName
      bio
      isFollowing
      isSelf
      followingCount
      followersCount
      postCount
      posts {
        id
        likeCount
        commentCount
        files {
          id
          url
        }
      }
    }
  }
`;

export const LOCAL_LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
