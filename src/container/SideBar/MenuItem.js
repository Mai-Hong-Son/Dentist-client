import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Scale from '../../utils/Scale';
import platform from '../../theme/variables/platform';
import withNavigator from '../../utils/withNavigator';

const IconImage = ({ source, color, ...props }) => (
  <Image
    {...props}
    source={source}
    style={[styles.iconImageStyle, { tintColor: color }]}
    resizeMode="contain"
  />
);

export default class MenuItem extends Component {
  render() {
    const {
      item: { title, isCurrentScreen, icon, onPress }
    } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={[
            styles.wrapItem,
            {
              backgroundColor: isCurrentScreen
                ? platform.containerBg
                : 'rgba(82,82,82,0)'
            }
          ]}
        >
          <IconImage
            source={icon}
            color={
              isCurrentScreen ? platform.primaryOrange : platform.containerBg
            }
          />
          <Text
            style={[
              styles.txtTitleStyle,
              {
                color: isCurrentScreen
                  ? platform.primaryOrange
                  : platform.containerBg
              }
            ]}
          >
            {title}
          </Text>
          <Icon
            name={'ios-arrow-forward'}
            color={
              isCurrentScreen ? platform.primaryOrange : platform.containerBg
            }
            size={Scale.getSize(18)}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapItem: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: Scale.getSize(5),
    borderRadius: Scale.getSize(30),
    paddingHorizontal: Scale.getSize(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Scale.getSize(10)
  },
  iconImageStyle: {
    width: Scale.getSize(20),
    height: Scale.getSize(20),
    tintColor: '#fff'
  },
  txtTitleStyle: {
    fontSize: Scale.getSize(16),
    fontWeight: '800',
    color: '#fff',
    flex: 1,
    paddingLeft: Scale.getSize(30)
  }
});
