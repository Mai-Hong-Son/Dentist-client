import I18n from 'react-native-i18n';
import qs from 'qs';
import OneSignal from 'react-native-onesignal';

import { setNavigator } from './_App';
import { logout } from './store/actions/auth';
import { t } from './utils/common';


let isAppLoaded = false;

export default (dispatch, navigator, event, screen) => {
  setNavigator(navigator);
  OneSignal.addEventListener('received', () => {
    dispatch({ type: 'notification/read' });
  });

  const { type, id, link } = event;

  if (type === 'ScreenChangedEvent') {
    if (!isAppLoaded) {
      isAppLoaded = true;
      navigator.showLightBox({
        screen: 'promotion_alert',
        style: {
          // backgroundBlur: 'dark',
          backgroundColor: 'rgba(0,0,0, .5)',
          tapBackgroundToDismiss: true
        },
      });
    }
  }

  if (type === 'NavBarButtonPress' && id === 'menu') {
    navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'open'
    });
    return;
  }

  if (type === 'NavBarButtonPress' && id === 'notification') {
    navigator.toggleDrawer({
      side: 'right',
      animated: true,
      to: 'open'
    });
    return;
  }

  if (type === 'DeepLink' && link === 'profile') {
    navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'closed'
    });
    navigator.push({
      screen: 'profile'
    });

    return;
  }

  if (type === 'DeepLink' && link === 'promotions') {
    navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'closed'
    });
    navigator.push({
      screen: 'promotions',
      title: 'Khuyến mại'
    });

    return;
  }

  if (type === 'DeepLink' && link === 'notification') {
    navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'closed'
    });
    navigator.toggleDrawer({
      side: 'right',
      animated: true,
      to: 'open'
    });
    return;
  }

  // tab navigation
  const tabs = ['home', 'consulting_history', 'my_schedule'];
  if (type === 'DeepLink') {
    const indexOfTab = tabs.indexOf(link);

    if (indexOfTab !== -1) {
      // close drawer
      navigator.toggleDrawer({
        side: 'left',
        animated: true,
        to: 'closed'
      });
      navigator.switchToTab({
        tabIndex: indexOfTab
      });
      return;
    }
  }

  if (type === 'DeepLink' && link === 'logout') {
    dispatch(logout());
    return;
  }

  if (type === 'DeepLink' && link === 'logout_via_sidebar') {
    dispatch(logout());
    return;
  }

  if (type === 'DeepLink' && link) {
    const [screenTo, idNotif] = link.split('?', 2);
    const queryParams = qs.parse(idNotif);
    const screenNavigate = screenTo.split('screens/', 2)[1];

    navigator.toggleDrawer({
      side: 'right',
      animated: true,
      to: 'closed'
    });
    navigator.push({
      screen: screenNavigate,
      passProps: {
        id: queryParams.id,
        openLink: screenNavigate === 'promotion_detail'
      },
      navigatorStyle: {
        tabBarHidden: true
      }
    });
    return;
  }

  // if (type === 'DeepLink' && link === 'profile') {
  //   if (path.get(event, 'payload.origin', null) !== screen) {
  //     return;
  //   }

  //   navigator.toggleDrawer({
  //     side: 'left',
  //     animated: true,
  //     to: 'closed'
  //   });

  //   navigator.push({
  //     screen: 'profile',
  //     title: t('profile.screen_title')
  //   });
  //   return;
  // }

  // if (type === 'DeepLink' && link === 'questions') {
  //   navigator.switchToTab({
  //     tabIndex: 1
  //   });

  //   dispatch(screenPayload('question', event.payload));
  //   return;
  // }

  if (type === 'NavBarButtonPress') {
    switch (id) {
      case 'menu':
        navigator.toggleDrawer({
          side: 'left',
          animated: true
        });
        break;

      //     case 'search':
      //       navigator.push({
      //         screen: 'search',
      //         title: I18n.t('search.title'),
      //         passProps: {},
      //         animated: true,
      //         backButtonHidden: false
      //       });
      //       break;

      //     default:
      //       break;
    }
  }
};
