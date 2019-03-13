import { API, withToken } from './common';

export default {
  fetchNotifications: (token, page) => withToken(token, API.get, `notifications?page=${page}`),
  fetchReadNotifications: (token) => withToken(token, API.get, 'notifications?filters[status]=1'),
  changeStatusNotifications: (token, notifId) =>
    withToken(token, API.patch, `notifications/${notifId}`),
  deleteNotification: (token, id) =>
    withToken(token, API.delete, `notifications/${id}`),
  deleteAllNotification: (token) =>
    withToken(token, API.delete, 'notifications/all'),
};
