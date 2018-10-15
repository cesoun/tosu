let count = 1;

module.exports = function onReconnect() {
  console.log(`* Disconnected from: ${this.options.host}, Attempting Reconnect #${count}...`);
  count++;
}
