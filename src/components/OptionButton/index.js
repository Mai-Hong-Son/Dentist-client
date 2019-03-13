import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';
// import I18n from 'react-native-i18n';
// import * as commonActions from '../../store/actions/common';

import GenericModal from '../GenericModal';
import Scale from '../../utils/Scale';
import platform from '../../theme/variables/platform';

export default class OptionButton extends React.PureComponent {
  static propTypes = {
    caption: PropTypes.string,
    highlight: PropTypes.bool,
    onPress: PropTypes.func,
    borderRadius: PropTypes.number,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
  };

  static defaultProps = {
    caption: '',
    highlight: false,
    onPress: null,
    borderRadius: Scale.getSize(12),
    containerStyle: {
      paddingHorizontal: Scale.getSize(20),
      paddingVertical: Scale.getSize(20)
    },
    textStyle: {
      fontWeight: '700',
      fontSize: Scale.getSize(14)
    }
  };

  render() {
    const { caption, highlight, onPress } = this.props;
    return (
      <TouchableOpacity onPress={() => onPress()}>
        <GenericModal
          borderWidth={Scale.getSize(1)}
          borderRadius={this.props.borderRadius}
          backgroundColor={highlight ? platform.primaryOrangeGradient : ['#fff', '#fff', '#fff']}
          style={this.props.containerStyle}
        >
          <Text style={[this.props.textStyle, { color: highlight ? '#fff' : '#333' }]}>
            {caption}
          </Text>
        </GenericModal>
      </TouchableOpacity>
    );
  }
}
