import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import GenericModal from '../../../../components/GenericModal';
import platform from '../../../../theme/variables/platform';
import Scale from '../../../../utils/Scale';
import images from '../../../../assets/images';
// import { t } from '../../../../utils/common';

class ConfirmDialog extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    messageContent: PropTypes.string,
    onConfirmPress: PropTypes.func,
    confirmLabel: PropTypes.string
  };

  static defaultProps = {
    title: '',
    messageContent: '',
    onConfirmPress: () => {},
    confirmLabel: 'OK'
  };

  render() {
    const { title, messageContent, onConfirmPress, confirmLabel } = this.props;

    return (
      <TouchableWithoutFeedback onPress={onConfirmPress}>
        <View style={styles.background}>
          <TouchableWithoutFeedback>
            <GenericModal style={styles.contentBox}>
              <View style={styles.wrapTitle}>
                <Image source={images.check} style={styles.imageIcon} />
                <Text style={styles.title}>{title}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.messageContent}>{messageContent}</Text>
              </View>
              <View style={styles.wrapBtnOk}>
                <TouchableOpacity onPress={onConfirmPress}>
                  <Text style={styles.btnName}>{confirmLabel}</Text>
                </TouchableOpacity>
              </View>
            </GenericModal>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }
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

  contentBox: {
    width: platform.deviceWidth * 0.8,
    backgroundColor: '#fff',
    paddingTop: Scale.getSize(17),
    paddingBottom: Scale.getSize(10),
    paddingHorizontal: Scale.getSize(20)
  },
  wrapTitle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  imageIcon: {
    width: Scale.getSize(32),
    height: Scale.getSize(32)
  },
  title: {
    fontSize: Scale.getSize(16),
    fontWeight: 'bold',
    paddingLeft: Scale.getSize(15)
  },
  textContainer: {
    paddingTop: Scale.getSize(10),
    paddingBottom: Scale.getSize(5),
    paddingRight: Scale.getSize(15)
  },
  messageContent: {
    fontSize: Scale.getSize(13),
    color: '#555',
    paddingVertical: 10,
    fontWeight: '100'
  },
  wrapBtnOk: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  btnName: {
    fontWeight: '800',
    color: platform.primaryOrange,
    padding: Scale.getSize(10),
    fontSize: Scale.getSize(18)
  }
});

export default ConfirmDialog;
