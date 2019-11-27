import path from 'path';
import { isset, inArray } from 'scantron/util';
import { logger } from 'scantron/logger';
import { matches } from 'scantron/discord';
import { upload } from 'scantron/w3s';
import Module from 'scantron/Module';
import View from 'scantron/View';

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

    this.client.on (
      'message',
      this
        .messageHandler
        .bind (this)
    );
  }

  async messageHandler (message)
  {
    if (
      message.attachments.length <= 0 ||
      !matches (message, this.config.watch)
    ) {
      return;
    }

    for (let attachment of message.attachments.values ()) {
        if (
          !inArray (
            path.extname (attachment.filename),
            this.config.allowedExtensions
          )
        ) {
          return;
        }

        let res = await upload (attachment.url);
        let embed = View.replay (res.body);

        if (!embed) {
          logger.error (`Failed to create view for replay upload response.`);
        }

        message
          .channel
          .send (embed);
    }
  }
}

module.exports = ReplayWatcher;