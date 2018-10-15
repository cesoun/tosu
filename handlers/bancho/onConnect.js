// Bancho Connect. Optionally join a channel.
module.exports = function onConnect() {
  console.log(`* Connected to ${this.options.host}:${this.options.port}`)
  // this.join('#osu')
}
