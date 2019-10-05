import config from '../../config';

const CHAT = (opt) => {
  return {
    type: config.TYPE.CHAT,
    user_id: opt.id,
    msg: opt.msg,
  };
};

module.exports.default = CHAT;
