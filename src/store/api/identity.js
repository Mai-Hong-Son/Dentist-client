import { API } from './common';

export default {
  me: token => API.get(
      '/auth/me',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
};
