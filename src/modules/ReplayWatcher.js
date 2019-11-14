import path from 'path';
import discord from 'discord.js';
import dict from 'scantron/dict';
import { isset, inArray, getVar } from 'scantron/util';
import { logger } from 'scantron/logger';
import { getEmoji, matches } from 'scantron/discord';
import { upload } from 'scantron/w3s';
import Module from 'scantron/Module';

/**
 * Watches channels for uploaded replay files. When a replay is detected, it
 * is uploaded to wc3stats.com and a game summary is posted.
 */
class ReplayWatcher extends Module
{
  async run ()
  {
    if (!isset (this.config, 'watch')) {
      logger.error ('Missing configuration key: [watch].');
      return;
    }

    /** **/

    let allowedExtensions = [ '.w3g' ];

    this.client.on ('message', async (message) => {
      if (message.attachments.length <= 0) {
        return;
      }

      if (!matches (message, this.config.watch)) {
        return;
      }

      for (let attachment of message.attachments.values ()) {
        if (!inArray (path.extname (attachment.filename), allowedExtensions)) {
          return;
        }

        let res = await upload (attachment.url);

        /** **/

        let embed = new discord
          .RichEmbed ()
          .setTitle (res.body.data.game.name)
          .setURL (`https://wc3stats.com/games/${res.body.id}`)
          .setAuthor ('Warcraft III Stats', 'https://wc3stats.com/assets/favicon.png', 'https://discord.gg/N3VGkUM')
          .setColor (res.body.data.game.hasW3MMD ? '#1b9601' : '#db2300')
          .setTimestamp ()
          .setFooter ('wc3stats.com', 'https://wc3stats.com/assets/favicon.png');

        let players = res.body.data.game.players;

        let body = '';

        for (let player of players) {
          let emoji = getEmoji (dict.colours [player.colour]);
          body += `<:${emoji.name}:${emoji.id}> **${player.name}** (${player.apm} APM)\n`;
        }

        embed.addField ('Players', body);

        message
          .channel
          .send (embed);
      }
    });
  }
}

module.exports = ReplayWatcher;