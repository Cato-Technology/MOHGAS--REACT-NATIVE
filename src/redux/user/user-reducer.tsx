import {UserState} from './UserState';
import {
  BANKDETAILS,
  BETS,
  COMPANY_BANK_DETAILS,
  DASHBOARD,
  PROFILE,
  SESSIONS,
} from './constants';

const INITIAL_STATE = new UserState();

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case DASHBOARD: {
      return {
        ...state,
        dashBoardData: action.payload,
      };
    }
    case SESSIONS: {
      return {
        ...state,
        sessionData: action.payload,
      };
    }
    case PROFILE: {
      return {
        ...state,
        profileData: action.payload,
      };
    }
    case BANKDETAILS: {
      return {
        ...state,
        bankDetialData: action.payload,
      };
    }
    case BETS: {
      return {
        ...state,
        betData: action.payload,
      };
    }
    case COMPANY_BANK_DETAILS: {
      return {
        ...state,
        companyBankDetail: action.payload,
      };
    }

    default:
      return state;
  }
}
