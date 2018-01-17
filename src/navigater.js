import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

// Screens
import homeScreen from './screens/homeScreen';
import notificationScreen from './screens/notificationScreen';
import profileScreen from './screens/profileScreen';

// Auth Screens
import signupScreen from './screens/auth/signupScreen';


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
    state = {
        isloggedin: false
    }
    render() {
        if(!this.state.isloggedin) {
            return <AuthNavigator />
        }
        return (
           <RootNavigator /> 
        );
    }
}

export default AppNavigation;
