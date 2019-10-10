import config from '../../config';

const HIGHLIGHT = (opt) => {
  return {
    type: config.TYPE.HIGHLIGHT,
    htmlId: opt.htmlId,
  };
};

module.exports = HIGHLIGHT;
