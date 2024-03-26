import {HIDE_LOADER, SHOW_LOADER} from '../event/constants';

import {
  BranchesResponse,
  SupportResponse,
  VendorAccountDetialsResponse,
  VendorBusinessProfileResponse,
  VendorOrderHistoryResponse,
  VendorProductResponse,
} from '../types';
import {
  ACCOUNT_REALTED_ISSUES,
  BRANCHES,
  BUSINESS_PROFILE,
  PRODUCTS,
  SUPPORT,
  VENDOR_ACCOUNT_DETAILS,
  VENDOR_ORDER_HISTORY,
} from './constants';
import {mainServics} from '../../services';

export const addGetSupportData = (data: SupportResponse) => ({
  type: SUPPORT,
  payload: data,
});
export const addGetSupportAccountRelatedIssues = (data: SupportResponse) => ({
  type: ACCOUNT_REALTED_ISSUES,
  payload: data,
});
export const getAddBranches = (data: BranchesResponse) => ({
  type: BRANCHES,
  payload: data,
});
export const getAddVendorProductR = (data: VendorProductResponse) => ({
  type: PRODUCTS,
  payload: data,
});
export const addVendorBusinessProfile = (
  data: VendorBusinessProfileResponse,
) => ({
  type: BUSINESS_PROFILE,
  payload: data,
});
export const addVendorAccountDetials = (
  data: VendorAccountDetialsResponse,
) => ({
  type: VENDOR_ACCOUNT_DETAILS,
  payload: data,
});
export const addVendorOrderHistory = (data: VendorOrderHistoryResponse) => ({
  type: VENDOR_ORDER_HISTORY,
  payload: data,
});

export const getSupportData =
  () => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    dispatch({
      type: SHOW_LOADER,
    });
    await mainServics
      .getSupportHelpTopics()
      .then(async res => {
        await dispatch(addGetSupportData(res.responsedata));
        dispatch({
          type: HIDE_LOADER,
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  };

export const getSupportAccountRelatedIssues =
  () => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    dispatch({
      type: SHOW_LOADER,
    });
    await mainServics
      .getSupportAccountRelatedIssues()
      .then(async res => {
        await dispatch(addGetSupportAccountRelatedIssues(res.responsedata));
        dispatch({
          type: HIDE_LOADER,
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  };
export const getBranchesR =
  data => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    dispatch({
      type: SHOW_LOADER,
    });
    await mainServics
      .getBranches(data)
      .then(async res => {
        await dispatch(getAddBranches(res.data));
        dispatch({
          type: HIDE_LOADER,
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  };

export const getVendorProductR =
  data => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    dispatch({
      type: SHOW_LOADER,
    });
    await mainServics
      .getVendorProducts(data)
      .then(async res => {
        await dispatch(getAddVendorProductR(res.data));
        dispatch({
          type: HIDE_LOADER,
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  };

export const getVendorBusinessProfileR =
  () => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    dispatch({
      type: SHOW_LOADER,
    });
    await mainServics
      .getVendorBusinessProfile()
      .then(async res => {
        await dispatch(addVendorBusinessProfile(res.data));
        dispatch({
          type: HIDE_LOADER,
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  };

export const getVendorAccountDetials =
  () => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    dispatch({
      type: SHOW_LOADER,
    });
    await mainServics
      .getVendorBankAccount()
      .then(async res => {
        await dispatch(addVendorAccountDetials(res.data));
        dispatch({
          type: HIDE_LOADER,
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  };
export const getVendorOrderHistory =
  () => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    dispatch({
      type: SHOW_LOADER,
    });
    await mainServics
      .getVendorOrderHistory()
      .then(async res => {
        await dispatch(addVendorOrderHistory(res.data));
        console.log('vendor Orders', res, "====")
        dispatch({
          type: HIDE_LOADER,
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  };
