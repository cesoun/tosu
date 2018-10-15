const irc = require('irc-framework')
const options = require('../options.json')

// Bancho Events
const ircReconnect = require('./bancho/onReconnect')
const ircMessage = require('./bancho/onMessage')
const ircConnect = require('./bancho/onConnect')
const ircClose = require('./bancho/onClose')

// Beatmap Helper
const btmpHelper = require('../helpers/getBeatmap')


let irc_client = new irc.Client();

// Bancho IRC Settings
irc_client.connect({
  host: 'irc.ppy.sh',
  port: 6667,
  nick: options.osu_uname,
  password: options.osu_pwd
})

// Bancho IRC Handlers
irc_client.on('reconnecting', ircReconnect)
irc_client.on('registered', ircConnect)
irc_client.on('close', ircClose)
irc_client.on('message', ircMessage)


// onMessageHandler
module.exports = function onMessageHandler (target, context, msg, self)
{

  // Ignore any own messages.
  if (self) { return }

  // Check if there is an Osu! Link.
  if (msg.includes(options.prefix))
  {
    let tMessage = msg.split(" ")

    for (var i = 0; i < tMessage.length; i++)
    {
      if (tMessage[i].includes(options.prefix))
      {
        btmpHelper(tMessage[i], irc_client, context)
        break;
      }
    }
  }
  else { return }
}
