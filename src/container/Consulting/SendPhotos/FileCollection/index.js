import React from 'react';
import { FlatList, View, Alert, Linking } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RNImagePicker from 'react-native-image-crop-picker';
import Scale from '../../../../utils/Scale';
import { AddFileButton } from '../PhotoCollection/AddFileButton';
import { FileIcon, UploadingState } from '../PhotoCollection/FileIcon';
import * as questionActions from '../../../../store/actions/question';
import { EnhancedArray } from '../../../../utils/utils';
import withModal from '../../../../utils/withModal';

const ICON_SIZE = Scale.getSize(40);

class File {
  _fileName = '';
  _uploadingState = UploadingState.NONE;
  _tempId = '';

  constructor(fileName, initState) {
    if (fileName) {
      this._fileName = fileName;
      if (initState) {
        this._uploadingState = initState;
      }
    }
  }

  setFileName = fileName => {
    this._fileName = fileName;
  };
  getFileName = () => this._fileName;
  setUploadingState = uploadingState => {
    this._uploadingState = uploadingState;
  };
  getUploadingState = () => this._uploadingState;
  setTempId = tempId => {
    this._tempId = tempId;
  };
  getTempId = () => this._tempId;
}

@withModal()
@connect(
  null,
  { ...questionActions },
  null,
  { withRef: true }
)
export default class FileCollection extends React.Component {
  static propTypes = {
    numColumns: PropTypes.number,
    maxFiles: PropTypes.number,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    contentContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    itemContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    photoWidth: PropTypes.number,
    photoHeight: PropTypes.number
  };

  static defaultProps = {
    numColumns: 1,
    maxFiles: 1,
    containerStyle: {},
    contentContainerStyle: {},
    itemContainerStyle: {},
    photoWidth: ICON_SIZE,
    photoHeight: ICON_SIZE
  };

  constructor(props) {
    super(props);

    this.state = {
      files: new EnhancedArray([new File('empty')])
    };
  }

  shouldComponentUpdate = () => false;

  getFiles = () =>
    this.state.files
      .toArray()
      .filter(e => e.getFileName() !== 'empty')
      .map(e => e.getTempId());

  _handleFileUrlsSelected = selectedFileUrls => {
    const validFiles = [];
    const files = this.state.files.clone();

    selectedFileUrls.forEach(url => {
      if (this.state.files.searchIndex(file => file.getFileName() === url)) {
        return;
      }
      validFiles.push(url);
      files.push(new File(url));
    });

    if (!validFiles.length) {
      return;
    }

    this.setState({ files }, () => {
      this._stageFiles(validFiles);
    });
  };

  _stageFiles = filesToStage => {
    const { stageFile } = this.props;
    let files = this.state.files.clone();
    filesToStage.forEach(file => {
      let index = this.state.files.searchIndex(e => e.getFileName() === file);
      files.get(index).setUploadingState(UploadingState.UPLOADING);
      stageFile({ file }, (error, data) => {
        index = this.state.files.searchIndex(e => e.getFileName() === file);
        files = this.state.files.clone();
        if (!error) {
          files.get(index).setTempId(data.id);
          files.get(index).setUploadingState(UploadingState.UPLOADED);
        } else {
          files.get(index).setUploadingState(UploadingState.ERROR);
        }
        this.setState({ files }, () => {
          this.forceUpdate();
        });
      });
    });
    this.setState(files, () => {
      this.forceUpdate();
    });
  };

  _retryStagingFile = index => {
    const { stageFile } = this.props;

    let indexToRetry = index;
    if (this._checkAllSlotsFilled()) {
      indexToRetry += 1;
    }

    const file = this.state.files.getByNormalizedIndex(indexToRetry).getFileName();

    let files = this.state.files.clone();
    files.getByNormalizedIndex(indexToRetry).setUploadingState(UploadingState.UPLOADING);
    this.setState({ files }, () => {
      this.forceUpdate();
      stageFile({ file }, (error, data) => {
        files = this.state.files.clone();
        if (!error) {
          files.getByNormalizedIndex(indexToRetry).setTempId(data.id);
          files.getByNormalizedIndex(indexToRetry).setUploadingState(UploadingState.UPLOADED);
        } else {
          files.getByNormalizedIndex(indexToRetry).setUploadingState(UploadingState.ERROR);
        }
        this.setState({ files }, () => {
          this.forceUpdate();
        });
      });
    });
  };

  _checkAllSlotsFilled = () => this.state.files.getLength() === this.props.maxFiles + 1;

  // _checkAllSlotsEmpty = () => this.state.files.get(0).getFileName() === 'empty';

  _getDataToBeRendered = () => {
    if (this._checkAllSlotsFilled()) {
      return this.state.files.toArray().slice(1);
    }
    return this.state.files.toArray();
  };

  _removeFileItemByNormalizedIndex = index => {
    let indexToRemove = index;
    if (this._checkAllSlotsFilled()) {
      indexToRemove += 1;
    }
    const files = this.state.files.clone();
    files.removeByNormalizedIndex(indexToRemove);
    this.setState({ files }, () => {
      this.forceUpdate();
    });
  };

  _getFileItemByNormalizedIndex = index => {
    let indexToGet = index;
    if (this._checkAllSlotsFilled()) {
      indexToGet += 1;
    }
    return this.state.files.getByNormalizedIndex(indexToGet);
  };

  _onAddFilePress = () => {
    const { maxFiles } = this.props;
    let numberOfAvailableSlots = maxFiles - this.state.files.getLength();
    if (this.state.files.get(0).getFileName() === 'empty') {
      numberOfAvailableSlots += 1;
    }
    RNImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      maxFiles: numberOfAvailableSlots
    })
      .then(files => {
        if (files.length === 0) return null;
        this._handleFileUrlsSelected(files.map(item => item.path));
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

  _onFileIconPress = index => {
    let startAt = index;
    if (!this._checkAllSlotsFilled()) {
      startAt -= 1;
    }
    const { navigator } = this.props;
    navigator.showModal({
      screen: 'photo_viewer',
      passProps: {
        startAt,
        photos: this.state.files
          .toArray()
          .map(e => e.getFileName())
          .filter(e => e !== 'empty'),
        onDone: () => {
          navigator.dismissModal();
        }
      }
    });
  };

  _renderItem = ({ item, index }) => {
    const {
      itemContainerStyle,
      photoWidth,
      photoHeight,
      photoFullWidth,
      photoFullHeight
    } = this.props;

    if (item.getFileName() === 'empty') {
      return (
        <View style={itemContainerStyle}>
          <AddFileButton
            isImage={false}
            width={photoWidth}
            height={photoHeight}
            fullWidth={photoFullWidth}
            fullHeight={photoFullHeight}
            onPress={() => this._onAddFilePress()}
          />
        </View>
      );
    }

    return (
      <View key={index} style={itemContainerStyle}>
        <FileIcon
          indech={index}
          width={photoWidth}
          height={photoHeight}
          fullWidth={photoFullWidth}
          fullHeight={photoFullHeight}
          source={item.getFileName()}
          shouldBeRemoved={() => {
            this._removeFileItemByNormalizedIndex(index);
          }}
          loading={this._getFileItemByNormalizedIndex(index).getUploadingState()}
          onRetry={() => this._retryStagingFile(index)}
          onPress={() => this._onFileIconPress(index)}
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
          data={this._getDataToBeRendered()}
          renderItem={this._renderItem}
          extraData={this.state.files}
          numColumns={numColumns}
        />
      </View>
    );
  };
}
