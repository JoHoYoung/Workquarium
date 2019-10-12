import { handlerFactory } from '../../message';

class Client {
  constructor(opt) {
    this.socket = opt.socket;
    this.id = opt.id;
    this.name = opt.name;
    this.Room = opt.Room;
    this.type = opt.type;

    this.disconnect = this.disconnect.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.send = this.send.bind(this);

    this.socket.on('disconnect', this.disconnect);
    this.socket.on('message', this.onMessage);
  }

  send = (data) => {
    this.socket.emit('message',JSON.stringify(data));
  };

  // when client send message to server.
  onMessage = (data) => {
    data = JSON.parse(data);
    handlerFactory(data.type)(data, this);
  };

  disconnect = () => {
    if (this.Room) {
      this.Room.leaveClient(this.id);
    }
  };
}

module.exports = {
  Client,
};
