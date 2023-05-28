import client from './client';
import {API_URLS} from './url-constants';

const nearByGasAgencyRefill = (detail: any) => {
  return client.post(API_URLS.NEAR_BY_GAS_REFILL, detail);
};
const swapCylinder = (detail: any) => {
  return client.post(API_URLS.SWAP_CYLINDER, detail);
};
const nearByGasAgencyAsPerRequiredSize = (detail: any) => {
  return client.post(API_URLS.nearByGasAgencyAsPerRequiredSize, detail);
};
const getAccessoriesAsPerNearestAgencies = (detail: any) => {
  return client.post(API_URLS.getAccessoriesAsPerNearestAgencies, detail);
};
const checkOut = (detail: any) => {
  return client.post(API_URLS.checkout, detail);
};
const getSupportHelpTopics = (detail: any) => {
  return client.post(API_URLS.getSupportHelpTopics, detail);
};
const getSupportAccountRelatedIssues = (detail: any) => {
  return client.post(API_URLS.getSupportAccountRelatedIssues, detail);
};
const sendSupport = (detail: any) => {
  return client.post(API_URLS.support, detail);
};
const gasOrder = (detail: any) => {
  return client.post(API_URLS.gas_order, detail);
};

export const mainServics = {
  nearByGasAgencyRefill,
  swapCylinder,
  nearByGasAgencyAsPerRequiredSize,
  getAccessoriesAsPerNearestAgencies,
  checkOut,
  getSupportHelpTopics,
  getSupportAccountRelatedIssues,
  sendSupport,
  gasOrder,
};
