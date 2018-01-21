import React, { Component } from 'react';
import styled from 'styled-components/native';

import Loading from './Loading';
import ButtonHeader from './ButtonHeader';

import { graphql } from 'react-apollo';
import  { ME }  from '../graphql/queries/user';

const AVATAR_SIZE = 30;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  borderRadius: ${AVATAR_RADIUS};
`;

class HeaderAvatar extends Component {
  _onOpenActionSheet = () => {
    // const options = ['Logout', 'Cancel'];
    // const destructiveButtonIndex = 0;
    // this.props.showActionSheetWithOptions(
    //   {
    //     options,
    //     destructiveButtonIndex,
    //   },
    //   buttonIndex => {
    //     if (buttonIndex === 0) {
    //       this.props.client.resetStore()
    //       return this.props.logout();
    //     }
    //   },
    // );
  };

  render() {
    
    if (!this.props.data.me) {
      return (
        <ButtonHeader side="left" disabled>
          <Loading size="small" />
        </ButtonHeader>
      );
    }
    return (
      <ButtonHeader side="left" onPress={this._onOpenActionSheet}>
        <Avatar source={{ uri: this.props.data.me.avatar }} />
      </ButtonHeader>
    );
  }
}

export default graphql(ME)(HeaderAvatar);
