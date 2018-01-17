import gql from 'graphql-tag';

export default gql`
    {
    getTweets {
      _id
      text
    }
  }
`