import discord from 'discord.js';
import dict from 'scantron/dict';
import { getEmoji } from 'scantron/discord';
import { timeago, detag, date } from 'scantron/util';

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

  static game (game, colours)
  {
    let startingSoon;
    let state;

    startingSoon = game.slotsTaken / game.slotsTotal >= .6;
    state = startingSoon ? colours.closing : colours.open;

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

  static gameClosed (game, colours)
  {
    let started;
    let state;

    started = game.slotsTaken / game.slotsTotal >= .8;
    state = started ? colours.started : colours.closed;
    console.log (dict.colours [state]);
    let embed = base ()
      .setAuthor (`${game.name}`, `https://wc3stats.com/assets/icons/state-${state}.png`, 'https://wc3stats.com/gamelist')
      .setDescription (`Hosted by **${detag (game.host)}** on **${date (game.created)}**`)
      .setFooter (`Powered by wc3stats.com | ${started ? 'Started' : 'Closed'}`, 'https://wc3stats.com/assets/favicon.png')
      .setColor (dict.colours [state]);

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