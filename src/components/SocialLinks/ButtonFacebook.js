import React, { Component } from 'react';
import { TouchableOpacity, Image, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { t, dispatchAsync } from '../../utils/common';
import { loginViaFacebook } from '../../store/actions/auth';

@connect(
  null,
  dispatch => ({ dispatchAsync: dispatchAsync(dispatch) })
)
export default class ButtonFacebook extends Component {
  login = async () => {
    Navigation.showLightBox({
      screen: 'loading',
      passProps: {
        text: 'Đang đăng nhập, xin vui lòng chờ'
      }
    });

    try {
      const result = await LoginManager.logInWithReadPermissions([
        'public_profile'
      ]);
      if (result.isCancelled) {
        //
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        await this.props.dispatchAsync(
          loginViaFacebook({ token: data.accessToken })
        );
      }
    } catch (e) {
      console.log('login via facebook error: ', e);
    }

    Navigation.dismissLightBox();
  };

  render() {
    return (
      <TouchableOpacity onPress={this.login}>
        <Image
          source={require('../../assets/images/icon_facebook.png')}
          resizeMode="contain"
          style={{
            width: 36,
            height: 51,
            marginRight: 5
          }}
        />
      </TouchableOpacity>
    );
  }
}
