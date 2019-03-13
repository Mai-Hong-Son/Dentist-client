import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Image from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import GenericModal from '../GenericModal';
import platform from '../../theme/variables/platform';
import Scale from '../../utils/Scale';

const SELECTED_BORDER_WIDTH = Scale.getSize(2);
const IMAGE_SIZE = Scale.getSize(50);

export default class IssueOption extends React.PureComponent {
  static propTypes = {
    size: PropTypes.number,
    name: PropTypes.string,
    icon: PropTypes.string,
    selected: PropTypes.bool,
    onPress: PropTypes.func,
    visible: PropTypes.bool,
    borderRadius: PropTypes.number
  };

  static defaultProps = {
    size: Scale.getSize(40),
    name: '',
    icon: '',
    selected: false,
    onPress: null,
    visible: true,
    borderRadius: Scale.getSize(15)
  };

  _renderUnselected() {
    const { size, name, icon, visible, borderRadius, onPress } = this.props;
    return (
      <TouchableHighlight onPress={onPress} underlayColor="rgba(0, 0, 0, 0)">
        <GenericModal
          borderRadius={borderRadius}
          style={{ width: size, height: size, alignItems: 'center', opacity: visible ? 1 : 0 }}
          borderWidth={Scale.getSize(1)}
        >
          <Image style={styles.image} source={{ uri: icon }} resizeMode="contain" />

          <Text style={styles.nameText}>{name}</Text>
          <View
            style={[
              styles.circleUnselected,
              {
                width: size / 7.0,
                height: size / 7.0,
                borderRadius: size / 6.0,
                top: size * 0.06,
                right: size * 0.06
              }
            ]}
          />
        </GenericModal>
      </TouchableHighlight>
    );
  }

  _renderSelected() {
    const { size, name, icon, visible, borderRadius } = this.props;
    return (
      <GenericModal borderRadius={borderRadius}>
        <GenericModal
          borderRadius={borderRadius}
          style={[
            styles.containerSelected,
            { width: size, height: size, alignItems: 'center', opacity: visible ? 1 : 0 }
          ]}
        >
          <Image style={styles.image} source={{ uri: icon }} resizeMode="contain" />
          <Text style={styles.nameText}>{name}</Text>
          <View
            style={[
              styles.circleSelected,
              {
                width: size / 7.0,
                height: size / 7.0,
                borderRadius: size / 6.0,
                top: size * 0.06 - SELECTED_BORDER_WIDTH,
                right: size * 0.06 - SELECTED_BORDER_WIDTH
              }
            ]}
          >
            <Ionicons
              name="ios-checkmark"
              color="white"
              size={size / 6.0}
              style={{ marginTop: -1 }}
            />
          </View>
        </GenericModal>
      </GenericModal>
    );
  }

  render() {
    if (!this.props.selected) {
      return this._renderUnselected();
    }

    return this._renderSelected();
  }
}

const styles = StyleSheet.create({
  containerSelected: {
    borderWidth: SELECTED_BORDER_WIDTH,
    borderColor: platform.primaryOrange,
    overflow: 'hidden'
  },

  circleUnselected: {
    position: 'absolute',
    borderWidth: Scale.getSize(1),
    borderColor: '#BBB'
  },

  circleSelected: {
    position: 'absolute',
    backgroundColor: platform.primaryOrange,
    justifyContent: 'center',
    alignItems: 'center'
  },

  nameText: {
    position: 'absolute',
    bottom: Scale.getSize(10),
    fontWeight: '800',
    color: '#333',
    fontSize: Scale.getSize(14)
  },

  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE
  }
});
