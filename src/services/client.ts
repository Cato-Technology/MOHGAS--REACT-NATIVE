import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import {Alert} from 'react-native';
import AuthContext from '../utils/auth-context';
//import Config from 'react-native-config';

const request = axios.create({
  baseURL: 'https://admin.mohgasapp.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});

const onSuccess = function (response: any) {
  //
  return response.data;
};

const onError = function (error: any) {
  //   console.error('Request Failed:', error.config);
  if (error.response) {
    // Request was made but server responded with something
    // other than 2xx
    // console.error('Status:', error.response.status);
    // console.error('Data:', error.response.data);
    // console.error('Headers:', error.response.headers);
  }
  return Promise.reject({
    errMsg: !error?.response ? 'Network Issue!' : error?.response?.data,
    status: error?.response?.status || 'not status',
  });
};
request.interceptors.response.use(
  function (response) {
    // 200 type responses, this should be left as it is
    return response;
  },
  function (error) {
    console.log('ttt', error);
    if (error.response.status == 401) {
      AsyncStorage.clear();
    }
    // Handle your 401 error, maybe the UI changes and removing from local storage
    return Promise.reject(error);
  },
);
request.interceptors.response.use(onSuccess, onError);

request.interceptors.request.use(
  async config => {
    const userToken = await AsyncStorage.getItem('token');
    console.log('userTokenInter', userToken);

    config.headers['token'] = `${userToken}`;
    //  config.headers.Authorization = 'user';

    return config;
  },
  error => Promise.reject(error),
);
export default request;
