import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Apollo graphQL dep
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Navigations
import AppNavigation from './src/navigater';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
  cache: new InMemoryCache()
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

