import config from '../../config';
const END = (opt) => {
  return {
    type: config.TYPE.END,
    room_id: opt.id,
  };
};

module.exports.default = END;
