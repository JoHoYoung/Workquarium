import config from '../config';

const redis = require('redis');

// const pool= db.pool;
// Initialize Redis Client

class Redis {
  constructor() {
    this.conn = redis.createClient({
      host: config.REDIS.HOST,
      port: config.REDIS.PORT,
      password: config.REDIS.PASSWORD,
    });
  }

    getAll = async (key) => {
      return new Promise((resolve, reject) => {
        this.conn.hgetall(key, (err, temp) => {
          resolve(temp);
        });
      });
    };

    get = async (key) => {
      return new Promise((resolve, reject) => {
        this.conn.get(key, (err, temp) => {
          resolve(temp);
        });
      });
    };

    lrange = async (key) => {
      return new Promise((resolve, reject) => {
        this.conn.lrange(key, 0, -1, (err, temp) => {
          resolve(temp);
        });
      });
    };

    set = async (key, value) => {
      return new Promise((resolve, reject) => {
        this.conn.set(key, value, (err, temp) => {
          resolve(temp);
        });
      });
    };

    hmset = async (key, value) => {
      return new Promise((resolve, reject) => {
        this.conn.hmset(key, value, (err, temp) => {
          resolve(temp);
        });
      });
    };

    rpush = async (key, value) => {
      return new Promise((resolve, reject) => {
        this.conn.rpush(key, value, (err, temp) => {
          resolve(temp);
        });
      });
    };

    del = async (key) => {
      return new Promise((resolve, reject) => {
        this.conn.del(key, (err, temp) => {
          resolve(temp);
        });
      });
    }
}
