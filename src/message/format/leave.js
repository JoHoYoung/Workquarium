import config from '../../config';

const LEAVE = (opt) => {
  return {
    type: config.TYPE.END,
    roomId: opt.roomId,
    userId: opt.userId,
  };
};

module.exports = LEAVE;
