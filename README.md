## WORKQUARIUM
* * *
#### 네이버 웨일 확장앱 콘테스트 2019
##### 다른 도구의 도움 없이 협업을 제공하는 웨일 확장 앱. 사용자는 동일한 이미지와 HTML을 실시간으로 보면서 확장된 앱으로 실시간 채팅을 할 수 있으며 캔버스 기능을 사용할 수 있다.

<img width="100%" alt="Screen Shot 2019-11-01 at 9 57 16" src="https://user-images.githubusercontent.com/37579650/67995497-06bb3b00-fc8e-11e9-91de-9dae6b78ff46.png">

### BACKEND | Express + SocketIo + Redis


#### 유저간 Websocket 통신.
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
* 모든 메세지에는 타입이 있으며 각 메세지의 타입별로 행동을 정의하고, 타입을 팩토리로 넘겨 처리한다.
```
class Client {
.
.
.
  onMessage = (data) => {
    data = JSON.parse(data);
    handlerFactory(data.type)(data, this);
  };
  .
  .
  .
}
```
* Type (config.js)
```
  TYPE: {
    CHAT: 700,
    DRAW: 701,
    END: 702,
    ENTER: 703,
    HIGHLIGHT: 704,
    LEAVE: 705,
    RENAME: 706,
    START: 707,
    IMAGE: 708,
    HTML: 709,
    DELETE: 710,
    REJECT: 711,
    CREATE:712,
  },
```
#### 유저들의 작업이 끝난 방 초기화
* 유저들이 모두 나가면 방 작업이 끝난것으로 판단하고, 다른 유저들이 사용할 수 있게 초기화 한다.
* 초기화는 Redis에 저장했던 로그, Room 클래스 인스턴스를 초기화한다
```
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
```
* 모든 유저가 네트워크 오류로 인해 나가졌을 것을 대비해, 5분후에 초기화 하고, 다시들어오면 초기화 작업을 취소한다.
```
 // 5분후, 방 파기
    if (this.num === 0) {
      this.cronFire = setTimeout(() => {
        redis.del(`${this.id}_log`);
        this.init();
      });
    }
    .
    .
    .
 // 유저 다시 접속할시,
    if (this.cronFire) {
       clearTimeout(this.cronFire);
       this.cronFire = null;
     }
```

#### 유저 기록 로깅
* 클라이언트단에서 서버로 보내는 메세지는 모두 Redis에 저장한다.
* 저장된 데이터는 늦게 들어온 유저에게 동기화의목적, 또는 채팅로그 export의 목적으로 사용한다.
* 모든 메세지는 Room을 타고 전달되므로, Broadcast되는 시점에 Redis에 저장한다
```
  broadcast = (action, data) => {
    for (const key in this.clients) {
      if (this.clients.hasOwnProperty(key)) {
        this.clients[key].socket.emit(action, JSON.stringify(data));
      }
    }
    // # TODO this data queueing (for send to new user enter)
    redis.rpush(`${this.id}_log`, data.toString())
  };
```
* 로그를 기반으로 채팅기록 export를 제공한다.
```
router.post('/get', async (req, res) => {
  const roomId = req.body.roomId;
  let logs = await redis.lrange(`${roomId}_log`);
  if(logs.length > 0){
    let output = "";
    logs = logs.map((el) => JSON.parse(el)).filter((data) => data.type === config.TYPE.CHAT);
    for(let i=0;i<logs.length;i++){
      let json = JSON.parse(logs[i]);
      output += `${json.userName}|${json.msg}|${json.createdAt}\n`
    }
    res.setHeader('Content-type', "application/octet-stream");
    res.setHeader('Content-disposition', 'attachment; filename=log.txt');
    res.send(output);
    res.end();
  }else{
    res.write("NONE");
    res.end();
  }
});

```