import axios from 'axios';
import authActions from './authActions';

axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = credentials => dispatch => {
  dispatch(authActions.registerRequest());

  axios
    .post('/auth/signup', credentials)
    .then(({ data }) => {
      token.set(data.token);
      dispatch(authActions.registerSuccess(data));
    })
    .catch(({ message }) => dispatch(authActions.registerError(message)));
};

const logIn = credentials => dispatch => {
  dispatch(authActions.loginRequest());

  axios
    .post('/auth/login', credentials)
    .then(({ data }) => {
      token.set(data.token);
      dispatch(authActions.loginSuccess(data));
    })
    .catch(({ message }) => dispatch(authActions.loginError(message)));
};

const getCurrentUser = () => (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);
  dispatch(authActions.getCurrentUserRequest());

  axios
    .get('/auth/current')
    .then(({ data }) => dispatch(authActions.getCurrentUserSuccess(data)))
    .catch(({ message }) => authActions.getCurrentUserError(message));
};

const logOut = () => dispatch => {
  dispatch(authActions.logoutRequest());

  axios
    .patch('/auth/logout')
    .then(() => {
      token.unset();
      dispatch(authActions.logoutSuccess());
    })
    .catch(({ message }) => dispatch(authActions.logoutError(message)));
};

const deleteCurrentUser = () => dispatch => {
  dispatch(authActions.deleteCurrentUserRequest());

  axios
    .delete('/auth/current')
    .then(({ data }) => {
      token.unset();
      dispatch(authActions.deleteCurrentUserSuccess(data));
    })
    .catch(({ message }) => authActions.deleteCurrentUserError(message));
};

export default { register, logOut, logIn, getCurrentUser, deleteCurrentUser };
