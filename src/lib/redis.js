import config from '../config';
const redis = require('redis');

class Redis {
  constructor() {
    this.conn = redis.createClient({
      host: config.REDIS.HOST,
      port: config.REDIS.PORT,
    });
  }

    getAll = async (key) => {
    return new Promise((resolve, reject) => {
      this.conn.hgetall(key, (err, temp) => {
        if(err){
          resolve([]);
        }
        resolve(temp);
      });
    });
    };

    get = async (key) => {
      return new Promise((resolve,reject) => {
        this.conn.get(key, (err, temp) => {
          if(err){
            resolve("")
          }
          resolve(temp);
        });
      });
    };

    lrange = async (key) => {
      return new Promise((resolve, reject) => {
        this.conn.lrange(key, 0, -1, (err, temp) => {
          if(err){
            resolve([]);
          }
          resolve(temp);
        });
      });
    };

    set = (key, value) => {
      this.conn.set(key, value, (err, temp) => {
        return temp;
      });
    };

    hmset = (key, value) => {
      this.conn.hmset(key, value, (err, temp) => {
        return temp;
      });
    };

    rpush = (key, value) => {
      this.conn.rpush(key, value, (err, temp) => {
        if(err){
          console.log(err);
        }
        console.log(temp);
        return temp;
      });
    };

    del = (key) => {
      this.conn.del(key, (err, temp) => {
        return temp;
      });
    }
}

module.exports = new Redis();
