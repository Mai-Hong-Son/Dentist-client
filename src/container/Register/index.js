import React from 'react';
import { Text, View, Image, Platform, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Field, reduxForm } from 'redux-form';
import ImagePicker from 'react-native-image-picker';

import { t } from '../../utils/common';
import FullGradient from '../../components/FullGradient';
import LightButton from '../../theme/components/LightButton';
import platform from '../../theme/variables/platform';
import InputField from '../../elements/Form/InputField';
import PasswordField from '../../elements/Form/PasswordField';
import SocialLinks from '../../components/SocialLinks';
import * as authActions from '../../store/actions/auth';
import Scale from '../../utils/Scale';
import withModal from '../../utils/withModal';

const options = {
  title: 'Chọn ảnh đại diện',
  cancelButtonTitle: 'Hủy',
  takePhotoButtonTitle: 'Chụp ảnh',
  chooseFromLibraryButtonTitle: 'Chọn ảnh từ thư viện',
  maxWidth: 200,
  maxHeight: 200,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

@withModal()
@reduxForm({
  form: 'register'
})
@connect(
  null,
  { ...authActions }
)
export default class Register extends React.Component {
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

  constructor(props) {
    super(props);

    this.state = {
      photo: null
    };
  }

  componentDidMount() {
    this.props.navigator.setTitle({
      title: t('SCREEN_TITLE_REGISTER') // the new title of the screen as appears in the nav bar
    });
  }

  register(values) {
    values.avatar = this.state.photo;

    this.showLoadingScreen();
    this.props.register(values, err => {
      this.hideLoadingScreen();
      if (err) {
        if (err.statusCode === 422) {
          const { errors } = err;
          this.props.modal.showAlert({
            title: t('register.error_title'),
            description: Object.keys(errors)
              .map(field => errors[field])
              .join('\n')
          });
        }
        return;
      }
      this.props.modal.showConfirmDialog({
        title: t('REGISTER_MODAL_SUCCESS_TITLE'),
        description: t('REGISTER_MODAL_SUCCESS_MESSAGE'),
        onConfirmPress: () => {
          this.setState({ modalVisible: false });
          this.props.navigator.pop();
        },
        confirmLabel: 'Đăng nhập'
      });
    });
  }

  _onChooseImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        if (response.error === 'Camera permissions not granted') {
          this.props.modal.showAlert({
            title: 'urSmiles không mở được Ảnh',
            description:
              'Hãy cấp quyền truy cập Thư mục Ảnh cho urSmiles để thực hiện chức năng này.\n' +
              'Chọn Cài đặt > Quyền riêng tư > Ảnh và Bật quyền cho urSmiles.',
            buttons: [
              {
                label: 'OK',
                callback: () => {
                  Linking.openURL('app-settings:');
                }
              }
            ]
          });
        }
      } else {
        this.setState({
          photo: response.uri
        });
      }
    });
  };

  showLoadingScreen = () => {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.props.navigator.showLightBox({
      screen: 'loading',
      passProps: {
        text: 'Đang thực hiện, xin vui lòng chờ'
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
    const { photo } = this.state;

    return (
      <FullGradient style={{ padding: 0 }}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          enableOnAndroid
          enableAutomaticScroll
          keyboardOpeningTime={0}
          extraHeight={Platform.select({ android: 200 })}
        >
          <View style={{ padding: 20, marginTop: 30 }}>
            <View
              style={{
                alignItems: 'center',
                paddingTop: Scale.getSize(25)
              }}
            >
              <TouchableOpacity onPress={this._onChooseImage}>
                <Image
                  resizeMode="cover"
                  style={{
                    width: Scale.getSize(100),
                    height: Scale.getSize(100),
                    borderRadius: photo === null ? 0 : Scale.getSize(100) / 2
                  }}
                  source={photo === null ? require('./logo.png') : { uri: photo }}
                  // source={{ uri: 'file:///var/mobile/Media/DCIM/102APPLE/IMG_2213.PNG' }}
                />
              </TouchableOpacity>
            </View>
            <Field
              name="username"
              label={t('REGISTER_USERNAME')}
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
              label={t('REGISTER_PASSWORD')}
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

            <Field
              name="fullname"
              label={t('REGISTER_FULLNAME')}
              component={InputField}
              prefix={
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/icon_fullname.png')}
                  style={{
                    width: 22,
                    height: 26
                  }}
                />
              }
            />

            <Field
              name="email"
              label={t('REGISTER_EMAIL')}
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

            <Field
              name="phone"
              label={t('REGISTER_PHONE')}
              component={InputField}
              prefix={
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/icon_phone.png')}
                  style={{
                    width: 22,
                    height: 26
                  }}
                />
              }
            />

            <Field
              name="address"
              label={t('REGISTER_ADDRESS')}
              component={InputField}
              prefix={
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/icon_marker.png')}
                  style={{
                    width: 22,
                    height: 26
                  }}
                />
              }
            />

            <View style={{ alignItems: 'center' }}>
              <LightButton
                onPress={this.props.handleSubmit(this.register.bind(this))}
                style={{
                  marginTop: 30,
                  width: platform.deviceWidth * 0.6
                }}
              >
                {t('REGISTER_BUTTON')}
              </LightButton>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  textAlign: 'right',
                  paddingVertical: 8
                }}
              >
                {t('REGISTER_VIA_SOCIAL')}
              </Text>
              <SocialLinks
                onLoggingInBegin={this.showLoadingScreen}
                onLoggingInEnd={this.hideLoadingScreen}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>

        {/* <Modal animationType={'fade'} transparent visible={this.state.modalVisible}>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ConfirmDialog
              title={t('REGISTER_MODAL_SUCCESS_TITLE')}
              messageContent={t('REGISTER_MODAL_SUCCESS_MESSAGE')}
              onConfirmPress={() => {
                this.setState({ modalVisible: false });
                this.props.navigator.pop();
              }}
            />
          </View>
        </Modal> */}
      </FullGradient>
    );
  }
}
