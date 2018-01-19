import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

// GraphQL 
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const AUTHENTICAT = gql`
  mutation authenticat($authenticat: Boolean) {
    authenticat(authenticat: $authenticat) @client
  }
`;

class SignupScreen extends Component {
  state = {
    authenticat: true
  }
  _login(){
      this.props.mutate({ variables: { authenticat: this.state.authenticat } })
  }
  render() {
    return (
      <View>
          <Button title='Auth it' onPress={this._login.bind(this)}></Button>
        <Text> Signup Screen </Text>
      </View>
    );
  }
}

export default graphql(AUTHENTICAT)(SignupScreen);
