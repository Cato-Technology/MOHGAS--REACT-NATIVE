import {HIDE_LOADER, SHOW_LOADER} from '../event/constants';

import {SupportResponse} from '../types';
import {ACCOUNT_REALTED_ISSUES, SUPPORT} from './constants';
import {mainServics} from '../../services';

export const addGetSupportData = (data: SupportResponse) => ({
  type: SUPPORT,
  payload: data,
});
export const addGetSupportAccountRelatedIssues = (data: SupportResponse) => ({
  type: ACCOUNT_REALTED_ISSUES,
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
