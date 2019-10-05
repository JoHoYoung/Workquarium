import config from '../../config';

const ENTER = (opt) => {
  return {
    type: config.TYPE.ENTER,
    userId: opt.userId,
    name: '',
  };
};

module.exports.default = ENTER;
