export const getIdentity = state => state.auth && state.auth.identity;
export const isLogged = state => state.auth && (state.auth.identity !== null);
