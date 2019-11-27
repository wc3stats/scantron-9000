import discord from 'discord.js';
import { getEmoji } from 'scantron/discord';

export default class View
{
  static replay (replay)
  {
    let embed = base ()
      .setTitle (replay.data.game.name)
      .setColor (replay.data.game.hasW3MMD ? '#1b9601' : '#db2300')

    let body = '';

    replay
      .data
      .game
      .players
      .forEach (player => {
        let emoji = getEmoji (dict.colours [player.colour]);
        body += `<:${emoji.name}:${emoji.id}> **${player.name}** (${player.apm} APM)\n`;
      });

    embed.addField ('Players', body);
    return embed;
  }
}

/** **/

function base ()
{
  return new discord
      .RichEmbed ()
      .setURL (`https://wc3stats.com/games/${replay.id}`)
      .setAuthor ('Warcraft III Stats', 'https://wc3stats.com/assets/favicon.png', 'https://discord.gg/N3VGkUM')
      .setTimestamp ()
      .setFooter ('wc3stats.com', 'https://wc3stats.com/assets/favicon.png');
}