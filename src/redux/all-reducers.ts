import {combineReducers} from 'redux';
//import {authReducer} from './auth/auth-reducer';
import eventReducer from './event/event-reducer';
import orderReducer from './orders/order-reducer';
import globalReducer from './global/reducer';

export const allReducers = combineReducers({
  // auth: authReducer,
  event: eventReducer,
  order: orderReducer,
  global: globalReducer,
});
export default allReducers;
