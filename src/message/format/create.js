import config from '../../config';

const CREATE = (opt) => {
  return {
    type: config.TYPE.CREATE,
    roomId: opt.id,
  }
};

module.exports = CREATE;