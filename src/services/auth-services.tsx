import moment from 'moment';
import { UserResponse } from '../redux/types/auth/auth-types';

//import { ErrorResponse } from 'types/ErrorResponse';
//import { setAuthAsyncStorage } from '../async-storage/auth-async-storage';
import client from './client';
import { backend_URLS } from '../../src/services/url-constants';
//import {store} from '../redux';

function login(data: any) {
  console.log('data', data);

  return new Promise<UserResponse>((resolve, reject) => {

    client
      .post(backend_URLS.LOGIN, data)
      .then(async response => {
        try {
          console.log('res', response);

          //  await setAuthAsyncStorage(response.data);
          resolve(response);
        } catch (e) {
          console.log('User login service error block login.', e);
          reject(e);
        }
      })
      .catch(async err => {
        console.log('User login service error block login.', err);
        reject(err);
      });
  });
}

function signUp(data: any) {
  console.log('data', data);

  return new Promise<UserResponse>((resolve, reject) => {
    client
      .post(backend_URLS.SIGNUP, data)
      .then(async response => {
        try {
          console.log('res SIGN', response);

          //  await setAuthAsyncStorage(response.data);
          resolve(response);
        } catch (e) {
          console.log('User SIFNUP service error block SIFNUP1.', e);
          reject(e);
        }
      })
      .catch(async err => {
        console.log('User SIFNUP service error block SIFNUP.', err);
        reject(err);
      });
  });
}
function forgotPassword(data: any) {
  console.log('data', data);

  return new Promise<UserResponse>((resolve, reject) => {
    client
      .post(backend_URLS.FORGOT_PASSWORD, data)
      .then(async response => {
        try {
          console.log('res', response);

          //  await setAuthAsyncStorage(response.data);
          resolve(response);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      })
      .catch(async err => {
        console.log('User SIFNUP service error block SIFNUP.', err);
        reject(err);
      });
  });
}
function sendOtpVerification(data: any) {
  console.log('data', data);

  return new Promise<UserResponse>((resolve, reject) => {
    client
      .post(backend_URLS.SEND_ACC_VERIFY, data)
      .then(async response => {
        try {
          console.log('res', response);

          //  await setAuthAsyncStorage(response.data);
          resolve(response);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      })
      .catch(async err => {
        console.log('User SIFNUP service error block SIFNUP.', err);
        reject(err);
      });
  });
}
function verifyOtp(data: any) {
  console.log('data', data);

  return new Promise<UserResponse>((resolve, reject) => {
    client
      .post(backend_URLS.VERIFY_OTP, data)
      .then(async response => {
        try {
          console.log('res', response);

          //  await setAuthAsyncStorage(response.data);
          resolve(response);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      })
      .catch(async err => {
        console.log('User SIFNUP service error block SIFNUP.', err);
        reject(err);
      });
  });
}
function verifyOtpAccount(data: any) {
  console.log('data', data);

  return new Promise<UserResponse>((resolve, reject) => {
    client
      .post(backend_URLS.VERIFY_OTP_ACCOUNT, data)
      .then(async response => {
        try {
          console.log('res', response);

          //  await setAuthAsyncStorage(response.data);
          resolve(response);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      })
      .catch(async err => {
        console.log('User SIFNUP service error block SIFNUP.', err);
        reject(err);
      });
  });
}
const setPassword = (detail: any) => {
  return client.post(backend_URLS.NEW_PASSWORD, detail);
};
const registerVendor = (detail: any) => {
  return client.post(backend_URLS.REGISTER_VENDOR, detail);
};
export const authService = {
  login,
  signUp,
  forgotPassword,
  verifyOtp,
  registerVendor,
  setPassword,
  sendOtpVerification,
  verifyOtpAccount,
};
