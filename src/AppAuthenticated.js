import { Navigation } from 'react-native-navigation';
import { t } from './utils/common';
import { findScreenById } from './route';
import { iconsMap } from './utils/AppIcons';
import platform from './theme/variables/platform';

// console.disableYellowBox = true;
const styles = {
  iconInsets: {
    top: 0, // optional, default is 0.
    left: 0, // optional, default is 0.
    bottom: 0, // optional, default is 0.
    right: 0 // optional, default is 0.
  }
};

export default currentState => {
  const tabs = [
    {
      label: t('tabs.home'),
      screen: findScreenById('home'),
      icon: iconsMap.home,
      iconInsets: styles.iconInsets,
      passProps: { iconsMap },
      title: 'urSmiles',
      navigatorButtons: {
        leftButtons: [
          {
            testID: 'menu',
            title: 'Menu',
            id: 'menu',
            icon: iconsMap['drawer--nav']
          }
        ],
        rightButtons: [
          {
            // testID: 'notification',
            // title: 'Notification',
            // id: 'notification_bell',
            // icon: iconsMap['bell--nav']
            component: 'notification_bell'
          }
        ]
      }
    },
    {
      label: t('tabs.consulting'),
      screen: findScreenById('consulting_history'),
      icon: iconsMap.tooth_search,
      iconInsets: styles.iconInsets,
      title: t('tabs.consulting_history'),
      navigatorButtons: {
        leftButtons: [
          {
            testID: 'menu',
            title: 'Menu',
            id: 'menu',
            icon: iconsMap['drawer--nav']
          }
        ],
        rightButtons: [
          {
            component: 'notification_bell'
          }
        ]
      }
    },
    {
      label: t('tabs.schedule'),
      screen: findScreenById('my_schedule'),
      icon: iconsMap.calendar_check,
      iconInsets: styles.iconInsets,
      title: t('schedule.title_history'),
      navigatorButtons: {
        leftButtons: [
          {
            testID: 'menu',
            title: 'Menu',
            id: 'menu',
            icon: iconsMap['drawer--nav']
          }
        ],
        rightButtons: [
          {
            component: 'notification_bell'
          }
        ]
      }
    }
  ];

  Navigation.startTabBasedApp({
    tabs,
    tabsStyle: {
      tabBarButtonColor: platform.tabBarButtonColor,
      tabBarSelectedButtonColor: platform.tabBarSelectedButtonColor,
      tabBarBackgroundColor: platform.tabBarBackgroundColor,
      initialTabIndex: 0,
      tabBarHideShadow: false
    },
    appStyle: {
      forceTitlesDisplay: platform.forceTitlesDisplay,
      // tabBarButtonColor: '#999',
      navBarNoBorder: false,
      statusBarHidden: false,
      drawUnderStatusBar: platform.drawUnderStatusBar,
      tabBarSelectedButtonColor: platform.tabBarSelectedButtonColor,
      navBarTitleTextCentered: platform.navBarTitleTextCentered,
      // keepStyleAcrossPush: platform.keepStyleAcrossPush,
      topBarElevationShadowEnabled: platform.topBarElevationShadowEnabled,
      navBarTextColor: platform.navBarTextColor,
      navBarButtonColor: platform.navBarButtonColor,
      navBarLeftButtonColor: platform.navBarLeftButtonColor,
      navBarBackgroundColor: platform.toolbarDefaultBg,
      screenBackgroundColor: platform.containerBg,
      // orientation: 'both',
      orientation: 'portrait',
      // bottomTabBadgeTextColor: platform.bottomTabBadgeTextColor,
      // bottomTabBadgeBackgroundColor: platform.bottomTabBadgeBackgroundColor,
      backButtonImage: iconsMap['arrow_back--nav'], //require('./assets/images/buttons/arrow_back.png'),
      backButtonIconColor: platform.backButtonIconColor,
      hideBackButtonTitle: platform.hideBackButtonTitle,
      statusBarTextColorScheme: platform.iosStatusbar,
      statusBarColor: platform.statusBarColor
    },
    drawer: {
      left: {
        screen: findScreenById('sidebar'),
        passProps: { locale: currentState.locale, iconsMap }
      },
      right: {
        screen: findScreenById('notification'),
        passProps: { locale: currentState.locale, iconsMap }
      },
      style: {
        // ( iOS only )
        drawerShadow: false,
        contentOverlayColor: 'rgba(0,0,0,0.5)', // optional, add this if you want a overlay color when drawer is open
        leftDrawerWidth: 85,
        rightDrawerWidth: 85
      },
      disableOpenGesture: false
    },
    passProps: {
      locale: currentState.locale,
      iconsMap
    },
    animationType: 'fade'
  });
};
