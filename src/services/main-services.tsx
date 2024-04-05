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
const upDateProductPrice = (data: any) => {
  return client.post(API_URLS_VENDOR.UPDATE_GAS_PRICE, data);
};

const getVendorGasPrice = (id: any) => {

  return client.get(`${API_URLS_VENDOR.GET_VENDOR_GAS_PRICE}?vendor_id=${id}`)
}
//User Services
const nearByGasAgencyRefill = (
  lat: string,
  lon: string,
  type: string,
  size: number,
) => {
  console.log('size==>', size);

  return client.get(
    backend_URLS.NEAR_BY_GAS_REFILL +
      `?latitude=${lat}&longitude=${lon}&type=${type}&size=${size}`,
  );
};
const swapCylinder = (detail: any) => {
  return client.post(backend_URLS.SWAP_CYLINDER, detail);
};
const nearByGasAgencyAsPerRequiredSize = (detail: any) => {
  return client.post(backend_URLS.nearByGasAgencyAsPerRequiredSize, detail);
};
const getOnlineVendorsByCity = (city: string) => {
  return client.get(`${backend_URLS.GET_ONLINE_BRANCH_BY_CITY}/${city}`);
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
const getVendorOrderHistory = (detail: any) => {
  const res = client.post(API_URLS_VENDOR.VENDOR_ORDER_HISTORY, detail);

  console.log("===============", res, detail);
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
const getLga = id => {
  return client.get(backend_URLS.GET_LGA + `?state_id=${id}`);
};
const getStates = () => {
  return client.get(backend_URLS.GET_STATES);
};
const getCities = id => {
  console.log('id', id);

  return client.get(backend_URLS.GET_CITIES + `?state_id=${id}`);
};
const getWalletTopupDetails = (detail: any) => {
  return client.post(backend_URLS.GET_TOPUP_WALLET_DETAILS, detail);
};

const fundWallet = (detail:any) => {
  return client.post(backend_URLS.FUND_WALLET, detail);
}

const getWalletBalance = (id:string) => {
  return client.get(`${backend_URLS.GET_WALLET_BALANCE}?user_id=${id}`)
}

const requestWithdrawal = (details: any) => {
  return client.post(`${backend_URLS.REQUEST_WITHDRAWAL}`, details)
}

export const mainServics = {
  getWalletTopupDetails,
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
  upDateProductPrice,
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
  getLga,
  fundWallet,
  getOnlineVendorsByCity,
  getWalletBalance,
  requestWithdrawal,
  getVendorGasPrice
};
