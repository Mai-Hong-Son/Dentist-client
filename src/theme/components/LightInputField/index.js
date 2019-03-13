import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { ThemeContext } from '../../theme-context';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#FFE5BE',
    borderBottomWidth: 1
  },
  input: {
    paddingHorizontal: 20,
    flex: 1
  }
});

const Icon = props => (
  <View
    style={{
      width: 32,
      height: 32
    }}
  >
    {props.children}
  </View>
);

export default class LightInputField extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    textStyle: PropTypes.object,
    inputProps: PropTypes.object
  };

  static defaultProps = {
    style: {
      color: '#fff',
      paddingVertical: 20
    },
    inputProps: {}
  };

  render() {
    const { style, ...props } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <View style={styles.container}>
            <Icon>{this.props.prefix}</Icon>
            <TextInput
              autoCapitalize="none"
              {...props}
              style={[styles.input, style]}
              placeholderTextColor={'#fff'}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}
