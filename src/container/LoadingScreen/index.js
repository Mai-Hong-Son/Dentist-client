import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LightButton from '../../theme/components/LightButton';

import platform from '../../theme/variables/platform';
import { findScreenById } from '../../route';
import { t } from '../../utils/common';
import FullGradient from '../../components/FullGradient';

export default class LoadingScreen extends Component {
  static navigatorStyle = {
    tabBarHidden: true,
    navBarHidden: true,
    drawUnderTabBar: true
  };

  constructor(props) {
    super(props);

    this.props.navigator.setDrawerEnabled({
      side: 'left',
      enabled: false
    });
  }

  render() {
    const { navigator } = this.props;

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
            flex: 4,
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              flex: 0.9
            }}
          />
          <Image
            resizeMode="contain"
            source={require('../../assets/images/logo.png')}
            style={{
              width: platform.deviceWidth * 0.6,
              flex: 1.8
            }}
          />
        </View>

        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            flex: 1.5,
            width: platform.deviceWidth * 0.6,
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowColor: '#000',
            shadowOffset: { height: 0, width: 3 }
          }}
        >
          <LightButton
            onPress={() =>
              navigator.push({
                screen: findScreenById('login')
              })
            }
          >
            {t('LANG_VIETNAMESE')}
          </LightButton>
          <LightButton
            onPress={() =>
              navigator.push({
                screen: findScreenById('home')
              })
            }
          >
            {t('LANG_ENGLISH')}
          </LightButton>
        </View>

        <View
          style={{
            alignSelf: 'flex-end'
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigator.push({
                screen: findScreenById('login_as_dentis')
              })
            }
            style={{
              padding: 10
            }}
          >
            <Image
              resizeMode="contain"
              source={require('../../assets/images/icon_dentis.png')}
              style={{
                width: 34,
                height: 34
              }}
            />
          </TouchableOpacity>
        </View>
      </FullGradient>
    );
  }
}
