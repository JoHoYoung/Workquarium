import redis from '../../lib/redis';

const highlightHandler = (data, unit) => {
  redis.rpush(`${unit.Room.id}_docs_action`,data);
};

module.exports = {
  highlightHandler,
};