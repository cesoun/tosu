// Helps get beatmap information before sending the link.
/*
 /api/get_beatmaps?k&
  s= - beatmapset_id
  b= - beatmap_id

*/

// Old Osu [No Dif.] - https://osu.ppy.sh/s/821981
// Old Osu [W. Dif.] - https://osu.ppy.sh/b/1722791&m=0
// New Osu [Always ] - https://osu.ppy.sh/beatmapsets/821981#osu/1722791

// [https://osu.ppy.sh/b/339055 Griffin Lewis - Princess of the Night]
// Just take the index 0 and the difficulty of that one...

const request = require('request')
const options = require('../options.json')

// Osu! API
const api = 'https://osu.ppy.sh/api/get_beatmaps' + options.osu_api
const url = 'https://osu.ppy.sh/b/'

function getBeatmapInfo(dif, set, irc_client, context)
{
  if (dif === false)
  {
    request(api + `s=${set}`, { json: true }, (err, res, body) =>
    {
      if (err)
      {
        console.log(`~ Osu! API Error: ${err}`)
        return false
      }

      try
      {
        irc_client.say(options.osu_recip, `[TOSU] Twitch Request: [${url + body[0].beatmap_id} ${body[0].artist} - ${body[0].title}], from user: ${context.username}!`)
        irc_client.say(options.osu_uname, `[TOSU] Twitch Request: [${url + body[0].beatmap_id} ${body[0].artist} - ${body[0].title}], from user: ${context.username}!`)
        
        console.log(`\t << Request from: ${context.username} processed.`)
      } catch (e)
      {
        console.log(`~ Request Error. Catching and skipping. (Possible Crash Attempt)`);
      }

      return
    })
  }
  else
  {
    request(api + `b=${dif}`, { json: true }, (err, res, body) =>
    {
      if (err)
      {
        console.log(`~ Osu! API Error: ${err}`)
        return false
      }

      try
      {
        irc_client.say(options.osu_recip, `[TOSU] Twitch Request: [${url + body[0].beatmap_id} ${body[0].artist} - ${body[0].title}], from user: ${context.username}!`)
        irc_client.say(options.osu_uname, `[TOSU] Twitch Request: [${url + body[0].beatmap_id} ${body[0].artist} - ${body[0].title}], from user: ${context.username}!`)
        
        console.log(`\t << Request from: ${context.username} processed.`)
      } catch (e)
      {
        console.log(`~ Request Error. Catching and skipping. (Possible Crash Attempt)`);
      }

      return
    })
  }
}

module.exports = function getBeatmap(songLink, irc_client, context)
{
  let link = songLink.replace(options.prefix, '')
  let dif = ''
  let set = ''

  if (link.includes('beatmapsets/'))
  {
    link = link.replace('beatmapsets/', '')
    dif = link.substring(link.lastIndexOf('/') + 1, link.length)
    set = link.substring(0, link.lastIndexOf('#'))

    getBeatmapInfo(dif, set, irc_client, context)
    return
  }
  else if (link.includes('s/'))
  {
    set = link.replace('s/', '')

    getBeatmapInfo(false, set, irc_client, context)
    return
  }
  else if (link.includes('b/'))
  {
    link = link.replace('b/', '')
    dif = link.substring(0, link.lastIndexOf('&'))

    getBeatmapInfo(dif, false, irc_client, context)
    return
  }
  else
  {
    console.log(`~ Unknown link: ${songLink}. Skipping...`);
    return false
  }
}
