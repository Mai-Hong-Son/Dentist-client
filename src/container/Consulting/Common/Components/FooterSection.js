import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import GenericButton from '../../../../components/GenericButton';
import { FooterStyles } from '../Styles';

export class FooterSection extends React.PureComponent {
  static propTypes = {
    onPrevPress: PropTypes.func,
    onNextPress: PropTypes.func,
    hidePrevButton: PropTypes.bool,
    hideNextButton: PropTypes.bool,
    disableNextButton: PropTypes.bool
  };

  static defaultProps = {
    onPrevPress: () => {},
    onNextPress: () => {},
    hidePrevButton: false,
    hideNextButton: false,
    disableNextButton: false
  };

  _renderPrevButton = () => {
    const { hidePrevButton, onPrevPress } = this.props;
    if (hidePrevButton) {
      return null;
    }

    return (
      <GenericButton
        caption="Quay lại"
        containerStyle={FooterStyles.leftButtonContentContainer}
        textStyle={FooterStyles.leftButtonText}
        backgroundColor={['#FFF', '#FFF', '#FFF']}
        onPress={onPrevPress}
      />
    );
  };

  _renderNextButton = () => {
    const { hideNextButton, disableNextButton, onNextPress } = this.props;
    if (hideNextButton) {
      return null;
    }

    if (disableNextButton) {
      return (
        <GenericButton
          caption="Tiếp tục"
          containerStyle={FooterStyles.rightButtonContentContainerDisabled}
          textStyle={FooterStyles.rightButtonTextDisabled}
          backgroundColor={['#E3E3E3', '#E3E3E3', '#E3E3E3']}
        />
      );
    }

    return (
      <GenericButton
        caption="Tiếp tục"
        containerStyle={FooterStyles.rightButtonContentContainer}
        textStyle={FooterStyles.rightButtonText}
        onPress={onNextPress}
      />
    );
  };

  render() {
    return (
      <View style={FooterStyles.footerContainer}>
        <View style={FooterStyles.leftButtonContainer}>{this._renderPrevButton()}</View>
        <View style={FooterStyles.rightButtonContainer}>{this._renderNextButton()}</View>
      </View>
    );
  }
}
