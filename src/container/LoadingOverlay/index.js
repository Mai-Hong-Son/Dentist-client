import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ActivityIndicator, View, Text, Dimensions } from 'react-native';
import Scale from '../../utils/Scale';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

export default class LoadingOverlay extends React.Component {
  static propTypes = {
    text: PropTypes.string
  };

  static navigatorStyle = {
    tabBarHidden: true,
    navBarHidden: true
  };

  render = () => (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      {this.props.text ? <Text style={styles.text}>{this.props.text}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },

  text: {
    color: 'white',
    fontSize: Scale.getSize(20),
    marginTop: Scale.getSize(15)
  }
});
