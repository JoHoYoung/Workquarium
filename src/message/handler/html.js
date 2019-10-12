import config from '../../config';
import redis from '../../lib/redis';

const imageHandler = (data, client) => {
  // Set images id when user 1st share image.
  if (client.Room.share > config.ROOM.MAX_SHARE) {
    client.send('message', {
      type: config.TYPE.REJECT,
      msg: "Exceed max share limit",
    });
  } else {
    client.Room.share += 1;
    redis.rpush(`${this.Room.id}_docs`,JSON.stringify(data));
    client.Room.broadcast('message', {
      id: uid('10'),
      userId: client.id,
      src: data.src,
    });
  }
};


module.exports = {
  imageHandler
};