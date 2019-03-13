import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import platform from '../../theme/variables/platform';

const Divider = ({ style }) => <View style={[styles.divider, style && style]} />;

const styles = StyleSheet.create({
  divider: {
    height: platform.contentPadding,
    backgroundColor: platform.dividerBg
  }
});
export default Divider;
