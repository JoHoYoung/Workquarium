const renameHandler = (data, client) => {
  client.name = data.name;
  client.Room.broadcast("message",data);
};

module.exports = {
  renameHandler,
};
