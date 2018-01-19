import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Apollo graphQL dep
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import auth from './src/graphql/resolvers/auth'
// Navigations
import AppNavigation from './src/navigater';

const cache = new InMemoryCache();
const stateLink = withClientState({...auth, cache})

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({ uri: 'http://localhost:3000/graphql' })
  ]),
  cache
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppNavigation />
      </ApolloProvider>
    );
  }
}

