/*
  Created By: Cesoun

  About:
    Takes in Twitch Chat messages looking for Osu! song links. Then messaging the online given Osu! User the song.

  Helpful Links:
    https://github.com/kiwiirc/irc-framework/tree/master/docs
    https://github.com/ppy/osu-api/wiki
    https://twitchapps.com/tmi/
    https://osu.ppy.sh/p/api
    https://osu.ppy.sh/p/irc
*/

const tmi = require('tmi.js')
const options = require('./options.json')

// TMI Events
const connectHandler = require('./handlers/onConnect')
const messageHandler = require('./handlers/onMessage')
const disconnectHandler = require('./handlers/onDisconnect')

// Settings
let opts = {
  identity: {
    username: options.username,
    password: options.token
  },
  channels: options.twitch_channels
}

// Client from Options (opts)
let client = new tmi.client(opts)

// Event Handlers
client.on('message', messageHandler)
client.on('connected', connectHandler)
client.on('disconnected', disconnectHandler)

// Connect
client.connect()
