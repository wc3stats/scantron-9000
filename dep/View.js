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

  static game (game, colours, sidebar)
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
      .setColor (sidebar || dict.colours [state]);

    return embed;
  }

  static gameClosed (game, colours, sidebar)
  {
    let started;
    let state;

    started = game.slotsTaken / game.slotsTotal >= .8;
    state = started ? colours.started : colours.closed;

    let now  = Math.floor (Date.now () / 1000);
    let diff = now - game.created;

    let h = Math.floor (diff / 3600);
    let m = Math.floor (diff / 60) % 60;
    let s = diff % 60;

    let r = '';

    if (h > 0) {
      r += `${h} hour${h !== 1 ? 's' : ''} `;
    }

    if (m > 0) {
      r += `${m} minute${m !== 1 ? 's' : ''}`;
    }

    r = r.trim ();

    if (!r.length) {
      r += `${s} second${s !== 1 ? 's' : ''}`;
    }

    let embed = base ()
      .setAuthor (`${game.name}`, `https://wc3stats.com/assets/icons/state-${state}.png`, 'https://wc3stats.com/gamelist')
      .setDescription (`
        Hosted by **${detag (game.host)}** on **${date (game.created)}**
        ${r.length ? `Lobby was open for **${r}**` : ''}
      `.trim ())
      .setFooter (`Powered by wc3stats.com | ${started ? 'Started' : 'Closed'}`, 'https://wc3stats.com/assets/favicon.png')
      .setColor (sidebar || dict.colours [state]);

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