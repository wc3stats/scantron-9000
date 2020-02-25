import { getGamelist } from 'scantron/w3s';
import Message from 'scantron/Message';
import Module from 'scantron/Module';

/**
 * Watches https://api.wc3stats.com/gamelist for games and makes a post when
 * a subscription is matched. The post is edited during the lifetime of the game.
 */
class GameWatcher extends Module
{
  constructor (client, config)
  {
    super (client, config);

    this.requireKeys ([
      'updateInterval',
      'subscriptions'
    ]);

    /**
     * Map from gameId to messages.
     */
    this.messages = {};
  }

  async run ()
  {
    setInterval (
      this.updateLoop.bind (this),
      this.config.updateInterval
    );
  }

  async updateLoop ()
  {
    let gamelist;
    let subscription;
    let pattern;
    let message;
    let game;
    let gameIds;

    gameIds  = {};
    gamelist = await getGamelist ();

    /** **/

    for (subscription of this.config.subscriptions) {
      for (pattern of subscription.patterns) {
        /**
         * Does any pattern for this channel match one of the games?
         */
        for (let game of gamelist) {
          /**
           * Key lookups are O(1) so keep a map of gameIds so we know what to
           * delete later.
           */
          gameIds [game.id] = null;

          /** **/

          if (!pattern.matches (game)) {
            continue;
          }

          if (! (game.id in this.messages)) {
            message = new Message (
              subscription,
              game
            );

            /** **/

            if (await message.create ()) {
              this.messages [game.id] = message;
            }

          } else {
            message = this.messages [game.id];
            await message.update (game)
          }
        }
      }
    }

    /**
     * Do we need to delete anything?
     */
    for (let gameId in this.messages) {
      /**
       * Does game still exist in gamelist?
       */
      if (gameId in gameIds) {
        continue;
      }

      message = this.messages [gameId];

      await message.delete ();

      delete this.messages [gameId];
    }
  }

  async destroy ()
  {
    for (let gameId in this.messages) {
      await this.messages [gameId].erase ();
    }
  }
}

module.exports = GameWatcher;