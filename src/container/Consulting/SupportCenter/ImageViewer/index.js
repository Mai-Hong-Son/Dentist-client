import React from 'react';
import { StyleSheet } from 'react-native';
import Image from 'react-native-fast-image';
import PropTypes from 'prop-types';
import GenericModal from '../../../../components/GenericModal';
import Scale from '../../../../utils/Scale';

const IMAGE_SIZE = Scale.getSize(200);

export default class ImageViewer extends React.Component {
  static propTypes = {
    source: PropTypes.string.isRequired
  };

  render = () => (
    <GenericModal style={styles.container}>
      <Image style={styles.image} source={{ uri: this.props.source }} />
    </GenericModal>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: IMAGE_SIZE,
    height: IMAGE_SIZE
  },

  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE
  }
});
