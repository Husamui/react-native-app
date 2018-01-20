import React, { Component } from 'react';
import { Platform, Keyboard, AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import Touchable from '@appandflow/touchable';

// GraphQL 
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTHENTICAT, LOGIN } from '../../graphql/mutations/user'
import { signIn } from '../../utils/auth';

// import SIGNUP_MUTATION from '../graphql/mutations/signup';
import { colors, fakeAvatar } from '../../utils/constants';

import Loading from '../../components/Loading';

import { NavigationActions } from 'react-navigation'

class SigninScreen extends Component {

  state = {
    email: '',
    password: '',
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

    if ( !email || !password ) {
      return true;
    }
    return false;
  }

  _onSigninPress = async () => {
    this.setState({ loading: true });

    const { email, password } = this.state;

    try {
      const { data } = await this.props.login({
        variables: {
          email,
          password
        },
      });
      console.log('data back', data);
      if(!data.login.error){
        await signIn(data.login.token);
        this.props.authenticat()
      }
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
        </Wrapper>
        <ButtonConfirm
          onPress={this._onSigninPress.bind(this)}
          disabled={this._checkIfDisabled()}
        >
          <ButtonConfirmText>Sign In</ButtonConfirmText>
        </ButtonConfirm>
      </Root>
    );
  }
}

export default compose(
  graphql(LOGIN,{
    name: 'login'
  }),
  graphql(AUTHENTICAT,{
    name: 'authenticat'
  })
)(SigninScreen);


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