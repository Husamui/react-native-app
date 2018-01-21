import gql from 'graphql-tag';

export const AUTHENTICAT_QUERY = gql`
    {
        authenticat @client
    }
`;

export const ME = gql`
{
  me {
    avatar
    username
    firstname
    lastname
  }
}
`;