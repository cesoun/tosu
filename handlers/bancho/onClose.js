module.exports = function onClose() {
  console.log(`* Disconnected from: ${this.options.host}. Exceeded max Reconnect attempts / IRC Closed. (Check Host Status)`);
}
