import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import platform from '../../theme/variables/platform';
import { t } from '../../utils/common';

export default class ModalSuccess extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  static defaultProps = {
    title: 'Ursmiles',
  }

  success() {
    this.props.navigator.dismissLightBox();
    if (this.props.onSuccess) {
      this.props.onSuccess();
    }
  }

  render() {
    const { title } = this.props;

    return (
      <View
        style={{
          backgroundColor: 'rgba(0,0,0, .86)',
          width: platform.deviceWidth,
          height: platform.deviceHeight,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: platform.deviceWidth - 40,
            maxHeight: platform.deviceHeight - 40,
            backgroundColor: '#fff',
            margin: 10,
            borderRadius: 16,
            padding: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('../../assets/images/icon_check.png')} style={{
                width: 32,
                height: 32,
              }}
            />
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                padding: 18,
              }}
            >{title}</Text>
          </View>
          <Text
            style={{
              width: '100%',
              fontSize: 16,
            }}
          >
            {this.props.content}
          </Text>
          <View
            style={{
              width: '100%',
              marginTop: 20,
              flexDirection: 'row',
              alignContent: 'space-between',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View />
            <TouchableOpacity onPress={() => this.success()}>
              <Text style={{ fontWeight: 'bold', color: platform.primaryColor, fontSize: 20 }}>
                {t('REGISTER_MODAL_SUCCESS_OK')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
