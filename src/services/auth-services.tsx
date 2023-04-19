import moment from 'moment';
import {UserResponse} from '../redux/types/auth/auth-types';

//import { ErrorResponse } from 'types/ErrorResponse';
//import { setAuthAsyncStorage } from '../async-storage/auth-async-storage';
import client from './client';
import {API_URLS} from './url-constants';
//import {store} from '../redux';

function login(data: any) {
  console.log('data', data);

  return new Promise<UserResponse>((resolve, reject) => {
    client
      .post(API_URLS.LOGIN, data)
      .then(async response => {
        try {
          console.log('res', response);

          //  await setAuthAsyncStorage(response.data);
          resolve(response);
        } catch (e) {
          console.log('User login service error block login1.', e);
          reject(e);
        }
      })
      .catch(async err => {
        console.log('User login service error block login.', err);
        reject(err);
      });
  });
}

export const authService = {
  login,
};
