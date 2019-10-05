import {server} from "../http";
import config from "../config";
import {Room, Rooms} from "./context/Room";
import {Client} from "./context/Client";

const io = require("socket.io")(server);
const uid = require("uid");

function genRoom() {
    for (let i = 0; i < config.ROOM.NUM; i++) {
        let id = uid("10");
        console.log(id);
        Rooms[id] = new Room({id: i, name: id});
    }
}

function AllocateRoom(socket) {
    for (let key in Rooms) {
        if (!Rooms[key].running && Rooms[key].nums < config.ROOM.USER_PER_ROOM) {
            let id = uid("10");
            let name = "";
            let c = new Client({socket, id, name, Room: Rooms[Room.idx]});
            console.log(`ENTER at ${Rooms[key].name}`);
            Rooms[key].enterClient(c);
            break;
        }
    }
}

function EnterRoom(name, socket) {
    let id = uid("10");
    let c = new Client({socket, id, name, Room: Rooms[Room.idx]});
    let find = false;
    for (let key in Rooms) {
        if (key === name && Rooms.hasOwnProperty(key)) {
            Rooms[key].enterClient(c);
            c.Room = Rooms[key];
            find = true;
            break;
        }
    }
    if (!find) {
        socket.emit("message", JSON.stringify({msg: `Invalid Room ${name}`}));
        socket.disconnect();
    }
}

function StartWs() {

    genRoom();

    for (let key in Rooms) {
        if (Rooms.hasOwnProperty(key)) {
            console.log("SET ",key);
            io.of(`/${key}`).on("connection", (socket) => {
                console.log(`enter ${key}`);
                EnterRoom(key, socket);
            });
        }
    }

    io.of(`/create`).on("connection", (socket) => {
        console.log("CREATE");
        AllocateRoom(socket);
    });

}

module.exports = {
    StartWs
};
