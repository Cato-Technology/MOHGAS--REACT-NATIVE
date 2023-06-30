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
const nearByGasAgencyRefill = (lat: string, lon: string) => {
  console.log('lat==>', lat);

  return client.get(
    API_URLS.NEAR_BY_GAS_REFILL + `?latitude=${lat}&longitude=${lon}`,
  );
};
const swapCylinder = (detail: any) => {
  return client.post(API_URLS.SWAP_CYLINDER, detail);
};
const nearByGasAgencyAsPerRequiredSize = (detail: any) => {
  return client.post(API_URLS.nearByGasAgencyAsPerRequiredSize, detail);
};
const getAccessoriesAsPerNearestAgencies = (lat, lon, userId) => {
  return client.get(
    API_URLS.getAccessoriesAsPerNearestAgencies +
      `?latitude=${lat}&longitude=${lon}&userid=${userId}`,
  );
};
const checkOut = (detail: any) => {
  return client.post(API_URLS.checkout, detail);
};
const getSupportHelpTopics = () => {
  return client.get(API_URLS.getSupportHelpTopics);
};
const getSupportAccountRelatedIssues = () => {
  return client.get(API_URLS.getSupportAccountRelatedIssues);
};
const sendSupport = (detail: any) => {
  return client.post(API_URLS.support, detail);
};
const gasOrder = (detail: any) => {
  return client.post(API_URLS.ORDERS, detail);
};
const updateVendorBusinessProfile = (detail: any) => {
  return client.post(API_URLS_VENDOR.PROFILE, detail);
};
const getVendorBusinessProfile = () => {
  return client.get(API_URLS_VENDOR.PROFILE);
};
const upDateVendorBankAccount = (detail: any) => {
  return client.post(API_URLS_VENDOR.VENDOR_BANK_ACCOUNT, detail);
};
const getVendorBankAccount = () => {
  return client.get(API_URLS_VENDOR.VENDOR_BANK_ACCOUNT);
};
const getVendorOrderHistory = () => {
  return client.get(API_URLS_VENDOR.VENDOR_ORDER_HISTORY);
};
const createBvn = (detail: any) => {
  return client.post(API_URLS_VENDOR.CREATE_BVN, detail);
};
const notifyVendor = (detail: any) => {
  return client.post(API_URLS.NOTIFY_VENDOR, detail);
};
const orderExpired = (detail: any) => {
  return client.post(API_URLS.ORDER_EXPIRED, detail);
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
  upDateVendorBankAccount,
  getVendorBankAccount,
  getVendorOrderHistory,
  createBvn,
  notifyVendor,
  orderExpired,
};
