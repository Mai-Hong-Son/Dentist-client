import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Image from 'react-native-fast-image';
import GenericModal from '../GenericModal';
import platform from '../../theme/variables/platform';
import Scale from '../../utils/Scale';
import images from '../../assets/images';

const ICON_SIZE = Scale.getSize(16);
const IMAGE_SIZE = Scale.getSize(26);

export default class AskButton extends React.PureComponent {
  static propTypes = {
    caption: PropTypes.string,
    onPress: PropTypes.func
  };

  static defaultProps = {
    caption: '',
    onPress: null
  };

  render() {
    const { caption } = this.props;

    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor="rgba(0, 0, 0, 0)">
        <GenericModal backgroundColor={platform.primaryOrangeGradient} style={styles.container}>
          <View style={styles.leftPartContainer}>
            <Image source={images.search} style={styles.image} />
            <Text style={styles.buttonText}>{caption}</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Icon
              name="ios-arrow-forward"
              color={platform.primaryOrange}
              size={ICON_SIZE}
              style={styles.arrow}
            />
          </View>
        </GenericModal>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Scale.getSize(20),
    paddingHorizontal: Scale.getSize(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginRight: Scale.getSize(30)
  },
  buttonText: {
    fontSize: Scale.getSize(16),
    fontWeight: '900',
    color: 'white'
  },
  leftPartContainer: {
    paddingLeft: Scale.getSize(15),
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrowContainer: {
    alignItems: 'center',
    width: Scale.getSize(30),
    height: Scale.getSize(30),
    borderRadius: Scale.getSize(30),
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: Scale.getSize(3) },
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    shadowRadius: Scale.getSize(2),
    elevation: Scale.getSize(5),
    justifyContent: 'center'
  },
  arrow: {
    textAlign: 'center',
    marginRight: Scale.getSize(-3)
  }
});
