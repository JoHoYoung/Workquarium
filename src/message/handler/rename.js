const renameHandler = (data, client) => {
  client.name = data.name;
};

module.exports = {
  renameHandler,
};
