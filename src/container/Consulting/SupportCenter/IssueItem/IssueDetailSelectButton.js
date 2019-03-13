import React from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Scale from '../../../../utils/Scale';

export default class IssueDetailSelectButton extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func
  };

  static defaultProps = {
    title: '',
    onPress: null
  };

  render() {
    const { title, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.contentLine}>
            <Text style={styles.text}>{title}</Text>
            <Ionicons name="ios-arrow-forward" size={12} color="#777" />
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Scale.getSize(5)
  },

  contentLine: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },

  text: {
    fontSize: Scale.getSize(14),
    fontWeight: '700',
    color: '#333'
  },

  separator: {
    marginTop: Scale.getSize(5),
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#CCC'
  }
});
