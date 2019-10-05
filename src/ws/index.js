import { server } from '../http';
import config from '../config';
import { Room, Rooms } from './context/Room';
import { Client } from './context/Client';

const io = require('socket.io')(server);
const uid = require('uid');

const genRoom = () => {
  for (let i = 0; i < config.ROOM.NUM; i += 1) {
    const id = uid('10');
    Rooms[id] = new Room({ id: i, name: id });
  }
};

const AllocateRoom = (socket) => {
  for (const key in Rooms) {
    if (!Rooms[key].running && Rooms[key].nums < config.ROOM.USER_PER_ROOM) {
      const id = uid('10');
      const name = '';
      const c = new Client({ socket, id, name, Room: Rooms[Room.idx] });
      Rooms[key].enterClient(c);
      break;
    }
  }
};

const EnterRoom = (name, socket) => {
  const id = uid('10');
  const c = new Client({ socket, id, name, Room: Rooms[Room.idx] });
  let find = false;

  for (const key in Rooms) {
    if (key === name && Rooms.hasOwnProperty(key)) {
      Rooms[key].enterClient(c);
      c.Room = Rooms[key];
      find = true;
      break;
    }
  }

  if (!find) {
    socket.emit('message', JSON.stringify({ msg: `Invalid Room ${name}` }));
    socket.disconnect();
  }
};

const StartWs = () => {

  genRoom();

  for (const key in Rooms) {
    if (Rooms.hasOwnProperty(key)) {
      io.of(`/${key}`).on('connection', (socket) => {
        EnterRoom(key, socket);
      });
    }
  }

  io.of('/create').on('connection', (socket) => {
    AllocateRoom(socket);
  });
};

module.exports = {
  StartWs,
};
