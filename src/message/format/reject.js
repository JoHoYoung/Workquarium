import config from '../../config'

const REJECT = (opt) => {
  return {
    type:config.TYPE.REJECT,
    msg:opt.msg,
  }
};

module.exports = REJECT;