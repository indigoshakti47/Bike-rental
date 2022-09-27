import AuthService from '../services/AuthService';

export const SET_AUTH_DATA = 'SET_AUTH_DATA';
export const LOGOUT = 'LOGOUT';

const setAuthData = ({ token, user }) => {
  const role = user.roles[0];

  return {
    type: SET_AUTH_DATA,
    payload: { token, user, role },
  }
};

export const signIn = (credentials) => async (dispatch) => {
  const { token, user } = await AuthService.signIn(credentials);
  dispatch(setAuthData({ token, user }));
};

export const signUp = (userData) => async (dispatch) => {
  const { token, user } = await AuthService.signUp(userData);
  dispatch(setAuthData({ token, user }));
};

export const logout = () => ({
  type: LOGOUT,
});
