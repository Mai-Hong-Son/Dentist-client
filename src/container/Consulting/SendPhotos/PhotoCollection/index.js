import React from 'react';
import { FlatList, View, Linking } from 'react-native';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RNImagePicker from 'react-native-image-crop-picker';
import { AddFileButton } from './AddFileButton';
import { FileIcon, UploadingState } from './FileIcon';
import * as questionActions from '../../../../store/actions/question';
import withModal from '../../../../utils/withModal';

@withModal()
@connect(
  null,
  { ...questionActions },
  null,
  { withRef: true }
)
export default class PhotoCollection extends React.PureComponent {
  static propTypes = {
    frameImages: PropTypes.arrayOf(PropTypes.string),
    guideContent: PropTypes.array,
    numColumns: PropTypes.number,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    contentContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    itemContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    photoWidth: PropTypes.number.isRequired,
    photoHeight: PropTypes.number.isRequired,
    photoFullWidth: PropTypes.number.isRequired,
    photoFullHeight: PropTypes.number.isRequired,
    onUploadStateChanged: PropTypes.func
  };

  static defaultProps = {
    frameImages: [],
    guideContent: [],
    numColumns: 1,
    containerStyle: {},
    contentContainerStyle: {},
    itemContainerStyle: {},
    onUploadStateChanged: () => {}
  };

  constructor(props) {
    super(props);
    const photos = [];
    const uploadings = [];
    for (let i = 0; i < props.frameImages.length; i++) {
      photos.push('empty');
      uploadings.push(UploadingState.NONE);
    }
    this.state = {
      photos,
      uploadings
    };
    this.photoTempIds = [];
  }

  getPhotos = () => [...this.photoTempIds];

  checkAllPhotosFilled = () => this.state.photos.indexOf('empty') < 0;

  _handlePhotosTaken = photosTaken => {
    const oldImagesState = this.state.photos;
    this.setState(
      {
        photos: photosTaken
      },
      () => {
        this._stageAllImages(photosTaken, oldImagesState);
      }
    );
  };

  _reportUploadState = () => {
    const { onUploadStateChanged } = this.props;
    const uploadedNumber = this.state.uploadings.reduce(
      (acc, cur) => (cur === UploadingState.UPLOADED ? acc + 1 : acc),
      0
    );
    onUploadStateChanged(uploadedNumber);
  };

  _stageAllImages = (images, oldImagesState) => {
    const { stageImage } = this.props;
    let uploadings = [...this.state.uploadings];

    images.forEach((image, index) => {
      if (oldImagesState[index] === image) {
        return;
      }

      uploadings[index] = UploadingState.UPLOADING;
      stageImage({ image }, (error, data) => {
        uploadings = [...this.state.uploadings];
        if (!error) {
          uploadings[index] = UploadingState.UPLOADED;
          this.photoTempIds[index] = data.id;
        } else {
          uploadings[index] = UploadingState.ERROR;
        }
        this.setState({ uploadings }, () => {
          this._reportUploadState();
        });
      });
    });

    this.setState({ uploadings });
  };

  _retryStagingImage = index => {
    const { stageImage } = this.props;

    const image = this.state.photos[index];

    let uploadings = [...this.state.uploadings];
    uploadings[index] = UploadingState.UPLOADING;
    this.setState({ uploadings }, () => {
      stageImage({ image }, (error, data) => {
        uploadings = [...this.state.uploadings];
        if (!error) {
          uploadings[index] = UploadingState.UPLOADED;
          this.photoTempIds[index] = data.id;
        } else {
          uploadings[index] = UploadingState.ERROR;
        }
        this.setState({ uploadings }, () => {
          this._reportUploadState();
        });
      });
    });
  };

  _handlePhotosSelected = (startAt, photosSelected) => {
    const oldImagesState = this.state.photos;

    const photos = [...this.state.photos];
    const images = [];
    if (photos[startAt] !== 'empty' && photosSelected.length === 1) {
      photos[startAt] = photosSelected[0];
    } else {
      let numberOfPhotosInserted = 0;
      for (let i = 0; i < startAt; i++) {
        images.push(photos[i]);
      }
      for (let i = startAt; numberOfPhotosInserted < photosSelected.length; i++) {
        if (photos[i] === 'empty') {
          photos[i] = photosSelected[numberOfPhotosInserted];
          images.push(photosSelected[numberOfPhotosInserted]);
          numberOfPhotosInserted++;
        } else {
          images.push(photos[i]);
        }
      }
    }
    this.setState({ photos });

    this._stageAllImages(images, oldImagesState);
  };

  _checkCameraPermission = async () => {
    const cameraPermission = await Permissions.check('camera');
    if (cameraPermission === 'authorized') {
      return true;
    }
    const cameraPermissionRequestResult = await Permissions.request('camera');
    return cameraPermissionRequestResult === 'authorized';
  };

