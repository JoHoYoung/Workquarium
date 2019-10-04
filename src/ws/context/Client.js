class Client{
    constructor(opt){
        this.socket = opt.socket;
        this.id = opt.id;
        this.name = opt.name;
        this.Room = opt.Room;

        this.disconnect = this.disconnect.bind(this);
        this.onMessage = this.onMessage.bind(this);

        this.socket.on("disconnect",this.disconnect);
        this.socket.on("message",this.onMessage)
    }

    onMessage = (data) => {
        this.Room.emit("message",data);
    };

    disconnect = () => {
        this.Room.leaveClient(this);
    };

}

module.exports = {
    Client
};

