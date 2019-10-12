import redis from "../../lib/redis";
const uid = require('uid');
import config from '../../config';

const deleteHandler = async (data, client) => {
  // Set images id when user 1st share image;
  let docId = data.docId;
  let docs = await redis.lrange(`${client.Room.id}_docs`);
  docs = docs.map((el) => JSON.parse(el)).filter((doc) => doc.id !== docId);
  redis.del(`${client.Room.id}_docs`);

  for(let i=0;i<docs.length;i++) {
    redis.rpush(`${client.Room.id}_docs`, JSON.stringify(docs[i]));
  }
};


module.exports = {
  deleteHandler
};