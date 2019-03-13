// notification icon on navbar

import React, { Component } from 'react';
import path from 'object-path';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import CustomIcon from '../../elements/Icon/CustomIcon';
import platform from '../../theme/variables/platform';

const styles = StyleSheet.create({
  badge: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 10,
    paddingHorizontal: 2,
    textAlign: 'center'
  },
  badgeContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 100,
    backgroundColor: platform.primaryColor,
    position: 'absolute',
    padding: 4,
    top: platform.platform === 'ios' ? -5 : 5,
    right: platform.platform === 'ios' ? -5 : 8
  },
  bell: {
    color: '#000',
    paddingLeft: 20,
    fontSize: 18
  }
});

@connect(state => ({
  total: path.get(state, 'screen.notification.total', 0)
}))
export default class NotificationBell extends Component {
  render() {
    return (
      <View
        style={{
          paddingTop: platform.platform === 'ios' ? 5 : 15,
          width: platform.platform === 'ios' ? 40 : 55,
          height: 30
        }}
      >
        <TouchableOpacity
          hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
          onPress={() =>
            Navigation.handleDeepLink({
              link: 'notification'
            })
          }
        >
            <CustomIcon name="bell" style={styles.bell} />
        </TouchableOpacity>
        {!!this.props.total && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badge}>
              {this.props.total > 10 ? '10+' : this.props.total}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
