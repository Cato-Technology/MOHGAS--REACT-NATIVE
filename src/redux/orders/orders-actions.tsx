import {HIDE_LOADER, SHOW_LOADER} from '../event/constants';
import {orderServices} from '../../services/orders-services';
import {OrderHistoryResponse} from '../types/order/user_order';
import {ORDER_HISTORY, RECENT_ORDER_HISTORY} from './constants';

export const addOrderHistory = (data: OrderHistoryResponse) => ({
  type: ORDER_HISTORY,
  payload: data,
});
export const addRecentHistory = (data: OrderHistoryResponse) => ({
  type: RECENT_ORDER_HISTORY,
  payload: data,
});

export const getReduxOrderHistory =
  data => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    dispatch({
      type: SHOW_LOADER,
    });
    await orderServices
      .orderHistory(data)
      .then(async res => {
        await dispatch(addOrderHistory(res.responsedata));
        dispatch({
          type: HIDE_LOADER,
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  };
export const getReduxRecentOrderHistory =
  data => async (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    dispatch({
      type: SHOW_LOADER,
    });
    await orderServices
      .orderRecentHistory(data)
      .then(async res => {
        await dispatch(addRecentHistory(res.responsedata));
        dispatch({
          type: HIDE_LOADER,
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  };
