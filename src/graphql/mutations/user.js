import gql from 'graphql-tag';

export const AUTHENTICAT = gql`
    mutation authenticat($token: String) {
        authenticat(token: $token) @client
    }
`;

export const LOGOUT = gql`
    mutation logout($logout: Boolean) {
        logout(logout: $logout) @client
    }
`;

export const SIGNUP = gql`
  mutation signup(
    $fullname: String!
    $email: String!
    $password: String!
    $username: String!
    $avatar: String
  ) {
    signup(
      fullname: $fullname
      email: $email
      password: $password
      username: $username
      avatar: $avatar
    ) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email
      password: $password
    ) {
      token
    }
  }
`;