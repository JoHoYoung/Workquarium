import config from '../../config';

const RENAME = (opt) => {
  return {
    type: config.TYPE.RENAME,
    roomId: opt.roomId,
    userId: opt.userId,
    name: opt.name,
  };
};

module.exports.default = RENAME;
