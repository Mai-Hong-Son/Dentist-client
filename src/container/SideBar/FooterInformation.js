import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Scale from '../../utils/Scale';
// import { t } from '../../utils/common';

import * as authActions from '../../store/actions/auth';

@connect(
  null,
  { ...authActions }
)
export default class FooterInformation extends Component {
  logout = () => {
    console.log('logoutt');
    this.props.logout();
  };

  callHotline() {}

  sendEmail() {}

  render() {
    return (
      <TouchableOpacity onPress={this.logout} activeOpacity={0.5}>
        <View style={styles.container}>
          <Icon name={'ios-log-out'} color={'#fff'} size={Scale.getSize(30)} />
          <Text style={styles.txtLogout}>{'Đăng xuất'}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingRight: Scale.getSize(20)
  },
  txtLogout: {
    fontSize: Scale.getSize(12),
    fontWeight: '800',
    paddingLeft: Scale.getSize(10),
    color: '#fff'
  }
});
