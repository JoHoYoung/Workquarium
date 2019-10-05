import config from '../../config';

const START = (opt) => {
  return {
    type: config.TYPE.START,
    roomId: opt.roomId,
  };
};

module.exports = START;
