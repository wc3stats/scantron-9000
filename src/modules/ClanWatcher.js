import path from 'path';
import { inArray } from 'scantron/util';
import { getGuild } from 'scantron/discord';
import { updateClan } from 'scantron/w3s';
import logger from 'scantron/logger';
import Module from 'scantron/Module';

/**
 * Watches channels for uploaded replay files. When a replay is detected, it
 * is uploaded to wc3stats.com and a game summary is posted.
 */
class ClanWatcher extends Module
{
  constructor (client, config) {
    super (client, config);

    this.requireKeys ([
      'updateInterval',
      'subscriptions'
    ]);

    this.interval = null;
  }

  async run ()
  {
    this.interval = setInterval (() => {
      for (let subscription of this.config.subscriptions) {
        let guild = getGuild (subscription.guild);
        let members = [];

        for (let member of guild.members) {
          let roles = member [1]._roles.map ((r) => guild.roles.find ((s) => s.id === r).name);

          let clan = null;
          let rank = null;

          for (let role of roles) {
            if (subscription.lang.clan.test (role)) {
              clan = role.match (subscription.lang.clan) [1];
            } else if (role in subscription.lang.ranks) {
              rank = subscription.lang.ranks [role];
            }
          }

          if (!clan || !rank) {
            continue;
          }

          members.push ({
            name: member [1].nickname || member [1].user.username,
            clan,
            rank
          });
        }

        updateClan ({
          community: subscription.guild,
          members
        });
      }
    // }, 1000);
    }, this.config.updateInterval);
  }

  async destroy ()
  {
    clearInterval (this.interval);
  }
}

module.exports = ClanWatcher;