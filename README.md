## WORKQUARIUM
* * *
#### 네이버 웨일 확장앱 콘테스트 2019

<img width="100%" alt="Screen Shot 2019-11-01 at 9 57 16" src="https://user-images.githubusercontent.com/37579650/67995497-06bb3b00-fc8e-11e9-91de-9dae6b78ff46.png">

#### Express + SocketIo + Redis

* 유저는 링크를 생성해 방을 만들거나 방에 입장 할 수 있다.
```
  io.of('/create').on('connection', (socket) => {
    AllocateRoom(socket);
  });
```
* 방을 만들면 고유 ID를 제공하고, 해당 ID로 방을 구별한다.
```
      const c = new Client({ socket, id, name, Room: Rooms[Room.idx] });
      Rooms[key].enterClient(c);
      socket.send(CREATE({id:key}));
```
* 유저는 고유 ID를 통해 특정방에 입장 할 수 있다.
```
    io.of(`/${key}`).on('connection', (socket) => {
            EnterRoom(key, socket);
    });
.
.
.
      const c = new Client({ socket, id, name: socket.handshake.query.name, Room: Rooms[roomId] });
      Rooms[roomId].enterClient(c);
      c.Room = Rooms[roomId];
     
```

