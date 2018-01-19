import gql from 'graphql-tag';

const authenticat = {
  defaults: {
    authenticat: false,
  },
  resolvers: {
    Mutation: {
      authenticat: (_, {authenticat}, { cache }) => {
        cache.writeData({ data: {authenticat} });
        return null;
      }
    },
  },
};

export default authenticat;
