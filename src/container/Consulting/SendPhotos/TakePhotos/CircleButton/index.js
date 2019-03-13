import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-fast-image';
import GenericModal from '../../../../../components/GenericModal';
import platform from '../../../../../theme/variables/platform';
import Scale from '../../../../../utils/Scale';
import images from '../../../../../assets/images';

const DEFAULT_SIZE = Scale.getSize(50);
const IMAGE_RATIO = 0.53;
const ACTIVE_OPACITY = 0.6;

class CircleButton extends React.Component {
  static propTypes = {
    size: PropTypes.number,
    source: PropTypes.any,
    onPress: PropTypes.func,
    color: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    size: DEFAULT_SIZE,
    source: images.rectangle,
    onPress: null,
    color: platform.primaryOrangeGradient
  };

  render = () => {
    const { size, source, onPress, color } = this.props;
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={ACTIVE_OPACITY}>
        <GenericModal
          backgroundColor={color}
          style={[{ width: size, height: size, borderRadius: size / 2 }, styles.container]}
        >
          <Image
            style={{ width: size * IMAGE_RATIO, height: size * IMAGE_RATIO }}
            source={source}
            resizeMode="contain"
          />
        </GenericModal>
      </TouchableOpacity>
    );
  };
}

CircleButton.GradientPresets = {
  Orange: platform.primaryOrangeGradient,
  Gray: ['#CCC', '#CCC', '#CCC']
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center'
  }
});

export { CircleButton };
