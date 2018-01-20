import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import { graphql } from 'react-apollo';
import  getTweets  from '../graphql/queries/getTweets';
import  { LOGOUT }  from '../graphql/mutations/user';


class HomeScreen extends Component {
  // fakeAvatar = 'hello av'
  state = {
    fullname: 'Hayden Salem',
    email: 'hayden@gmail.com',
    password: '123123',
    username: 'Hayden_Salem',
  }
  _onSignupPress = async () => {
    this.setState({ loading: true });

    const { fullname, email, password, username } = this.state;
    const avatar = 'hello';

    try {
      const { data } = await this.props.mutate({
        variables: {
          fullname,
          email,
          password,
          username,
          avatar,
        },
      });
      this.setState({ loading: false });
      console.log('after signup', data);
      // return this.props.login();
    } catch (error) {
      throw error;
    }
  };

  _onLogout(){
    this.props.mutate();
  }

  newTweet(){
    this.props.navigation.navigate('NewTweet');
  }

  render() {
    console.log('the render props are: ', this.props)
    return (
      <View>
        <Button title='Logout' onPress={this._onLogout.bind(this)}>
        </Button>
        <Button title='New Tweet' onPress={this.newTweet.bind(this)}></Button>
        <Text> Home Screen </Text>
      </View>
    );
  }
}

export default graphql(LOGOUT)(HomeScreen);