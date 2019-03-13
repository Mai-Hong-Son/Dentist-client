import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import platform from '../../../../../theme/variables/platform';
import Scale from '../../../../../utils/Scale';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

export const ProgressIndicator = ({ percentage }) => (
  <View style={[styles.indicator, { width: (WINDOW_WIDTH * percentage) / 100 }]} />
);

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    height: Scale.getSize(3),
    top: 0,
    left: 0,
    backgroundColor: platform.primaryOrange,
    zIndex: 1
  }
});
