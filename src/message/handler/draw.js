import redis from '../../lib/redis';
const drawHandler = (data, unit) => {
  redis.rpush(`${unit.Room.id}_docs_action`);
};

module.exports = {
  drawHandler,
};