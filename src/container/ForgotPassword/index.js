import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import { t, dispatchAsync } from '../../utils/common';
import FullGradient from '../../components/FullGradient';
import LightButton from '../../theme/components/LightButton';
import platform from '../../theme/variables/platform';
import InputField from '../../elements/Form/InputField';
import { findScreenById } from '../../route';
import { forgotPasswordViaEmail } from '../../store/actions/auth';

const selector = formValueSelector('forgot_password');

const styles = StyleSheet.create({
  forgot: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  }
});

@reduxForm({
  form: 'forgot_password',
  initialValues: {
    email: ''
  }
})
@connect(
  state => ({
    email: selector(state, 'email')
  }),
  dispatch => ({
    dispatchAsync: dispatchAsync(dispatch)
  })
)
export default class ForgotPassword extends React.Component {
  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTransparent: true,
    tabBarHidden: true,
    drawUnderTabBar: true,
    navBarTextColor: '#fff',
    navBarButtonColor: '#fff',
    navBarButtonFontWeight: 'bold'
  };

  componentDidMount() {
    this.props.navigator.setTitle({
      // the new title of the screen as appears in the nav bar
      title: t('SCREEN_TITLE_FORGOT_PASSWORD')
    });
  }

  performRequest = async () => {
    try {
      await this.props.dispatchAsync(
        forgotPasswordViaEmail({ email: this.props.email || '' })
      );

      // show alert
      this.props.navigator.showLightBox({
        screen: findScreenById('modal_success'),
        passProps: {
          title: t('FORGOT_PASSWORD_MODAL_SUCCESS_TITLE'),
          content: t('FORGOT_PASSWORD_MODAL_SUCCESS_MESSAGE'),
          onSuccess: () => {
            this.props.navigator.pop();
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <FullGradient style={{ padding: 0 }}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          enableOnAndroid
          enableAutomaticScroll
          keyboardOpeningTime={0}
          extraHeight={Platform.select({ android: 200 })}
        >
          <View
            style={{
              padding: 20,
              marginTop: 30,
              minHeight: platform.deviceHeight
            }}
          >
            <View
              style={{
                alignItems: 'center'
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: platform.deviceWidth / 3,
                  height: platform.deviceWidth / 3 + 50
                }}
                source={require('./logo.png')}
              />
            </View>

            <Field
              name="email"
              label={t('FORGOT_PASSWORD_EMAIL')}
              component={InputField}
              prefix={
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/icon_email.png')}
                  style={{
                    width: 22,
                    height: 26
                  }}
                />
              }
            />

            <View
              style={{
                flexDirection: 'row-reverse',
                paddingVertical: 20
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => this.props.navigator.pop()}
              >
                <Text style={{ color: '#fff' }}>
                  {t('forgot_password.remember')}{' '}
                </Text>
                <Text style={styles.forgot}>{t('forgot_password.login')}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center' }}>
              <LightButton
                onPress={this.props.handleSubmit(this.performRequest)}
                style={{
                  marginTop: 30,
                  width: platform.deviceWidth * 0.6
                }}
              >
                {t('FORGOT_PASSWORD_BUTTON')}
              </LightButton>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                style={styles.resendButton}
                onPress={this.performRequest}
              >
                <Text style={{ color: '#fff' }}>
                  {t('forgot_password.email')}{' '}
                </Text>
                <Text style={styles.forgot}>{t('forgot_password.resend')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </FullGradient>
    );
  }
}
