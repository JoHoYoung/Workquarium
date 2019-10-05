import config from '../../config';

const CHAT = (opt) => {
  return {
    type: config.TYPE.CHAT,
    userId: opt.userId,
    msg: opt.msg,
  };
};

module.exports = CHAT;
