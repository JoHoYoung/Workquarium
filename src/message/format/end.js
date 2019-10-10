import config from '../../config';

const END = (opt) => {
  return {
    type: config.TYPE.END,
    roomId: opt.roomId,
  };
};

module.exports = END;
