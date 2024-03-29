import {
  ACCOUNT_REALTED_ISSUES,
  BRANCHES,
  BUSINESS_PROFILE,
  GEO_LOCATION,
  NOTIFICATION,
  ORDER_SUMMARY,
  PRODUCTS,
  SUPPORT,
  VENDOR_ACCOUNT_DETAILS,
  VENDOR_ORDER_HISTORY,
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
    case VENDOR_ACCOUNT_DETAILS: {
      return {
        ...state,
        vendorBankDetalis: action.payload,
      };
    }
    case VENDOR_ORDER_HISTORY: {
      return {
        ...state,
        vendorOrderHistory: action.payload,
      };
    }
    case ORDER_SUMMARY: {
      return {
        ...state,
        orderSummary: action.payload,
      };
    }
    case NOTIFICATION: {
      return {
        ...state,
        notificationData: action.payload,
      };
    }
    case GEO_LOCATION: {
      return {
        ...state,
        locationData: action.payload,
      };
    }
    default:
      return state;
  }
}
