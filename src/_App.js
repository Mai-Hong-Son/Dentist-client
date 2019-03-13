import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import I18n from 'react-native-i18n';
import Orientation from 'react-native-orientation';
import { configStore } from './store';
import { registerScreens, findScreenById } from './route';
import { iconsLoaded, iconsMap } from './utils/AppIcons';
import { getLocale } from './store/selectors/common';
import common, { t } from './utils/common';
import locales from './assets/locales';
import platform from './theme/variables/platform';

I18n.fallback = true;
translations = locales;
I18n.defaultLocale = common.locale;
I18n.locale = common.locale;
let currentLocale = null;
let store = null;
console.disableYellowBox = true;

let navigator = null; // eslint-disable-line

Orientation.lockToPortrait();

export function setNavigator(nav) {
  console.log('setNavigator');
  navigator = nav;
}

export function getNavigator() {
  return navigator;
}

// each time store change, we will handle at this function
const handleSubscribe = () => {
  if (!store) {
    return;
  }

  // If language changed, start app again to load new locale
  const prevLocale = currentLocale;
  currentLocale = getLocale(store.getState());
  // set locale
  I18n.locale = currentLocale;

  if (!currentLocale || currentLocale !== prevLocale) {
    const tabs = [
      {
        label: t('tabs.home'),
        screen: findScreenById('home'),
        icon: require('./assets/images/menubar/home.png'),
        selectedIcon: require('./assets/images/menubar/home.png'),
        iconInsets: styles.iconInsets,
        passProps: { iconsMap },
        title: 'urSmiles',
        navigatorButtons: {
          leftButtons: [
            {
              testID: 'menu',
              title: 'Menu',
              id: 'menu',
              icon: require('./assets/images/icon_menu.png')
            }
          ]
          // rightButtons: [
          //   {
          //     testID: 'search',
          //     title: 'Search',
          //     id: 'search',
          //     icon: iconsMap['ios-search']
          //   }
          // ]
        }
      },
      // {
      //   label: '', //t('tabs.messenger'),
      //   screen: findScreenById('send_photos'),
      //   icon: require('./assets/images/buttons/chatbubble_outline.png'),
      //   selectedIcon: require('./assets/images/buttons/chatbubble.png'),
      //   iconInsets: styles.iconInsets,
      //   title: t('tabs.messenger')
      // },
      // {
      //   label: undefined,
      //   screen: findScreenById('cart'),
      //   icon: require('./assets/images/buttons/icon_tooth.png'),
      //   // selectedIcon: require('./assets/images/buttons/icon_tooth.png'),
      //   iconInsets: {
      //     top: 6, // optional, default is 0.
      //     left: 0, // optional, default is 0.
      //     bottom: -6, // optional, default is 0.
      //     right: 0 // optional, default is 0.
      //   },
      //   title: t('tabs.cart')
      // },
      {
        label: t('tabs.consulting'),
        screen: findScreenById('consulting_history'),
        icon: require('./assets/images/menubar/consulting.png'),
        selectedIcon: require('./assets/images/menubar/consulting.png'),
        iconInsets: styles.iconInsets,
        title: t('tabs.consulting_history'),
        navigatorButtons: {
          leftButtons: [
            {
              testID: 'menu',
              title: 'Menu',
              id: 'menu',
              icon: require('./assets/images/icon_menu.png')
            }
          ]
          // rightButtons: [
          //   {
          //     testID: 'search',
          //     title: 'Search',
          //     id: 'search',
          //     icon: iconsMap['ios-search']
          //   }
          // ]
        }
      },
      {
        label: t('tabs.schedule'),
        screen: findScreenById('my_schedule'),
        icon: require('./assets/images/menubar/researve.png'),
        selectedIcon: require('./assets/images/menubar/researve.png'),
        iconInsets: styles.iconInsets,
        title: t('schedule.title_history'),
        navigatorButtons: {
          leftButtons: [
            {
              testID: 'menu',
              title: 'Menu',
              id: 'menu',
              icon: require('./assets/images/icon_menu.png')
            }
          ]
          // rightButtons: [
          //   {
          //     testID: 'search',
          //     title: 'Search',
          //     id: 'search',
          //     icon: iconsMap['ios-search']
          //   }
          // ]
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
        backButtonImage: require('./assets/images/buttons/arrow_back.png'),
        backButtonIconColor: platform.backButtonIconColor,
        hideBackButtonTitle: platform.hideBackButtonTitle,
        statusBarTextColorScheme: platform.iosStatusbar,
        statusBarColor: platform.statusBarColor
      },
      drawer: {
        left: {
          screen: findScreenById('sidebar'),
          passProps: { locale: currentLocale, iconsMap }
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
        locale: currentLocale,
        iconsMap
      },
      animationType: 'fade'
    });
  }
};

// console.disableYellowBox = true;
const styles = {
  // if you don't want to display tabs label, set label above to undefined
  // and fix a little bit tab icon possition
  // iconInsets: {
  //   top: 6, // optional, default is 0.
  //   left: 0, // optional, default is 0.
  //   bottom: -6, // optional, default is 0.
  //   right: 0 // optional, default is 0.
  // },
  iconInsets: {
    top: 0, // optional, default is 0.
    left: 0, // optional, default is 0.
    bottom: 0, // optional, default is 0.
    right: 0 // optional, default is 0.
  }
};

// Start App
iconsLoaded.then(async () => {
  try {
    store = await configStore();
    registerScreens(store, Provider);
    store.subscribe(handleSubscribe);

    // start app with default locale
    store.dispatch({
      type: 'app/changeLanguage',
      payload: getLocale(store.getState())
    });
  } catch (e) {
    console.error(e);
  }
});
