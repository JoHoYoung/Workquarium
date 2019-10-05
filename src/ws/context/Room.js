const uid = require('uid');

const EventEmitter = require('events');
const Message = require('../../message');

const Rooms = {};

class Room extends EventEmitter {
    static idx = 0;

    constructor(opt) {
      super();
      this.clients = {};
      this.nums = 0;
      this.running = false;
      this.id = opt.id;
      this.name = opt.name;

      this.broadcast = this.broadcast.bind(this);
      this.init = this.init.bind(this);
      this.enterClient = this.enterClient.bind(this);
      this.leaveClient = this.leaveClient.bind(this);

      this.on('broadcast', this.broadcast);
      this.on('message', this.onMessage);
      this.on('end', this.init);
    }

    onMessage = (data) => {
      this.broadcast('message', data);
    };

    broadcast = (action, data) => {
      for (const key in this.clients) {
        if (this.clients.hasOwnProperty(key)) {
          this.clients[key].socket.emit(action, data);
        }
      }
    };

    init = () => {

      this.clients = {};
      this.nums = 0;

      delete Rooms[this.name];
      this.name = uid('10');
      Rooms[this.name] = this;
      this.running = false;
    };

    enterClient = (c) => {
      this.clients[c.id] = c;
      this.nums += 1;
      if (this.nums > 1) {
        this.running = true;
        this.broadcast('message', Message.ENTER({ userId: c.id }));
      }
    };

    leaveClient = (id) => {
      if (this.clients[id]) {
        delete this.clients[id];
        this.nums -= 1;
      }
    }
}

module.exports = {
  Room,
  Rooms,
};
