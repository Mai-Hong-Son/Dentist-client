import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-fast-image';
import GenericModal from '../../../../components/GenericModal';
import Scale from '../../../../utils/Scale';
import images from '../../../../assets/images';

const ICON_FRAME_SCALE = 0.5;
const ICON_UPLOAD_SCALE = 0.3;
const CLOSE_BUTTON_SIZE = Scale.getSize(25);

class AddFileButton extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fullWidth: PropTypes.number.isRequired,
    fullHeight: PropTypes.number.isRequired,
    isImage: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    defaultImage: PropTypes.string
  };

  static defaultProps = {
    isImage: true
  };

  render() {
    const { width, fullWidth, height, fullHeight, onPress, defaultImage } = this.props;
    return (
      <View
        style={{
          width: fullWidth,
          height: fullHeight
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={{
            width: width + CLOSE_BUTTON_SIZE / 2,
            height: height + CLOSE_BUTTON_SIZE / 2,
            position: 'absolute',
            top: CLOSE_BUTTON_SIZE / 2
          }}
        >
          <GenericModal
            style={{
              width,
              height
            }}
          >
            <GenericModal
              style={[
                styles.container,
                {
                  width,
                  height
                }
              ]}
            >
              {this.props.isImage ? (
                <Image
                  style={{ width: width * ICON_FRAME_SCALE, height: height * ICON_FRAME_SCALE }}
                  source={{ uri: defaultImage }}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  style={{ width: width * ICON_UPLOAD_SCALE, height: height * ICON_UPLOAD_SCALE }}
                  source={images.upload}
                  resizeMode="contain"
                />
              )}
            </GenericModal>
          </GenericModal>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export { AddFileButton };
