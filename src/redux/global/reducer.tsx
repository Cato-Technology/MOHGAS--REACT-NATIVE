import {
  ACCOUNT_REALTED_ISSUES,
  BRANCHES,
  BUSINESS_PROFILE,
  PRODUCTS,
  SUPPORT,
} from './constants';
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
    case BRANCHES: {
      return {
        ...state,
        branches: action.payload,
      };
    }
    case PRODUCTS: {
      return {
        ...state,
        vendorProducts: action.payload,
      };
    }
    case BUSINESS_PROFILE: {
      return {
        ...state,
        businessProfileData: action.payload,
      };
    }
    default:
      return state;
  }
}
