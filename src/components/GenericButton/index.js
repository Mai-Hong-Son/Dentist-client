import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
// import platform from '../../theme/variables/platform';

import GenericModal from '../GenericModal';
import Scale from '../../utils/Scale';

export default class GenericButton extends React.PureComponent {
  static propTypes = {
    caption: PropTypes.string,
    onPress: PropTypes.func,
    backgroundColor: PropTypes.array,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
  };

  static defaultProps = {
    caption: '',
    onPress: null,
    backgroundColor: ['#FB9F28', '#FC872B', '#FE712F'],
    containerStyle: {
      paddingVertical: Scale.getSize(12),
      paddingHorizontal: Scale.getSize(42)
    },
    textStyle: {
      color: '#fff',
      fontWeight: '800',
      fontSize: Scale.getSize(13)
    }
  };

  render() {
    const { caption } = this.props;

    return (
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.7}>
        <GenericModal
          backgroundColor={this.props.backgroundColor}
          borderRadius={40}
          style={this.props.containerStyle}
        >
          <Text style={this.props.textStyle}>{caption}</Text>
        </GenericModal>
      </TouchableOpacity>
    );
  }
}
