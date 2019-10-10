const chatHandler = (data, client) => {
 client.Room.broadcast('message', data);
};

module.exports = {
  chatHandler,
};
