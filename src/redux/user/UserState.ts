import {DashBoardResponse, ProfileResponse, SessionResponse} from 'types/index';

export class UserState {
  dashBoardData: DashBoardResponse[] = [];
  sessionData: SessionResponse[] = [];
  profileData: ProfileResponse[] = [];
  bankDetialData: ProfileResponse[] = [];
  betData = {};
  companyBankDetail = [];
}
