export const listNotification = (...args) => ({ type: 'notification/list', args });
export const changeStatusNotif = (...args) => ({ type: 'notification/change/status', args });
export const deleteNotification = (...args) => ({ type: 'notification/delete', args });
export const deleteAllNotification = (...args) => ({ type: 'notification/delete/all', args });
