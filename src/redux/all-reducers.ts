import {combineReducers} from 'redux';
//import {authReducer} from './auth/auth-reducer';
import userReducer from './user/user-reducer';
import eventReducer from './event/event-reducer';
import orderReducer from './orders/order-reducer';

export const allReducers = combineReducers({
  // auth: authReducer,
  event: eventReducer,
  user: userReducer,
  order: orderReducer,
});
export default allReducers;