  _onLibrarySelect = index => {
    let maxFiles = this.state.uploadings
      .slice(index)
      .reduce((acc, cur) => (cur === UploadingState.NONE ? acc + 1 : acc), 0);
    if (this.state.photos[index] !== 'empty') {
      maxFiles = 1;
    }
    RNImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      maxFiles
    })
      .then(images => {
        if (images.length === 0) return null;
        this._handlePhotosSelected(index, images.map(item => item.path));
      })
      .catch(e => {
        if (e.code === 'E_PERMISSION_MISSING') {
          this.props.modal.showAlert({
            title: 'urSmiles không mở được Ảnh',
            description:
              'Hãy cấp quyền truy cập Thư mục Ảnh cho urSmiles để thực hiện chức năng này.\n' +
              'Chọn Cài đặt > Quyền riêng tư > Ảnh và Bật quyền cho urSmiles.',
            buttons: [
              {
                label: 'OK',
                callback: () => {
                  Linking.openURL('app-settings:');
                }
              }
            ]
          });
        }
      });
  };

  _onCameraSelect = async index => {
    const cameraPermission = await this._checkCameraPermission();

    if (cameraPermission) {
      const { navigator, frameImages, guideContent } = this.props;

      navigator.push({
        screen: 'take_photos',
        title: 'Chụp ảnh',
        navigatorStyle: {
          tabBarHidden: true
        },
        passProps: {
          guideContent,
          photos: this.state.photos,
          frameImages,
          startAt: index,
          onDone: imageUris => this._handlePhotosTaken(imageUris),
          maxPhotos: frameImages.length
        }
      });
    } else {
      this.props.modal.showAlert({
        title: 'urSmiles không mở được Camera',
        description:
          'Hãy cấp quyền truy cập Camera cho urSmiles để thực hiện chức năng này.\n' +
          'Chọn Cài đặt > Quyền riêng tư > Camera và Bật quyền cho urSmiles.',
        buttons: [
          {
            label: 'OK',
            callback: () => {
              Linking.openURL('app-settings:');
            }
          }
        ]
      });
    }
  };

  _onAddImagePress = index => {
    const { navigator } = this.props;
    navigator.showLightBox({
      screen: 'select_image_source',
      style: {
        tapBackgroundToDismiss: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      },
      passProps: {
        onItemSelect: () => {
          console.log('ITEM SELECTED');
          navigator.dismissLightBox();
        },
        onLibrarySelect: () => this._onLibrarySelect(index),
        onCameraSelect: () => this._onCameraSelect(index)
      }
    });
  };

  _onPress = index => {
    const { navigator } = this.props;
    navigator.showModal({
      screen: 'photo_viewer',
      passProps: {
        startAt: this.state.photos
          .slice(0, index)
          .reduce((acc, cur) => (cur !== 'empty' ? acc + 1 : acc), 0),
        photos: this.state.photos.filter(photo => photo !== 'empty'),
        onDone: () => {
          navigator.dismissModal();
        }
      }
    });
  };

  _imageShouldBeRemoved = index => {
    this.photoTempIds[index] = null;
    const photos = [...this.state.photos];
    photos[index] = 'empty';
    const uploadings = [...this.state.uploadings];
    uploadings[index] = UploadingState.NONE;
    this.setState({ photos, uploadings }, () => {
      this._reportUploadState();
    });
  };

  _renderItem = ({ item, index }) => {
    const {
      itemContainerStyle,
      photoWidth,
      photoHeight,
      photoFullWidth,
      photoFullHeight,
      frameImages
    } = this.props;
    if (item === 'empty') {
      return (
        <View style={itemContainerStyle}>
          <AddFileButton
            width={photoWidth}
            height={photoHeight}
            fullWidth={photoFullWidth}
            fullHeight={photoFullHeight}
            onPress={() => this._onAddImagePress(index)}
            defaultImage={frameImages[index]}
          />
        </View>
      );
    }

    return (
      <View key={index} style={itemContainerStyle}>
        <FileIcon
          width={photoWidth}
          height={photoHeight}
          fullWidth={photoFullWidth}
          fullHeight={photoFullHeight}
          source={item}
          shouldBeRemoved={() => this._imageShouldBeRemoved(index)}
          onPress={() => this._onPress(index)}
          displayExtension={false}
          loading={this.state.uploadings[index]}
          onRetry={() => this._retryStagingImage(index)}
        />
      </View>
    );
  };

  render = () => {
    const { containerStyle, contentContainerStyle, numColumns } = this.props;
    return (
      <View style={containerStyle}>
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={contentContainerStyle}
          data={this.state.photos}
          renderItem={this._renderItem}
          extraData={[...this.state.photos, ...this.state.uploadings]}
          numColumns={numColumns}
        />
      </View>
    );
  };
}
