import gql from 'graphql-tag';

export const AUTHENTICAT_QUERY = gql`
    {
        authenticat @client
    }
`;