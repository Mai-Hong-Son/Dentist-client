import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import Scale from '../../../utils/Scale';
// import platform from '../../../theme/variables/platform';

export default class TakePhotoRegister extends React.PureComponent {

  constructor(props) {
    super(props);

    this.camera = React.createRef();
  }

  takePicture = async () => {
    try {
      const data = await this.camera.current.takePictureAsync();
      this.props.onDone(data);
      this.props.navigator.pop();
    } catch (err) {
      // console.log('err: ', err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={this.camera}
          style={styles.cameraContainer}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.auto}
          permissionDialogTitle={'Cấp quyền camera'}
          permissionDialogMessage={'Vui lòng cấp quyền truy cập camera cho Ursmiles.'}
        >
          <View style={styles.iconCameraStyle}>
            <TouchableOpacity activeOpacity={0.7} onPress={this.takePicture}>
              <Icon name='ios-camera' color='#fff' size={Scale.getSize(70)} />
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  iconCameraStyle: {
    alignItems: 'center'
  }
});
