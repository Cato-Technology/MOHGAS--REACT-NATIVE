import moment from 'moment';

export interface UserResponse {
  _id: String;
  status: Boolean;
  email: String;
  userName: String;
  firstName: String;
  lastName: String;
  profileImage: String;
  gender: String;
  contactNumber: String;
  credit: Number;
  userType: String;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
}
