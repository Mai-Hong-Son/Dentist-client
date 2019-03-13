import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Scale from '../../utils/Scale';
import platform from '../../theme/variables/platform';

const AlertButton = ({ label, callback = () => {} }) => (
  <TouchableOpacity style={styles.button} onPress={callback} activeOpacity={0.7}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

class EnhancedAlert extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.element),
    defaultCallback: PropTypes.func,
    tapBackgroundToDismiss: PropTypes.bool
  };

  static defaultProps = {
    buttons: [
      {
        label: 'OK'
      }
    ],
    defaultCallback: () => {},
    defaultCallbackOnTapBackground: true
  };

  render = () => {
    const {
      title,
      description,
      buttons,
      defaultCallbackOnTapBackground,
      defaultCallback
    } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (defaultCallbackOnTapBackground) {
            defaultCallback();
          }
        }}
      >
        <View style={styles.background}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{description}</Text>
              </View>
              <View style={styles.buttonRow}>
                {buttons.map(({ label, callback = () => {} }, index) => (
                  <AlertButton
                    key={index}
                    label={label}
                    callback={() => {
                      defaultCallback();
                      callback();
                    }}
                  />
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  };
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  container: {
    width: Scale.getSize(300),
    // height: Scale.getSize(200),
    backgroundColor: 'white',
    borderRadius: Scale.getSize(3)
  },

  titleContainer: {
    paddingVertical: Scale.getSize(20),
    paddingHorizontal: Scale.getSize(24)
  },

  textContainer: {
    justifyContent: 'center',
    paddingHorizontal: Scale.getSize(24)
  },

  title: {
    fontSize: Scale.getSize(18),
    fontWeight: Scale.getFontWeight('400'),
    color: '#000'
  },

  text: {
    fontSize: Scale.getSize(14),
    fontWeight: Scale.getFontWeight('400')
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  button: {
    paddingVertical: Scale.getSize(20),
    paddingHorizontal: Scale.getSize(20)
  },

  buttonText: {
    fontSize: Scale.getSize(14),
    fontWeight: Scale.getFontWeight('500'),
    // color: 'rgb(97,167,157)'
    color: platform.primaryOrange
  }
});

export default EnhancedAlert;
