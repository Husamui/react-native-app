import gql from 'graphql-tag';

export default gql`
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