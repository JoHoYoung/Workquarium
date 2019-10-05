import config from '../../config';

const START = (opt) => {
  return {
    type: config.TYPE.START,
    room_id: opt.room_id,
  };
};

module.exports.default = START;
