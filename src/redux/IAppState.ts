import {OrderState} from './orders/OrderState';
import {UserState} from './user/UserState';

export interface IAppState {
  order: OrderState;
  user: UserState;
}
