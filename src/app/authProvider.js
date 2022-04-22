import axios from 'axios';
axios.defaults.withCredentials = true;
const apiurl = process.env.REACT_APP_APIURL;

const httpClient = (method, path, data = undefined) =>
  new Promise((resolve, reject) => {
    try {
      const res = axios[method](apiurl + path, data);
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
const login = ({ email, password }) =>
  httpClient('post', '/teachers/login', { email, password });
const checkAuth = async () => {
  try {
    return await httpClient('get', '/teachers/me');
  } catch (e) {
    return Promise.reject('Please Authenticate');
  }
};

const logout = () =>
  new Promise(async (resolve, reject) => {
    try {
      await httpClient('post', '/teachers/logout');
      resolve();
    } catch (e) {
      reject();
    }
  });
const checkError = response =>
  new Promise((resolve, reject) => {
    if (
      response &&
      response.status === 401 &&
      response.body &&
      response.body.error &&
      response.body.error === 'Please authenticate.'
    ) {
      reject();
      setTimeout(() => {
        window.location.hash = '#/login';
      }, 3000);
    } else {
      console.log('resolving');
      resolve();
    }
  });
const resendConfirmationEmail = ({ email, password }) =>
  httpClient('post', '/teachers/resendVerificationEmail', {
    email,
    password,
  });
const verifyEmail = ({ code }) =>
  httpClient('post', '/teachers/verify', {
    code,
  });
const forgotPassword = ({ email }) =>
  httpClient('post', '/teachers/forgotPassword', {
    email,
  });
const resetPassword = ({ token, password }) =>
  httpClient('post', '/teachers/resetPassword', {
    token,
    password,
  });
const newTeacher = data => httpClient('post', '/teachers', data);
const authProvider = {
  login,
  checkError,
  checkAuth,
  logout,
  getIdentity: checkAuth,
  getPermissions: () => Promise.resolve(),
  resendConfirmationEmail,
  forgotPassword,
  resetPassword,
  verifyEmail,
  newTeacher,
};
export default authProvider;
