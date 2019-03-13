import React from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import platform from '../../../../theme/variables/platform';

export const CloseButton = ({ size, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={platform.primaryOrangeGradient}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <FontAwesome name="close" size={size * 0.7} color="white" />
    </LinearGradient>
  </TouchableOpacity>
);
