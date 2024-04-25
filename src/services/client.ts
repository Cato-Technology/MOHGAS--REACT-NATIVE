import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useContext} from 'react';
import {Alert} from 'react-native';
import SCREENS from '../utils/constants';
//import Config from 'react-native-config';

const request = axios.create({
  baseURL: 'https://admin.mohgasapp.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});

let signOutFunction;

export const setSignOutFunction = signOut => {
  signOutFunction = signOut;
};

const onSuccess = function (response: any) {
  //
  return response.data;
};

const onError = async function (error: any) {
  //   console.error('Request Failed:', error.config);
  if (error.response) {

    if (error.response) {
      if (error.response.status === 401 && error.response.data.message === "Token already expired.") {
        // Token expired, navigate to login page
        signOutFunction();
        await AsyncStorage.clear();
      
      }
      return Promise.reject({
        errMsg: error?.response?.data || 'Network Issue!',
      });
    }
    // Request was made but server responded with something
    // other than 2xx
    // console.error('Status:', error.response.status);
    // console.error('Data:', error.response.data);
    // console.error('Headers:', error.response.headers);
  }
  return Promise.reject({
    errMsg: !error?.response ? 'Network Issuee!' : error?.response?.data,
    // status: error?.response?.status || 'not status',
  });
};

// request.interceptors.response.use(
//   function (response) {
//     // 200 type responses, this should be left as it is
//     return response;
//   },
//   function (error) {
//     console.log('ttt', error);
//     if (error.response.status == 401) {
//       AsyncStorage.clear();
//     }
//     // Handle your 401 error, maybe the UI changes and removing from local storage
//     return Promise.reject(error);
//   },
// );
request.interceptors.response.use(onSuccess, onError);

request.interceptors.request.use(
  async config => {
    const userToken = await AsyncStorage.getItem('token');
    // console.log('userTokenInter', userToken);

    // const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTciLCJ0eXBlIjoiVXNlciIsImltYWdlIjoiaHR0cHM6Ly9hZG1pbi5tb2hnYXNhcHAuY29tL2Fzc2V0cy9kZWZhdWx0cy91c2VyLXdlYi5qcGciLCJmdWxsX25hbWUiOiJUZWVhZG1pbm4iLCJlbWFpbCI6ImFudGhvbnlvYmVkN0BnbWFpbC5jb20iLCJwaG9uZV9ubyI6IjA4MDI3MTA0OTM4Iiwic3RyZWV0X25hbWUiOiJzdHJlZXQiLCJwcm92aW5jZSI6IkFidWphIEZlZGVyYWwgQ2FwaXRhbCBUZXJyaXRvcnkiLCJjaXR5IjpudWxsLCJsZ2EiOm51bGwsInJlZmVyYWxfY29kZSI6IjZXSlM4RlVhaHoiLCJpYXQiOjE3MTE0MzYzMTYsImV4cCI6MTcxMTUyMjcxNn0.ZLkhgBDkaz208Emyusk31ja3htKYJrtZX1WhsiMss7c'

    config.headers['token'] = `${userToken}`;
    //  config.headers.Authorization = 'user';

    return config;
  },
  error => Promise.reject(error),
);
export default request;
