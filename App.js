import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { AppLoading } from 'expo';

// Apollo graphQL dep
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { setContext } from "apollo-link-context";
import { ApolloLink } from 'apollo-link';
import auth from './src/graphql/resolvers/auth'
// Navigations
import AppNavigation from './src/navigater';

import { colors } from './src/utils/constants';
import { getToken } from './src/utils/auth';
import Loading from './src/components/Loading';

const cache = new InMemoryCache();

const asyncMiddleware = setContext( async (request, previousContext) => {
  
  const token = await AsyncStorage.getItem('AUTH_TOKEN');
    return {
      ...previousContext,
      headers: {
        ...previousContext.headers,
        authorization: `Bearer ${token}`,
      },
    }

});


const stateLink = withClientState({...auth, cache})
const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });
const aplloLink = ApolloLink.from([
  stateLink,
  asyncMiddleware,
  httpLink
]);


// const finaleLink = middlewareLink.concat(httpLink)
const client = new ApolloClient({
  link: aplloLink,
  cache
});

export default class App extends React.Component {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this._checkIfToken();
  }

  _checkIfToken = async () => {
    try {
      const token = await getToken();
      console.log('app token', token);
      if (token) {
        console.log('the cache is: ', cache);
        cache.writeData({data: {authenticat: true}});
      }
    } catch (error) {
      throw error;
    }

    this.setState({ appIsReady: true });
  };

  render() {
    if (!this.state.appIsReady) {
      return <AppLoading />;
    }
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={colors}>
          <AppNavigation />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

