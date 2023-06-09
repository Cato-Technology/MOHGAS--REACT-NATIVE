import client from './client';
import {API_URLS} from './url-constants';
import {API_URLS_VENDOR} from './url-constants-vendor';

//Vendor Services
const addBranch = (detail: any) => {
  return client.post(API_URLS_VENDOR.BRANCH, detail);
};

const getBranches = (detail: any) => {
  return client.get(API_URLS_VENDOR.BRANCH, detail);
};
const addVendorProducts = (detail: any) => {
  return client.get(API_URLS_VENDOR.VENDOR_PRODUCTS, detail);
};
const getVendorProducts = (detail: any) => {
  return client.get(API_URLS_VENDOR.VENDOR_PRODUCTS, detail);
};
const upDateProdcutPrice = (data: any, id: string) => {
  return client.put(API_URLS_VENDOR.VENDOR_PRODUCTS + '/' + id, data);
};
//User Services
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
const updateVendorBusinessProfile = (detail: any) => {
  return client.post(API_URLS_VENDOR.PROFILE, detail);
};
const getVendorBusinessProfile = () => {
  return client.get(API_URLS_VENDOR.PROFILE);
};
export const mainServics = {
  addBranch,
  getBranches,
  addVendorProducts,
  getVendorProducts,
  nearByGasAgencyRefill,
  swapCylinder,
  nearByGasAgencyAsPerRequiredSize,
  getAccessoriesAsPerNearestAgencies,
  checkOut,
  getSupportHelpTopics,
  getSupportAccountRelatedIssues,
  sendSupport,
  gasOrder,
  upDateProdcutPrice,
  updateVendorBusinessProfile,
  getVendorBusinessProfile,
};
