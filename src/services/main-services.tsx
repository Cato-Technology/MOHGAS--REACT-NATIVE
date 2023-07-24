import client from './client';
import {backend_URLS} from './url-constants';
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
    backend_URLS.NEAR_BY_GAS_REFILL + `?latitude=${lat}&longitude=${lon}`,
  );
};
const swapCylinder = (detail: any) => {
  return client.post(backend_URLS.SWAP_CYLINDER, detail);
};
const nearByGasAgencyAsPerRequiredSize = (detail: any) => {
  return client.post(backend_URLS.nearByGasAgencyAsPerRequiredSize, detail);
};
const getAccessoriesAsPerNearestAgencies = (lat, lon) => {
  return client.get(
    backend_URLS.GET_NEAREST_ACCESSORIES + `?latitude=${lat}&longitude=${lon}`,
  );
};
const checkOut = (detail: any) => {
  return client.post(backend_URLS.checkout, detail);
};
const getSupportHelpTopics = () => {
  return client.get(backend_URLS.getSupportHelpTopics);
};
const getSupportAccountRelatedIssues = () => {
  return client.get(backend_URLS.getSupportAccountRelatedIssues);
};
const sendSupport = (detail: any) => {
  return client.post(backend_URLS.support, detail);
};
const gasOrder = (detail: any) => {
  return client.post(backend_URLS.ORDERS, detail);
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
  return client.post(backend_URLS.NOTIFY_VENDOR, detail);
};
const orderExpired = (detail: any) => {
  return client.post(backend_URLS.ORDER_EXPIRED, detail);
};

//Accept Reject Order
const acceptOrder = (detail: any) => {
  return client.post(backend_URLS.ACCEPT_ORDER, detail);
};
const rejectOrder = (detail: any) => {
  return client.post(backend_URLS.REJECT_ORDER, detail);
};
const getStates = () => {
  return client.get(backend_URLS.GET_STATES);
};
const getCities = id => {
  console.log('id', id);

  return client.get(backend_URLS.GET_CITIES + `?state_id=${id}`);
};
export const mainServics = {
  getCities,
  getStates,
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
  acceptOrder,
  rejectOrder,
};
