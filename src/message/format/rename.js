import config from '../../config';

const RENAME = (opt) => {
  return {
    type: config.TYPE.RENAME,
    roomId: opt.roomId,
    userId: opt.userId,
    userName: opt.userName,
  };
};

module.exports = RENAME;
