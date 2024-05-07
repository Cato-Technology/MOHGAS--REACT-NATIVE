import moment from 'moment';
import { UserResponse } from '../redux/types/auth/auth-types';

//import { ErrorResponse } from 'types/ErrorResponse';
//import { setAuthAsyncStorage } from '../async-storage/auth-async-storage';
import client from './client';
import { backend_URLS } from '../../src/services/url-constants';
//import {store} from '../redux';

async function updateProfile(data: any) {
  console.log('data', data);


  return new Promise<UserResponse>((resolve, reject) => {
    client
      .post(backend_URLS.UPDATE_USER, data)
      .then(async response => {
        console.log(response, "response coming in========");
        try {
          //  await setAuthAsyncStorage(response.data);
          resolve(response);
        } catch (e) {
          console.log('===errlog', e);
          reject(e);
        }
      })
      .catch(async err => {
        console.log('Errlo', err);
        reject(err);
      });
  });
}

// async function updateProfile(data: any) {
//   try {
//     console.log('data', data);
//     const res = await client.post(backend_URLS.UPDATE_USER, data);
//     console.log('big response', res);
//     return res;
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     throw error; // Optionally rethrow the error to handle it further upstream
//   }
// }


function getProfile(data: any) {

  return new Promise<UserResponse>((resolve, reject) => {
    client
      .get(backend_URLS.GET_USER, { params: { user_id: data.user_id } })
      .then(async response => {
        try {
          console.log('res the actual ', response);

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
