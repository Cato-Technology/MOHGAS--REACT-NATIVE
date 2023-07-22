import moment from 'moment';
import {UserResponse} from '../redux/types/auth/auth-types';

//import { ErrorResponse } from 'types/ErrorResponse';
//import { setAuthAsyncStorage } from '../async-storage/auth-async-storage';
import client from './client';
import {backend_URLS} from '../../src/services/url-constants';
//import {store} from '../redux';

function updateProfile(data: any) {
  console.log('data', data);

  return new Promise<UserResponse>((resolve, reject) => {
    client
      .post(backend_URLS.UPDATE_USER, data)
      .then(async response => {
        try {
          console.log('res ', response);

          //  await setAuthAsyncStorage(response.data);
          resolve(response);
        } catch (e) {
          console.log('E', e);
          reject(e);
        }
      })
      .catch(async err => {
        console.log('E', err);
        reject(err);
      });
  });
}
function getProfile(data: any) {
  console.log('data==>', data);

  return new Promise<UserResponse>((resolve, reject) => {
    client
      .get(backend_URLS.GET_USER)
      .then(async response => {
        try {
          console.log('res ', response);

          //  await setAuthAsyncStorage(response.data);
          resolve(response);
        } catch (e) {
          console.log('E', e);
          reject(e);
        }
      })
      .catch(async err => {
        console.log('E', err);
        reject(err);
      });
  });
}

export const profileService = {
  updateProfile,
  getProfile,
};
