import config from '../../config';

const DRAW = (opt) => {
  return {
    type: config.TYPE.DRAW,
    pos: {
      x: opt.x,
      y: opt.y,
    },
  };
};

module.exports.default = DRAW;
