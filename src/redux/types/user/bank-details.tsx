import moment from 'moment';

export interface BankDetailResponse {
  _id: String;
  userId: String;
  bankName: String;
  accountTitle: String;
  accountNumber: String;
  accountType: String;
  ifscCode: String;
  branch: String;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
}
