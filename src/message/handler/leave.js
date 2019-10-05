const leaveHandler = (data, client) => {
  client.Room.leaveClient(client.id);
};

module.exports = {
  leaveHandler,
};