import { format } from 'date-fns';
import moment from 'moment';

export const dateFormat = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'yyyy-MM-dd');
  }

  return newDate || '';
};

export const dateFormat1 = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'dd/MM/yyyy');
  }

  return newDate || '';
};

export const getTime = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'hh:mm a');
  }

  return newDate || '';
};

export const getZonedTime = (d: string, t: string) => {
  const date = new Date(d);
  const time = new Date(t);

  var slotDateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getUTCHours(),
    time.getUTCMinutes(),
    time.getUTCSeconds()
  );
  if (date) {
    var newDate: any = format(new Date(slotDateTime), 'hh:mm a', {});
  }

  return newDate || '';
};

export const getZonedTimeDate = (d: string, t: string) => {
  const date = new Date(d);
  const time = new Date(t);

  var slotDateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getUTCHours(),
    time.getUTCMinutes(),
    time.getUTCSeconds()
  );
  return slotDateTime;
};

export const isZonedTiimeIsPast = (d: string, t: string) => {
  const currentDate = new Date();
  const date = new Date(d);
  const time = new Date(t);

  var slotDateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getUTCHours(),
    time.getUTCMinutes(),
    time.getUTCSeconds()
  );
  return currentDate > slotDateTime;
};

export const getMonth = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'LLLL');
  }

  return newDate || '';
};

export const getDay = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'd');
  }

  return newDate || '';
};

export const getDayName = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'EEEE');
  }

  return newDate || '';
};

export const getYear = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'yyyy');
  }

  return newDate || '';
};

export const monthLLLDayDD = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'MMM dd');
  }

  return newDate || '';
};

export const getCalendarDate = (today: any) =>
  getMonth(today) +
  ' ' +
  getDay(today) +
  ', ' +
  getYear(today) +
  ' ' +
  getTime(today);

export const convertDate = (date: string) =>
  parseFloat(moment.parseZone(date).local().format('x'));
