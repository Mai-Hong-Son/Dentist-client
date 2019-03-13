import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { locale, theme, navigator } from './common';

import auth from './auth';
import screen from './screen';
import services from './service';

export default combineReducers({
  locale,
  theme,
  form,
  auth,
  services,
  navigator,
  screen,
});
