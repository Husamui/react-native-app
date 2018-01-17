import React, { Component } from 'react';
import { View, Text,  } from 'react-native';

import { graphql } from 'react-apollo';
import  getTweets  from '../graphql/queries/getTweets';


class HomeScreen extends Component {

  render() {
    console.log(this.props.data.getTweets)
    return (
      <View>
        <Text> Home Screen </Text>
      </View>
    );
  }
}

export default graphql(getTweets)(HomeScreen);