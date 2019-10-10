const moment = require('moment-timezone');

const TIMEZONE = 'Asia/Seoul';
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

function getUTCTimes() {
  return moment.utc().format();
}

function getUTCStateTimes(time) {
  return moment(time).utc().tz(TIMEZONE).format();
}

function dateFormat(format) {
  return moment(getUTCStateTimes()).format(format);
}

function recentDays(before) {
  return moment(getUTCTimes()).subtract(before, 'days');
}

function recentHours(before) {
  return moment(getUTCTimes()).subtract(before, 'hours');
}

function recentMinutes(before) {
  return moment(getUTCTimes()).subtract(before, 'minutes');
}

function formatTime(time, format) {
  return moment(time).format(format);
}

const commonDate = (time) => formatTime(time, 'll');

function fromNow(date) {
  return moment(date).fromNow();
}


export {
  SECOND, MINUTE, HOUR, DAY,
  getUTCTimes,
  getUTCStateTimes,
  dateFormat,
  formatTime,
  recentDays,
  recentHours,
  recentMinutes,
  fromNow,
  commonDate,
};
