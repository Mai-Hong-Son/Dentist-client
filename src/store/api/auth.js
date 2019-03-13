import RNFetchBlob from 'react-native-fetch-blob';
import { API, withToken, generateBodyFile } from './common';
import config from '../../constant';

let _deviceId = null;
export const setDevice = deviceId => { _deviceId = deviceId; };

export default {
  register: async ({ email, password, username, fullname, phone, avatar, address, ...etc }) => {
    const params = [
      { name: 'username', data: username },
      { name: 'fullname', data: fullname },
      { name: 'password', data: password },
      { name: 'email', data: email },
      { name: 'phone', data: phone },
      { name: 'address', data: address }
    ];

    if (avatar) {
      params.push({ ...generateBodyFile(avatar), name: 'avatar' });
    } else {
      params.push({ name: 'avatar', data: '' });
    }

    try {
      const startRequest = Date.now();
      const resp = await RNFetchBlob.fetch(
        'POST',
        `${config.api}/auth/register`,
        {
          'Content-Type': 'multipart/form-data'
        },
        params
      );

      const endRequest = Date.now();

      const { status } = resp.info();

      let problem = '';
      if (status < 300) {
        problem = '';
      } else if (status < 500) {
        problem = 'CLIENT_ERROR';
      } else if (status < 600) {
        problem = 'SERVER_ERROR';
      }

      return {
        // ok      - Boolean - True is the status code is in the 200's; false otherwise.
        // problem - String  - One of 6 different values (see below - problem codes)

        // data     - Object - this is probably the thing you're after.
        // status   - Number - the HTTP response code
        // headers  - Object - the HTTP response headers
        // config   - Object - the `axios` config object used to make the request
        // duration - Number - the number of milliseconds it took to run this request
        ok: status <= 400,
        problem,
        data: resp.json(),
        status,
        headers: {},
        config: {},
        duration: endRequest - startRequest
      };
    } catch (e) {
      throw e;
    }
  },

  login: ({ username, password }) =>
    API.post('auth/basic',
      {
        username,
        password
      },
      {
        headers: {
          'x-device-id': _deviceId
        }
      }
    ),

  changePassword: (token, { new_password, old_password }) =>
    API.post(
      'auth/change-password',
      {
        new_password,
        old_password
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ),

  loginViaFacebook: ({ token }) =>
    API.get(
      'auth/facebook',
      {},
      {
        headers: {
          Authorization: `Facebook ${token}`,
          'x-device-id': _deviceId
        }
      }
    ),

  loginViaGoogle: ({ token }) =>
    API.get(
      'auth/google',
      {},
      {
        headers: {
          Authorization: `Google ${token}`,
          'x-device-id': _deviceId
        }
      }
    ),

  updateUser: (token, phoneNumber) =>
    withToken(token, API.put, 'auth/me', {
      phone: phoneNumber
    }),

  confirmationPhone: token => withToken(token, API.get, 'confirmation-phones/me'),

  createConfirmationPhone: (token, phoneNumber) =>
    withToken(token, API.post, 'confirmation-phones', {
      phone_number: phoneNumber
    }),

  logout: ({ refresh_token }) =>
    API.put('auth/logout', {
      refresh_token
    }),

  refreshAccessToken: ({ refresh_token }) =>
    API.post('auth/refresh', {
      refresh_token
    }),

  forgotPasswordViaEmail: ({ email }) => API.post('auth/forgot-password', { email })
};
