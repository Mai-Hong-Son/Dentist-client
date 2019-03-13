import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Image from 'react-native-fast-image';
import GenericModal from '../../../../components/GenericModal';
import Scale from '../../../../utils/Scale';

const IMAGE_SIZE = Scale.getSize(100);
const ACTIVE_OPACITY = 0.5;

export default class IssueImageButton extends GenericModal {
  static propTypes = {
    source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onPress: PropTypes.func
  };

  static defaultProps = {
    source: null,
    onPress: null
  };

  render() {
    const { source, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={ACTIVE_OPACITY}>
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: source }} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },

  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE
  }
});
