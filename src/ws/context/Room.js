const uid = require('uid');
const EventEmitter = require('events');
const fs = require('fs');
const Message = require('../../message');
const Rooms = {};

import redis from '../../lib/redis';

// function base64Encode(file) {
//   // read binary data
//   const bitmap = fs.readFileSync(file);
//   return Buffer.from(bitmap).toString('base64');
// }
class Room extends EventEmitter {
  static idx = 0;

  // Image, Html, in memeory? or where?
  constructor(opt) {
    super();

    this.clients = {};
    this.units = {};

    this.nums = 0;
    this.running = false;
    this.id = opt.id;
    this.name = opt.name;
    this.share = 0;
    this.cronFire = null;

    this.broadcast = this.broadcast.bind(this);
    this.init = this.init.bind(this);
    this.enterClient = this.enterClient.bind(this);
    this.leaveClient = this.leaveClient.bind(this);

    this.on('message', this.onMessage);
    this.on('end', this.init);
  }

  onMessage = (data) => {
    this.broadcast('message', data);
  };

  broadcastUnit = (action, data) => {
    for (const key in this.units) {
      if (this.units.hasOwnProperty(key)) {
        this.units[key].socket.emit(action, JSON.stringify(data));
      }
    }
    // # TODO this data queueing (for send to new user enter)
    redis.rpush(`${this.id}_LOG`, data.toString())
  };

  broadcast = (action, data) => {
    for (const key in this.clients) {
      if (this.clients.hasOwnProperty(key)) {
        this.clients[key].socket.emit(action, JSON.stringify(data));
      }
    }
    // # TODO this data queueing (for send to new user enter)
    redis.rpush(`${this.id}_log`, data.toString())
  };

  init = () => {
    redis.del(`${this.id}_log`);
    redis.del(`${this.id}_docs`);
    redis.del(`${this.id}_docs_action`);

    this.clients = {};
    this.nums = 0;
    this.share = 0;

    delete Rooms[this.name];

    this.id = uid('10');
    this.name = uid('10');
    Rooms[this.name] = this;
    this.running = false;
  };

  enterUnit = (u) => {
    this.units[u.clientId] = u;
    // 팝업..
    // 크킄ㅋ.ㅋ.

  };

  // #TODO 중간에 새로 들어오면 그간의 채팅기록, 문서정보.. 등의 로그도 새로운 유저에게 전달해 줘야함.
  enterClient = async (c) => {
    this.clients[c.id] = c;
    this.nums += 1;
    // 방 종료타이머 초기화
    if (this.cronFire) {
      clearTimeout(this.cronFire);
      this.cronFire = null;
    }

    if (this.nums > 1) {
      this.running = true;

      // #TODO send log to new user
      let logs = await redis.lrange(`${this.id}_log`);
      if(logs.length>0){
        for(let i=0;i<logs;i++) {
          c.send(logs[i]);
        }
      }
      this.broadcast('message', Message.ENTER({userId: c.id}));
    }
  };

  leaveUnit = (clientId) => {
    if(this.units[clientId]){
      delete this.units[clientId];
    }
  };

  leaveClient = (id) => {
    if (this.clients[id]) {
      delete this.clients[id];
      this.leaveUnit(id);
      this.nums -= 1;
    }
    // 5분후, 방 파기
    if (this.num === 0) {
      this.cronFire = setTimeout(() => {
        redis.del(`${this.id}_log`);
        this.init();
      },5분);
    }
  }
}

module.exports = {
  Room,
  Rooms,
};
