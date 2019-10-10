import config from '../../config';

import { dateFormat } from '../../util/date';

const CHAT = (opt) => {
  return {
    type: config.TYPE.CHAT,
    userName: opt.userName,
    userId: opt.userId,
    msg: opt.msg,
    createdAt: opt.createdAt,
  };
};

const chatLog = (data) => `${data.userName}|${data.msg}|${dateFormat('2013-06-01T00:00:00')}`;
const chatLogKey = (id) => `${id}_chatLog`;

module.exports = {
  CHAT,
  chatLog,
  chatLogKey,
};
