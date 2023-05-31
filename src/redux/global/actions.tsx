import {HIDE_LOADER, SHOW_LOADER} from '../event/constants';

import {
  BranchesResponse,
  SupportResponse,
  VendorProductResponse,
} from '../types';
import {ACCOUNT_REALTED_ISSUES, BRANCHES, PRODUCTS, SUPPORT} from './constants';
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
export const getSupportData =
  data => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    dispatch({
      type: SHOW_LOADER,
    });
    await mainServics
      .getSupportHelpTopics(data)
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
  data => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    dispatch({
      type: SHOW_LOADER,
    });
    await mainServics
      .getSupportAccountRelatedIssues(data)
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
