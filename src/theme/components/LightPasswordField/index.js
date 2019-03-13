import React from 'react';
import {
  TextInput,
  Image,
  View,
  PixelRatio,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

import { ThemeContext } from '../../theme-context';
import Scale from '../../../utils/Scale';
import platform from '../../variables/platform';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#FFE5BE',
    borderBottomWidth: 1,
  },
  input: {
    paddingHorizontal: 20,
    flex: 1,
    color: '#fff',
    paddingVertical: Scale.getSize(18)
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

export default class LightPasswordField extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    textStyle: PropTypes.object,
    inputProps: PropTypes.object
  };

  static defaultProps = {
    style: {},
    inputProps: {}
  };

  state = {
    secureTextEntry: true
  };

  render() {
    const { style, ...props } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <View style={styles.container}>
            <Icon>{this.props.prefix}</Icon>
            <TextInput
              {...props}
              style={[styles.input, style]}
              secureTextEntry={this.state.secureTextEntry}
              placeholderTextColor={'#fff'}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
            <TouchableOpacity
              onPressIn={() => this.setState({ secureTextEntry: false })}
              onPressOut={() => this.setState({ secureTextEntry: true })}
            >
              <Icon>
                <Image
                  resizeMode={'contain'}
                  source={require('../../../assets/images/icon_see.png')}
                  style={{
                    width: 22,
                    height: 26
                  }}
                />
              </Icon>
            </TouchableOpacity>
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}
