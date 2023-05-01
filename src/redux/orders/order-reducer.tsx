import {ORDER_HISTORY} from './constants';
import {OrderState} from './OrderState';

const INITIAL_STATE = new OrderState();

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case ORDER_HISTORY: {
      return {
        ...state,
        orderHistory: action.payload,
      };
    }

    default:
      return state;
  }
}
