import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import platform from '../../../../theme/variables/platform';

import GenericButton from '../../../../components/GenericButton';
import Scale from '../../../../utils/Scale';
// import { t } from '../../../../utils/common';

class AlertDialog extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.array,
    titleButton: PropTypes.string
  };

  static defaultProps = {
    title: '',
    titleButton: ''
  };

  success() {
    this.props.navigator.dismissLightBox();
    if (this.props.onSuccess) {
      this.props.onSuccess();
    }
  }

  render() {
    const { title, children, titleButton, navigator } = this.props;

    return (
      <View style={styles.contentBox}>
        <View style={styles.wrapTitle}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={() => navigator.dismissLightBox()}>
            <Image
              source={require('../../../../assets/images/icon_exit.png')}
              style={styles.imageIcon}
            />
          </TouchableOpacity>
        </View>
        {children}
        <View style={styles.wrapBtnOk}>
          <View />
          <TouchableOpacity onPress={() => this.success()}>
            <GenericButton
              onPress={() => null}
              containerStyle={styles.btnStyle}
              caption={titleButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentBox: {
    width: platform.deviceWidth - 40,
    maxHeight: platform.deviceHeight - 40,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 16,
    padding: 20
  },
  wrapTitle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  imageIcon: {
    width: 20,
    height: 20
  },
  title: {
    fontSize: Scale.getSize(17),
    fontWeight: 'bold',
    paddingTop: 10,
    color: 'rgb(82,82,82)'
  },
  messageContent: {
    fontSize: Scale.getSize(15),
    color: 'rgb(82,82,82)',
    paddingVertical: 10,
    fontWeight: '100'
  },
  wrapBtnOk: {
    marginTop: 20,
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnName: {
    fontWeight: '700',
    color: platform.primaryOrange,
    fontSize: Scale.getSize(20)
  },
  btnStyle: {
    paddingVertical: 5,
    paddingHorizontal: 18
  }
});

export default AlertDialog;
