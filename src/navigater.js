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
import Loading from './components/Loading';



// Auth Screens
import authScreen from './screens/auth/authScreen';
import signupScreen from './screens/auth/signupScreen';
import signScreen from './screens/auth/signScreen';

// GraphQL 
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTHENTICAT_QUERY } from './graphql/queries/user';
import { AUTHENTICAT } from './graphql/mutations/user'


import { colors } from './utils/constants';
import { getToken } from './utils/auth';

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

    Auth: {
        screen: authScreen,
    },
    Signup: {
        screen: signupScreen,
    },
    Signin: {
        screen: signScreen,
    },
},{
  navigationOptions: () => ({
    header: null,
  }),
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

export default compose(
  graphql(AUTHENTICAT_QUERY),
  graphql(AUTHENTICAT)
)(AppNavigation);
