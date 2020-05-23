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
    let gamelist = await getGamelist ();

    for (let subscription of this.config.subscriptions) {
      for (let pattern of subscription.patterns) {
        for (let game of gamelist) {
          let key = `${subscription.channel}-${game.id}`;

          if (!pattern.matches (game)) {
            continue;
          }

          // console.log (key);
          // console.log (Object.keys (this.messages));

          if (! (key in this.messages)) {
            // New Message.
            let message = new Message (
              subscription,
              game
            );

            await message.create ();
            this.messages [key] = message;
          } else {
            let message = this.messages [key];
            await message.update (game);
          }
        }
      }

      let gameIds = gamelist.map (g => g.id);

      for (let key in this.messages) {
        let message = this.messages [key];

        if (!gameIds.includes (message.game.id)) {
          await message.delete ();
          delete this.messages [key];
        }
      }
    }
  }

  async destroy ()
  {
    for (let key in this.messages) {
      await this.messages [key].erase ();
    }
  }
}

module.exports = GameWatcher;