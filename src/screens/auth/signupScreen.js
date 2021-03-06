import React, { Component } from 'react';
import { Platform, Keyboard, AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import Touchable from '@appandflow/touchable';


// GraphQL 
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTHENTICAT, SIGNUP } from '../../graphql/mutations/user'
import { signIn } from '../../utils/auth';

// import SIGNUP_MUTATION from '../graphql/mutations/signup';
import { colors, fakeAvatar } from '../../utils/constants';

import Loading from '../../components/Loading';

import { NavigationActions } from 'react-navigation'

class SignupScreen extends Component {

  state = {
    fullName: '',
    email: '',
    password: '',
    username: '',
    loading: false,
  };

  onBackPress(){
    this.props.navigation.dispatch(NavigationActions.back())
  }
  _onOutsidePress = () => Keyboard.dismiss();

  _onChangeText = (text, type) => {
    this.setState({ [type]: text })
  };

  _checkIfDisabled() {
    const { fullname, email, password, username } = this.state;

    if (!fullname || !email || !password || !username) {
      return true;
    }

    return false;
  }

  _onSignupPress = async () => {
    this.setState({ loading: true });

    const { fullname, email, password, username } = this.state;
    const avatar = fakeAvatar;

    try {
      const { data } = await this.props.signup({
        variables: {
          fullname,
          email,
          password,
          username,
          avatar,
        },
      });
      await signIn(data.signup.token);
      this.props.authenticat()
    } catch (error) {
      throw error;
    }
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <Root onPress={this._onOutsidePress}>
        <BackButton onPress={this.onBackPress.bind(this)}>
          <MaterialIcons color={colors.WHITE} size={30} name="arrow-back" />
        </BackButton>
        <Wrapper>
          <InputWrapper>
            <Input
              placeholder="Full Name"
              autoCapitalize="words"
              onChangeText={text => this._onChangeText(text, 'fullname')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => this._onChangeText(text, 'email')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={text => this._onChangeText(text, 'password')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={text => this._onChangeText(text, 'username')}
            />
          </InputWrapper>
        </Wrapper>
        <ButtonConfirm
          onPress={this._onSignupPress.bind(this)}
          disabled={this._checkIfDisabled()}
        >
          <ButtonConfirmText>Sign Up</ButtonConfirmText>
        </ButtonConfirm>
      </Root>
    );
  }
}

export default compose(
  graphql(SIGNUP,{
    name: 'signup'
  }),
  graphql(AUTHENTICAT,{
    name: 'authenticat'
  })
)(SignupScreen);


const Root = styled(Touchable).attrs({
  feedback: 'none',
})`
  flex: 1;
  backgroundColor: ${props => props.theme.SECONDARY};
  position: relative;
  justifyContent: center;
  alignItems: center;
`;

const Wrapper = styled.View`
  alignSelf: stretch;
  alignItems: center;
  justifyContent: center;
  flex: 1;
`;

const BackButton = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
})`
  justifyContent: center;
  alignItems: center;
  position: absolute;
  top: 5%;
  zIndex: 1;
  left: 5%;
`;

const ButtonConfirm = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  position: absolute;
  bottom: 15%;
  width: 70%;
  height: 50;
  backgroundColor: ${props => props.theme.PRIMARY};
  borderRadius: 10;
  justifyContent: center;
  alignItems: center;
  shadowColor: #000;
  shadowOpacity: 0.2;
  shadowRadius: 5;
  shadowOffset: 0px 2px;
  elevation: 2;
`;

const ButtonConfirmText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontWeight: 600;
`;

const InputWrapper = styled.View`
  height: 50;
  width: 70%;
  borderBottomWidth: 2;
  borderBottomColor: ${props => props.theme.LIGHT_GRAY};
  marginVertical: 5;
  justifyContent: flex-end;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.LIGHT_GRAY,
  selectionColor: Platform.OS === 'ios' ? colors.PRIMARY : undefined,
  autoCorrect: false,
})`
  height: 30;
  color: ${props => props.theme.WHITE};
`;