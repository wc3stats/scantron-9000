import path from 'path';
import { isset, inArray } from 'scantron/util';
import { logger } from 'scantron/logger';
import { matches } from 'scantron/discord';
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

        console.log (res);
      }
    });
  }
}

module.exports = ReplayWatcher;