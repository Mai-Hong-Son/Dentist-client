import React from 'react';
import { TouchableOpacity, Alert, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { connect } from 'react-redux';
import constants from '../../constant';
import { t, dispatchAsync } from '../../utils/common';
import { loginViaGoogle } from '../../store/actions/auth';

GoogleSignin.configure({
  iosClientId: constants.google_client_ios_id // only for iOS
});

@connect(
  null,
  dispatch => ({ dispatchAsync: dispatchAsync(dispatch) })
)
export default class ButtonGoogle extends React.PureComponent {
  static propTypes = {
    onLoggingInBegin: PropTypes.func,
    onLoggingInEnd: PropTypes.func
  };

  static defaultProps = {
    onLoggingInBegin: () => {},
    onLoggingInEnd: () => {}
  };

  press = async () => {
    Navigation.showLightBox({
      screen: 'loading',
      passProps: {
        text: 'Đang đăng nhập, xin vui lòng chờ'
      }
    });

    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });
      await GoogleSignin.revokeAccess();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.idToken) {
        await this.props.dispatchAsync(
          loginViaGoogle({ token: userInfo.idToken })
        );
      } else {
        console.log(userInfo);
        Alert.alert(t('google.login_invalid_error'));
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }

      console.log(error, 'err');
    }

    Navigation.dismissLightBox();
  };

  render() {
    return (
      <TouchableOpacity onPress={() => this.press()}>
        <Image
          source={require('../../assets/images/icon_gplus.png')}
          resizeMode="contain"
          style={{
            width: 36,
            height: 51,
            marginLeft: 5
          }}
        />
      </TouchableOpacity>
    );
  }
}
