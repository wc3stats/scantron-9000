import dict from 'scantron/dict';
import { getChannel } from 'scantron/discord';
import logger from 'scantron/logger';
import View from 'scantron/View';

export default class Message
{
  constructor (subscription, game)
  {
    this.subscription = subscription;

    this.channel = getChannel (
      subscription.guild,
      subscription.channel
    );

    this.game = game;
    this.post = null;
  }

  async create ()
  {
    let embed;
    let game;

    game = this.game;

    /** **/

    if (! (embed = this.getEmbed (View.game))) {
      return;
    }

    /** **/

    try {
      logger.info (`Creating game [${game.id} - ${game.name}].`);
      this.post = await this.channel.send (this.subscription.ping ? "@here" : "", embed);
    } catch (e) {
      return false;
    }

    return true;
  }

  async update (game)
  {
    let embed;

    this.game = game;

    /** **/

    if (! (embed = this.getEmbed (View.game))) {
      return;
    }

    /** **/

    try {
      logger.info (`Updating game [${game.id} - ${game.name}].`);
      await this.post.edit ('', embed);
    } catch (e) {
      return false;
    }
  }

  async delete ()
  {
    let embed;
    let game;

    game = this.game;

    /** **/

    if (! (embed = this.getEmbed (View.gameClosed))) {
      return;
    }

    /** **/

    embed.setColor (dict.colours.red);

    /** **/

    try {
      logger.info (`Deleting game [${game.id}].`);
      await this.post.edit ('', embed);
    } catch (e) {
      return false;
    }
  }

  /** **/

  getEmbed (view)
  {
    let embed;

    embed = view (this.game);

    if (!embed) {
      logger.error (`Failed to create view for gamelist.`);
      return null;
    }

    return embed;
  }
}