import config from '../config';

import { server } from '../v1';
import { Room, Rooms } from './context/Room';
import { Client } from './context/Client';
import { Unit } from './context/Unit';

import { CREATE, REJECT } from '../message'

const io = require('socket.io')(server, {transports:['websocket']});
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
      socket.send(CREATE({id:key}));
      break;
    }
  }
};

const EnterRoom = (key, socket) => {
  const id = uid('10');
  let find = false;

  for (const roomId in Rooms) {
    if (key === roomId && Rooms.hasOwnProperty(roomId)) {
      const c = new Client({ socket, id, name: socket.handshake.query.name, Room: Rooms[roomId] });
      Rooms[roomId].enterClient(c);
      c.Room = Rooms[roomId];
      find = true;
      break;
    }
  }

  if (!find) {
    socket.emit('message', JSON.stringify(REJECT({msg:"Invalid Room Id"})));
    socket.disconnect();
  }
};

const EnterUnit = (key, socket) => {
  let find = false;
  for (const roomId in Rooms) {
    if (key === roomId && Rooms.hasOwnProperty(roomId)) {
      const u = new Unit({ socket, clientId:socket.handshake.query.name, Room: Rooms[roomId] });
      Rooms[roomId].enterUnit(u);
      c.Room = Rooms[roomId];
      find = true;
      break;
    }
  }

  if (!find) {
    socket.emit('message', JSON.stringify(REJECT({msg:"Invalid Room Id"})));
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

      io.of(`/unit/${key}`).on('connection', (socket) => {
        EnterUnit(key, socket);
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
