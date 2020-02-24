import discord from 'discord.js';
import dict from 'scantron/dict';
import { getEmoji } from 'scantron/discord';
import { timeago, detag, datetime } from 'scantron/util';

export default class View
{
  static replay (replay)
  {
    let embed = base ()
      .setURL (`https://wc3stats.com/games/${replay.id}`)
      .setTitle (replay.data.game.name)
      .setColor (replay.data.game.hasW3MMD ? dict.colours.green : dict.colours.red)

    let body = '';

    replay
      .data
      .game
      .players
      .forEach (player => {
        let emoji = getEmoji (dict.emojis.colours [player.colour]);
        body += `<:${emoji.name}:${emoji.id}> **${player.name}** (${player.apm} APM)\n`;
      });

    embed.addField ('Players', body);
    return embed;
  }

  static game (game)
  {
    let startingSoon;
    let state;

    startingSoon = game.slotsTaken / game.slotsTotal >= .6;
    state = startingSoon ? 'yellow' : 'green';

    let embed = base ()
      .setAuthor (`Hosted ${timeago (game.created)} by ${detag (game.host)}`, `https://wc3stats.com/assets/icons/state-${state}.png`, 'https://wc3stats.com/gamelist')
      .setTitle (game.name)
      .setDescription (`
        Slots: ${game.slotsTaken} / ${game.slotsTotal}
        Server: ${dict.server [game.server]}
        Map: ${game.map}
      `)
      .setColor (dict.colours [state]);

    return embed;
  }

  static gameClosed (game)
  {
    let embed = base ()
      .setAuthor (`${game.name}`, `https://wc3stats.com/assets/icons/state-red.png`, 'https://wc3stats.com/gamelist')
      .setDescription (`Hosted by **${detag (game.host)}** on **${datetime (game.created)}**`)
      .setColor (dict.colours.red)
      .setFooter ('Powered by wc3stats.com | Closed', 'https://wc3stats.com/assets/favicon.png');;

    return embed;
  }
}

/** **/

function base ()
{
  return new discord
    .RichEmbed ()
    .setAuthor ('Warcraft III Stats', 'https://wc3stats.com/assets/favicon.png', 'https://discord.gg/N3VGkUM')
    .setTimestamp ()
    .setFooter ('Powered by wc3stats.com', 'https://wc3stats.com/assets/favicon.png');
}