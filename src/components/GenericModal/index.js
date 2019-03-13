import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import platform from '../../theme/variables/platform';
// import { t } from '../../utils/common';
import Scale from '../../utils/Scale';

export default class GenericModal extends React.PureComponent {
  static propTypes = {
    borderRadius: PropTypes.number,
    backgroundColor: PropTypes.array,
    justifyContent: PropTypes.string,
    borderWidth: PropTypes.number
  };

  static defaultProps = {
    borderRadius: Scale.getSize(12),
    backgroundColor: ['#fff', '#fff', '#fff'],
    justifyContent: 'center',
    borderWidth: 0
  };

  render() {
    const {
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      backgroundColor,
      justifyContent,
      borderWidth,
      style,
      children
    } = this.props;

    return (
      <LinearGradient
        colors={backgroundColor}
        style={[
          styles.container,
          borderRadius ? { borderRadius } : null,
          justifyContent ? { justifyContent } : null,
          borderTopLeftRadius ? { borderTopLeftRadius } : null,
          borderTopRightRadius ? { borderTopRightRadius } : null,
          borderBottomLeftRadius ? { borderBottomLeftRadius } : null,
          borderBottomRightRadius ? { borderBottomRightRadius } : null,
          platform.isAndroid ? { borderWidth } : null,
          style
        ]}
      >
        {children}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'transparent',
    shadowOffset: { width: 0, height: Scale.getSize(3) },
    shadowColor: '#777',
    shadowOpacity: 0.3,
    shadowRadius: Scale.getSize(3),
    elevation: Scale.getSize(1),
    borderColor: '#EEE'
  }
});
