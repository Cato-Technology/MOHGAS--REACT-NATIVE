import moment from 'moment';
import {UserResponse} from '../redux/types/auth/auth-types';

//import { ErrorResponse } from 'types/ErrorResponse';
//import { setAuthAsyncStorage } from '../async-storage/auth-async-storage';
import client from './client';
import {API_URLS} from '../../src/services/url-constants';
//import {store} from '../redux';

function orderHistory(data) {
  return new Promise((resolve, reject) => {
    client
      .post(API_URLS.ORDER_HISTORY, data)
      .then(async response => {
        try {
          resolve(response);
        } catch (e) {
          console.log('oh', e);
          reject(e);
        }
      })
      .catch(async err => {
        console.log('err', err);
        reject(err);
      });
  });
}

export const orderServices = {
  orderHistory,
};
