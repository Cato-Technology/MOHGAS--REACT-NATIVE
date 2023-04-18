import {userService} from '../../services';
import {
  BANKDETAILS,
  BETS,
  COMPANY_BANK_DETAILS,
  DASHBOARD,
  PROFILE,
  SESSIONS,
} from './constants';

import {SessionResponse, DashBoardResponse, ProfileResponse} from 'types/index';
import {BankDetailResponse} from 'store/types/user/bank-details';
import {HIDE_LOADER, SHOW_LOADER} from 'store/event/constants';

export const addDashBoard = (data: DashBoardResponse) => ({
  type: DASHBOARD,
  payload: data,
});
export const addSessions = (data: SessionResponse) => ({
  type: SESSIONS,
  payload: data,
});
export const addProfile = (data: ProfileResponse) => ({
  type: PROFILE,
  payload: data,
});
export const addBankDetails = (data: BankDetailResponse) => ({
  type: BANKDETAILS,
  payload: data,
});

export const getReduxDashBoard =
  () => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    dispatch({
      type: SHOW_LOADER,
    });
    await userService
      .getDashBoard()
      .then(async res => {
        await dispatch(addDashBoard(res));
        dispatch({
          type: HIDE_LOADER,
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  };
export const getReduxSessions =
  matchId =>
  async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    await userService
      .getSessions(matchId)
      .then(async res => {
        await dispatch(addSessions(res));
      })
      .catch(err => {
        console.log('err', err);
      });
  };
export const getReduxProfile =
  () => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    await userService
      .getProfile()
      .then(async res => {
        await dispatch(addProfile(res));
      })
      .catch(err => {
        console.log('err', err);
      });
  };
export const getReduxPaymentMethods =
  () => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    await userService
      .getPaymentMethods()
      .then(async res => {
        await dispatch(addBankDetails(res));
      })
      .catch(err => {
        console.log('err', err);
      });
  };
export const getReduxBets =
  () => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    await userService
      .getBets()
      .then(async res => {
        await dispatch({type: BETS, payload: res});
      })
      .catch(err => {
        console.log('err', err);
      });
  };
export const getReduxBankDetails =
  () => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    await userService
      .getBankDetails()
      .then(async res => {
        await dispatch({type: COMPANY_BANK_DETAILS, payload: res});
      })
      .catch(err => {
        console.log('err', err);
      });
  };
