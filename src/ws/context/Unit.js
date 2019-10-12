// import redis from '../../lib/redis';
import { unitHandlerFactory }from '../../message'
class Unit {
  constructor(opt) {
    this.socket = opt.socket;
    this.clientId = opt.clientId;
    this.Room = opt.Room;

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
    unitHandlerFactory(data.type)(data,this);
  };

  disconnect = () => {
    if (this.Room) {
      this.Room.leaveUnit(this.clientId);
    }
  };
}

module.exports = {
  Unit
};