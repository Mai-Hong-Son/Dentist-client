import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import PropTypes from 'prop-types';
import Image from 'react-native-fast-image';
import GenericModal from '../../../../../components/GenericModal';
import images from '../../../../../assets/images';
import Scale from '../../../../../utils/Scale';
import platform from '../../../../../theme/variables/platform';
import withModal from '../../../../../utils/withModal';

@withModal()
export default class SelectImageSource extends React.PureComponent {
  static propTypes = {
    onItemSelect: PropTypes.func.isRequired,
    onLibrarySelect: PropTypes.func.isRequired,
    onCameraSelect: PropTypes.func.isRequired
  };

  render = () => (
    <GenericModal style={styles.container}>
      <TouchableHighlight
        onPress={() => {
          this.props.onItemSelect();
          this.props.onLibrarySelect();
        }}
        underlayColor="#CCC"
      >
        <View style={styles.row}>
          <Image style={styles.image} source={images.image} resizeMode="contain" />
          <Text style={styles.rowText}>Chọn từ thư viện ảnh</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.separator} />
      <TouchableHighlight
        onPress={async () => {
          this.props.onItemSelect();
          this.props.onCameraSelect();
        }}
        underlayColor="#CCC"
      >
        <View style={styles.row}>
          <Image style={styles.image} source={images.camera} resizeMode="contain" />
          <Text style={styles.rowText}>Chụp ảnh</Text>
        </View>
      </TouchableHighlight>
    </GenericModal>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: platform.deviceWidth * 0.9
  },

  row: {
    paddingVertical: Scale.getSize(12),
    paddingHorizontal: Scale.getSize(35),
    flexDirection: 'row',
    alignItems: 'center'
  },

  rowText: {
    fontSize: Scale.getSize(16),
    fontWeight: '700'
  },

  separator: {
    height: 1,
    backgroundColor: '#DDD'
  },

  image: {
    width: Scale.getSize(30),
    height: Scale.getSize(30),
    marginRight: Scale.getSize(15)
  }
});
