import moment from 'moment';

export interface ProfileResponse {
  _id: String;
  status: Boolean;
  email: String;
  userName: String;
  firstName: String;
  lastName: String;
  profileImage: String;
  gender: String;
  contactNumber: String;
  credit: String;
  userType: String;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
}
