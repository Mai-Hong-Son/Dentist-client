import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';
import { Provider } from 'react-redux';
import I18n from 'react-native-i18n';
import Orientation from 'react-native-orientation';
import OneSignal from 'react-native-onesignal';

import { configStore } from './store';
import { registerScreens, findScreenById } from './route';
import { iconsLoaded, iconsMap } from './utils/AppIcons';
import { getLocale } from './store/selectors/common';
import { isLogged } from './store/selectors/auth';

import Authenticated from './AppAuthenticated';
import UnAuthenticated from './AppUnAuthenticated';

import common from './utils/common';
import { setDevice } from './store/api/auth';
import locales from './assets/locales';
import { navChanged } from './store/actions/common';
import constant from './constant';
// import platform from './theme/variables/platform';

I18n.fallback = true;
I18n.translations = locales;
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

let store = null;

let currentState = {
  isLogged: null,
  locale: null
};
let isFirstTime = true;

const handleSubscribe = () => {
  if (!store) return;

  if (isFirstTime) {
    isFirstTime = false;
    currentState = {
      isLogged: isLogged(store.getState()),
      locale: getLocale(store.getState())
    };

    startApp(currentState);
    return;
  }

  // if change ?
  const nextState = {
    isLogged: isLogged(store.getState()),
    locale: getLocale(store.getState())
  };

  if (
    nextState.isLogged !== currentState.isLogged ||
    nextState.locale !== currentState.locale
  ) {
    currentState = nextState;
    startApp(nextState);
  }
};

function startApp() {
  // is auth
  if (currentState.isLogged) {
    Authenticated(currentState);
  } else {
    UnAuthenticated(currentState);
  }
}

// initial check authenticate
iconsLoaded.then(async () => {
  try {
    store = await configStore();
    registerScreens(store, Provider);

    store.subscribe(handleSubscribe);

    // monitor current screen

    new ScreenVisibilityListener({
      willAppear: ({ screen, startTime, endTime, commandType }) => {
        // ignore sidebar screen
        store.dispatch(navChanged(screen));
      }
    }).register();

    store.dispatch({
      type: 'app/changeLanguage',
      payload: getLocale(store.getState())
    });
  } catch (e) {
    console.error(e);
  }
});

OneSignal.init(constant.onesignal);
OneSignal.inFocusDisplaying(2);
OneSignal.addEventListener('ids', deviceId => {
  setDevice(deviceId.userId);
});
OneSignal.configure();
