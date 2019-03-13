import React from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, Alert, BackHandler } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import InputField from '../../elements/Form/InputField';
import PasswordField from '../../elements/Form/PasswordField';

import platform from '../../theme/variables/platform';
import { t, dispatchAsync } from '../../utils/common';
import withModal from '../../utils/withModal';
import { findScreenById } from '../../route';
import LightButton from '../../theme/components/LightButton';

import ForgotLink from './ForgotLink';
import FullGradient from '../../components/FullGradient';
import SocialLinks from '../../components/SocialLinks';
import RegisterLink from './RegisterLink';

import { login } from '../../store/actions/auth';
import { isLogged } from '../../store/selectors/auth';
import Scale from '../../utils/Scale';

@withModal()
@connect(
  state => ({
    isLogged: isLogged(state),
    screen: state.navigator.screen
  }),
  dispatch => ({
    dispatchAsync: dispatchAsync(dispatch)
  })
)
@reduxForm({
  form: 'login'
})
export default class Login extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true,
    navBarHidden: true,
    disabledBackGesture: true
  };

  register() {
    this.props.navigator.push({
      screen: findScreenById('register')
    });
  }

  login = async values => {
    try {
      this.showLoadingScreen();
      await this.props.dispatchAsync(login(values));
      this.hideLoadingScreen();
    } catch (err) {
      this.hideLoadingScreen();
      if (err.errors) {
        const messages = Object.keys(err.errors).map(field => err.errors[field]);
        const messagesFormat = [];

        for (let i = 0; i < messages.length; i++) {
          if (messages[i] === 'INCORRECT_USERNAME' || messages[i] === 'INCORRECT_PASSWORD') {
            messagesFormat.push(t(messages[i]));
          } else {
            messagesFormat.push(messages[i]);
          }
        }

        this.props.modal.showAlert({
          title: t('login.error_title'),
          description: messagesFormat.join('\n')
        });
      }
    }
  };

  showLoadingScreen = () => {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.props.navigator.showLightBox({
      screen: 'loading',
      passProps: {
        text: 'Đang đăng nhập, xin vui lòng chờ'
      }
    });
  };

  hideLoadingScreen = () => {
    if (!this.loading) {
      return;
    }
    this.loading = false;
    this.props.navigator.dismissLightBox();
  };

  render() {
    return (
      <FullGradient
        style={{
          alignItems: 'center',
          flexDirection: 'column',
          alignContent: 'center'
        }}
      >
        <View
          style={{
            alignItems: 'center',
            paddingTop: Scale.getSize(45)
          }}
        >
          <Image
            resizeMode="contain"
            style={{
              width: platform.deviceWidth / 3,
              height: platform.deviceHeight / 4 - 20
            }}
            source={require('./logo.png')}
          />
          <View style={{ alignItems: 'center', paddingBottom: Scale.getSize(15) }}>
            <Text style={{ fontSize: Scale.getSize(15), color: '#fff', fontWeight: '700' }}>
              {'Ai cũng đủ tiền làm răng'}
            </Text>
          </View>
        </View>
        <Field
          name="username"
          label={t('LOGIN_USERNAME')}
          component={InputField}
          prefix={
            <Image
              resizeMode={'contain'}
              source={require('../../assets/images/icon_username.png')}
              style={{
                width: 22,
                height: 26
              }}
            />
          }
        />
        <Field
          name="password"
          label={t('LOGIN_PASSWORD')}
          component={PasswordField}
          prefix={
            <Image
              resizeMode={'contain'}
              source={require('../../assets/images/icon_password.png')}
              style={{
                width: 22,
                height: 26
              }}
            />
          }
        />

        <View
          style={{
            alignItems: 'flex-end',
            width: '100%',
            marginVertical: 16
          }}
        >
          <ForgotLink />
        </View>

        <LightButton onPress={this.props.handleSubmit(this.login)}>{t('login.submit')}</LightButton>

        <Text
          style={{
            color: '#fff',
            fontSize: 12,
            textAlign: 'right',
            paddingVertical: 8
          }}
        >
          {t('login.via_social')}
        </Text>

        <SocialLinks />
        <RegisterLink onPress={this.register.bind(this)} />
      </FullGradient>
    );
  }
}
