import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

// Screens
import homeScreen from './screens/homeScreen';
import notificationScreen from './screens/notificationScreen';
import profileScreen from './screens/profileScreen';

// Auth Screens
import signupScreen from './screens/auth/signupScreen';

// GraphQL 
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';




const AUTHENTICAT_QUERY = gql`
    {
        authenticat @client
    }
`;
// const VISIBILITY_QUERY = gql`
//   {
//     visibilityFilter @client
//   }
// `;

const RootTabs = TabNavigator({
    home: {
        screen: homeScreen,
        navigationOptions: {
            headerTitle: 'Home',
        },
    },
    notifications: {
        screen: notificationScreen,
        navigationOptions: {
            headerTitle: 'Home',
        },
    },
    profile: {
        screen: profileScreen,
        navigationOptions: {
            headerTitle: 'Home',
        },
    } ,
});

const RootNavigator = StackNavigator({
    app: {
        screen: RootTabs
    }
});

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
