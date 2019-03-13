import React from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, ScrollView, View, Linking } from 'react-native';
import { connect } from 'react-redux';

import FullGradient from '../../components/FullGradient';
import InfoPanel from './InfoPanel';
import FooterInformation from './FooterInformation';
import MenuItem from './MenuItem';
import Scale from '../../utils/Scale';
import { getImageSource } from '../../elements/Icon/CustomIcon';
import { iconsMap } from '../../utils/AppIcons';

@connect(
  state => ({ currentScreen: state.navigator }),
  null
)
export default class SideBar extends React.Component {
  onLinking = () => {
    Linking.openURL('https://ursmiles.sg/ve-chung-toi-2/');
  }

  renderItems() {
    const { before } = this.props.currentScreen;

    return [
      // {
      //   title: 'Trang chủ',
      //   isCurrentScreen: before === 'home',
      //   icon: iconsMap.home, // require('../../assets/images/menubar/home.png'),
      //   onPress: () =>
      //     Navigation.handleDeepLink({
      //       link: 'home'
      //     })
      // },
      {
        title: 'Tư vấn',
        isCurrentScreen: before === 'consulting_history',
        icon: iconsMap.tooth_search, // require('../../assets/images/menubar/consulting.png'),
        onPress: () =>
          Navigation.handleDeepLink({
            link: 'consulting_history'
          })
      },
      {
        title: 'Đặt lịch',
        isCurrentScreen: before === 'my_schedule',
        icon: iconsMap.calendar_check, //require('../../assets/images/menubar/researve.png'),
        onPress: () =>
          Navigation.handleDeepLink({
            link: 'my_schedule'
          })
      },
      {
        title: 'Khuyến mại',
        isCurrentScreen: before === 'promotions',
        icon: iconsMap.promotion, //require('../../assets/images/menubar/researve.png'),
        onPress: () =>
          Navigation.handleDeepLink({
            link: 'promotions'
          })
      },
      {
        title: 'Thông báo',
        // isCurrentScreen: before === 'notification',
        icon: iconsMap.bell, //require('../../assets/images/menubar/researve.png'),
        onPress: () =>
          Navigation.handleDeepLink({
            link: 'notification'
          })
      },
      {
        title: 'Về chúng tôi',
        // isCurrentScreen: before === 'notification',
        icon: iconsMap.iconabout, //require('../../assets/images/menubar/researve.png'),
        onPress: this.onLinking
      }
    ].map((item, index) => <MenuItem key={index} item={item} />);
  }

  render() {
    return (
      <FullGradient>
        <InfoPanel />
        <View style={styles.wrapList}>
          <ScrollView scrollEnabled={false}>{this.renderItems()}</ScrollView>
        </View>
        <FooterInformation />
      </FullGradient>
    );
  }
}

const styles = StyleSheet.create({
  wrapList: {
    flex: 1,
    paddingTop: Scale.getSize(50)
  }
});
