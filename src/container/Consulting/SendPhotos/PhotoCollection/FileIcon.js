import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import GenericModal from '../../../../components/GenericModal';
import Scale from '../../../../utils/Scale';
import { CloseButton } from '../../Common/Elements/CloseButton';
import FilenameUtils from '../../../../utils/FilenameUtils';
import platform from '../../../../theme/variables/platform';

const CONTAINER_SIZE = Scale.getSize(40);
const ICON_SIZE = Scale.getSize(28);
const CLOSE_BUTTON_SIZE = Scale.getSize(25);

const UploadingState = {
  NONE: 0,
  UPLOADING: 1,
  UPLOADED: 2,
  ERROR: 3
};

class FileIcon extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    source: PropTypes.string.isRequired,
    shouldBeRemoved: PropTypes.func.isRequired,
    onPress: PropTypes.func,
    onRetry: PropTypes.func,
    displayExtension: PropTypes.bool,
    loading: PropTypes.number
  };

  static defaultProps = {
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    onPress: () => {},
    onRetry: () => {},
    displayExtension: true,
    loading: UploadingState.NONE
  };

  // state = {
  //   loading: UploadingState.UPLOADING
  // };

  // setUploadingState = state => {
  //   this.setState({
  //     loading: state
  //   });
  // };

  _renderUploadingIndicator = () => {
    const { loading, onRetry, indech } = this.props;

    if (loading === UploadingState.NONE) {
      return null;
    }

    if (loading === UploadingState.UPLOADING) {
      return (
        <View style={[styles.overlayContainer, styles.overlayDarkContainer]}>
          <View style={styles.indicatorContainer}>
            <ActivityIndicator color={'white'} size="large" />
          </View>
          <View style={styles.overlayContainer}>
            <View style={[styles.statusTextContainer, styles.uploadingContainer]}>
              <Text style={styles.statusText}>ĐANG TẢI LÊN</Text>
            </View>
          </View>
        </View>
      );
    }

    if (loading === UploadingState.UPLOADED) {
      return (
        <View style={styles.overlayContainer}>
          <View style={[styles.statusTextContainer, styles.uploadedContainer]}>
            <Text style={styles.statusText}>ĐÃ TẢI LÊN</Text>
          </View>
        </View>
      );
    }

    if (loading === UploadingState.ERROR) {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onRetry}
          style={[styles.overlayContainer, styles.overlayDarkContainer]}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.indicatorContainer}>
              <Icon name="reload" size={ICON_SIZE} color="white" />
            </View>
            <View style={[styles.statusTextContainer, styles.errorContainer]}>
              <Text style={styles.statusText}>TẢI LÊN LỖI</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  render = () => {
    const {
      source,
      displayExtension,
      onPress,
      width,
      height,
      fullWidth,
      fullHeight,
      shouldBeRemoved
    } = this.props;
    const { loading } = this.props;
    const ext = FilenameUtils.getFullExtension(source);
    const isImage = FilenameUtils.isImage(source);
    // return null;
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
              {isImage && (
                <Image
                  style={[
                    {
                      width,
                      height
                    }
                  ]}
                  source={{ uri: source }}
                  resizeMode="contain"
                />
              )}
              {displayExtension && (
                <Text style={styles.extension} borderWidth={2}>
                  {ext}
                </Text>
              )}
              {this._renderUploadingIndicator()}
            </GenericModal>
          </GenericModal>
        </TouchableOpacity>
        {loading !== UploadingState.UPLOADING ? (
          <View style={[styles.closeButtonContainer, { left: width - CLOSE_BUTTON_SIZE / 2 }]}>
            <CloseButton
              size={CLOSE_BUTTON_SIZE}
              onPress={() => {
                shouldBeRemoved();
              }}
            />
          </View>
        ) : null}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },

  closeButtonContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 0
  },

  extension: {
    position: 'absolute',
    color: 'white',
    fontWeight: '800',
    shadowOffset: {
      width: 0,
      height: Scale.getSize(3)
    },
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    shadowRadius: Scale.getSize(2),
    elevation: Scale.getSize(5)
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },

  statusTextContainer: {
    paddingVertical: Scale.getSize(2),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  uploadingContainer: {
    backgroundColor: platform.primaryOrange
  },

  uploadedContainer: {
    backgroundColor: 'green'
  },

  errorContainer: {
    backgroundColor: 'red'
  },

  statusText: {
    fontSize: Scale.getSize(10),
    color: 'white',
    fontWeight: '600'
  },

  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  overlayDarkContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

export { FileIcon, UploadingState };
