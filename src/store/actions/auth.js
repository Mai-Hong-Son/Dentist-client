export const register = ({ username, fullname, password, email, avatar, ...attr }, ...etc) => ({
  type: 'auth/register',
  args: [
    {
      username,
      fullname,
      password,
      email,
      avatar,
      ...attr
    },

    ...etc
  ]
});

export const login = ({ username, password }, ...etc) => ({
  type: 'auth/login',
  args: [
    {
      username,
      password
    },
    ...etc
  ]
});

export const loginViaFacebook = ({ token }, ...etc) => ({
  type: 'auth/loginViaFacebook',
  args: [
    {
      token
    },
    ...etc
  ]
});

export const loginViaGoogle = ({ token }) => ({
  type: 'auth/loginViaGoogle',
  args: [{ token }]
});

export const forgotPasswordViaEmail = ({ email }) => ({
  type: 'auth/forgotPasswordViaEmail',
  args: [{ email }]
});

export const changePassword = (token, { old_password, new_password }) => ({
  type: 'auth/changePassword',
  args: [
    token,
    {
      old_password,
      new_password
    }
  ]
});

// TOKEN

export const logout = () => ({
  type: 'auth/logout'
});

export const refreshToken = ({ refresh_token }) => ({
  type: 'auth/refreshAccessToken',
  args: [{ refresh_token }]
});

export const removeIdentity = () => ({
  type: 'auth/removeIdentity'
});

export const updateTokens = ({ access_token, refresh_token }) => ({
  type: 'auth/updateTokens',
  payload: {
    access_token,
    refresh_token
  }
});

export const refreshingToken = () => ({
  type: 'auth/refreshingToken'
});

export const refreshedToken = () => ({
  type: 'auth/refreshedToken'
});

export const updateUserInfo = (...args) => ({ type: 'auth/update/user', args });

export const confirmationPhone = (...args) => ({ type: 'user/confirm/phone', args });

export const createConfirmationPhone = (...args) => ({ type: 'user/confirm/phone/create', args });
