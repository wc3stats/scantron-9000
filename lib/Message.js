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

    this.colours = {
      open    : 'green',
      closing : 'yellow',
      closed  : 'red',
      started : 'purple'
    };

    if ('colours' in subscription) {
      this.colours.open    = subscription.colours.open || this.colours.open;
      this.colours.closing = subscription.colours.closing || this.colours.closing;
      this.colours.closed  = subscription.colours.closed || this.colours.closed;
      this.colours.started = subscription.colours.started || this.colours.started;
    }

    this.sidebar = subscription.sidebar || null;
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
      logger.error (e);
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
      logger.error (e);
      return false;
    }
  }

  async delete ()
  {
    let embed;
    let game;

    game = this.game;

    if (this.subscription.clean) {
      return this.erase ();
    }

    /** **/

    if (! (embed = this.getEmbed (View.gameClosed))) {
      return;
    }

    /** **/

    try {
      logger.info (`Deleting game [${game.id}].`);
      await this.post.edit ('', embed);
    } catch (e) {
      logger.error (e);
      return false;
    }
  }

  async erase ()
  {
    try {
      logger.info (`Erasing game [${this.game.id}].`);
      await this.post.delete ();
    } catch (e) {
      logger.error (e);
      return false;
    }
  }

  /** **/

  getEmbed (view)
  {
    let embed;

    embed = view (this.game, this.colours, this.sidebar);

    if (!embed) {
      logger.error (`Failed to create view for gamelist.`);
      return null;
    }

    return embed;
  }
}