import gql from 'graphql-tag';
import { AsyncStorage } from 'react-native';

const AUTH_TOKEN = 'AUTH_TOKEN';

const authenticat = {
  defaults: {
    authenticat: false,
  },
  resolvers: {
    Mutation: {
      authenticat: (_, args, { cache }) => {
        cache.writeData({data: {authenticat: true}});
        return null;
      },
      logout: async (_, args, { cache }) => {
        await AsyncStorage.removeItem(AUTH_TOKEN);
        cache.writeData({data: {authenticat: false}});
        return null;
      }
    },
  },
};

export default authenticat;
