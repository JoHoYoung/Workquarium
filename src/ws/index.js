import { server } from "../http";
import config from "../config";
import {Room, Rooms} from "./context/Room";
import {Client} from "./context/Client";

const io = require("socket.io")(server);
const uid = require("uid");

function genRoom(){
    for(let i=0;i<config.ROOM.NUM;i++){
        Rooms[i] = new Room({id:i});
    }
}
function AllocateRoom(socket) {
    let cnt = 0;
    let find = false;
    while (cnt !== config.ROOM.USER_PER_ROOM) {
        if (Rooms[Room.idx].running || Rooms[Room.idx].nums > config.ROOM.USER_PER_ROOM) {
            cnt++;
            console.log(cnt);
            Room.idx++;
            continue;
        }
        find = true;
        break;
    }

    if(find){
        let id = uid("10");
        let name = "";
        let c = new Client({socket,id,name,Room:Rooms[Room.idx]});
        console.log(`ENTER at ${Room.idx}`);
        Rooms[Room.idx].enterClient(c);
    }
}

function StartWs() {
    genRoom();
    io.on("connection", (socket) => {
        AllocateRoom(socket);
    });
}

module.exports = {
    StartWs
};
