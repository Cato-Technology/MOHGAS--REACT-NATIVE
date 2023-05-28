import {ACCOUNT_REALTED_ISSUES, SUPPORT} from './constants';
import {GlobalState} from './GlobalState';

const INITIAL_STATE = new GlobalState();

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case SUPPORT: {
      return {
        ...state,
        supportData: action.payload,
      };
    }
    case ACCOUNT_REALTED_ISSUES: {
      return {
        ...state,
        accountRealtedIssues: action.payload,
      };
    }

    default:
      return state;
  }
}
