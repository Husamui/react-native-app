import gql from 'graphql-tag';

export const AUTHENTICAT = gql`
    mutation authenticat($authenticat: Boolean) {
        authenticat(authenticat: $authenticat) @client
    }
`;