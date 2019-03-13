import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ButtonFacebook from './ButtonFacebook';
import ButtonGoogle from './ButtonGoogle';

export default class SocialLinks extends React.PureComponent {
  static propTypes = {
    onLoggingInBegin: PropTypes.func,
    onLoggingInEnd: PropTypes.func
  };

  static defaultProps = {
    onLoggingInBegin: () => {},
    onLoggingInEnd: () => {}
  };

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <ButtonFacebook />
        <ButtonGoogle />
      </View>
    );
  }
}
