// onDisconnectedHandler
module.exports = function onDisconnectedHandler (reason) {
  console.log(`* Disconnected: ${reason}`);
  process.exit(1)
}
