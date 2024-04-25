import moment from 'moment';
import {UserResponse} from '../redux/types/auth/auth-types';

//import { ErrorResponse } from 'types/ErrorResponse';
//import { setAuthAsyncStorage } from '../async-storage/auth-async-storage';
import client from './client';
import { backend_URLS} from '../../src/services/url-constants';
import { API_URLS_VENDOR } from '../../src/services/url-constants-vendor';

//import {store} from '../redux';

function orderHistory(data: any) {
  return new Promise((resolve, reject) => {
    client
      .post(API_URLS_VENDOR.VENDOR_ORDER_HISTORY, data)
      .then(async response => {
        try {
          resolve(response);
          console.log("orderhisrtory-----", response);
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

function orderRecentHistory() {
  return new Promise((resolve, reject) => {
    client
      .get(backend_URLS.RECENT_HISTORY)
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

function orderAction(data: any, action: number) {
  return new Promise((resolve, reject) => {
    client
      .post(
        action == 1 ? backend_URLS.ACCEPT_ORDER 
        : (action == 2 ? backend_URLS.REJECT_ORDER
          : backend_URLS.COMPLETE_ORDER), data)
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
  orderRecentHistory,
  orderAction
};
