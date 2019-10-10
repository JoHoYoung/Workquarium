import config from '../../config';

const DRAW = (opt) => {
  return {
    type: config.TYPE.DRAW,
    imageId:opt.id,
    pos: {
      x: opt.x,
      y: opt.y,
    },
  };
};

module.exports = DRAW;
