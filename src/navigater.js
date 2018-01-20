import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome, SimpleLineIcons, EvilIcons } from '@expo/vector-icons';
import { Button } from 'react-native';

// Screens
import HomeScreen from './screens/homeScreen';
import NotificationsScreen from './screens/notificationScreen';
import ProfileScreen from './screens/profileScreen';
import ExploreScreen from './screens/exploreScreen';
import NewTweetScreen from './screens/newTweetScreen';




// Auth Screens
import signupScreen from './screens/auth/signupScreen';

// GraphQL 
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTHENTICAT_QUERY } from './graphql/queries/user';


import { colors } from './utils/constants';
const TAB_ICON_SIZE = 20;


const RootTabs = TabNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
          headerTitle: 'Home',
          tabBarIcon: ({ tintColor }) =>
            <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="home" />,
        }),
      },
      Explore: {
        screen: ExploreScreen,
        navigationOptions: () => ({
          headerTitle: 'Explore',
          tabBarIcon: ({ tintColor }) =>
            <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="search" />,
        }),
      },
      Notifications: {
        screen: NotificationsScreen,
        navigationOptions: () => ({
          headerTitle: 'Notifications',
          tabBarIcon: ({ tintColor }) =>
            <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="bell" />,
        }),
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: () => ({
          headerTitle: 'Profile',
          tabBarIcon: ({ tintColor }) =>
            <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="user" />,
        }),
      },
    },
    {
      lazy: true,
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      tabBarOptions: {
        showIcon: true,
        showLabel: false,
        activeTintColor: colors.PRIMARY,
        inactiveTintColor: colors.LIGHT_GRAY,
        style: {
          backgroundColor: colors.WHITE,
          height: 50,
          paddingVertical: 5,
        },
      },
    },
);

const NewTweetModal = StackNavigator(
  {
    NewTweet: {
      screen: NewTweetScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Button title='Left' />,
        headerRight: <Button title='Right' />,
      }),
    },
  },
  {
    headerMode: 'none',
  },
);

const RootNavigator = StackNavigator(
  {
    Home: {
      screen: RootTabs,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Button title='Left' />,
        headerRight: <Button title='Right' />,
      }),
    },
    NewTweet: {
      screen: NewTweetModal,
    },
  },
  {
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.SECONDARY,
      },
    }),
  },
);


const AuthNavigator = StackNavigator({
    signup: {
        screen: signupScreen
    }
});


class AppNavigation extends Component {
    render() {
        if(!this.props.data.authenticat) {
            return <AuthNavigator />
        }
        return (
           <RootNavigator /> 
        );
    }
}

export default graphql(AUTHENTICAT_QUERY)(AppNavigation);
