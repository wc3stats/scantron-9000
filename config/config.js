import minimist from 'minimist';

/*
|--------------------------------------------------------------------------
| Load Environment Variables
|--------------------------------------------------------------------------
|
| Values from the .env file will be loaded into process.env. This needs to
| be done before including any of the configuration files as they rely
| on the process.env files being setup.
|
| Note that environment variables which were already set will not be
| overriden if the .env has a conflicting key.
|
*/
import path   from 'path';
import dotenv from 'dotenv'

dotenv.config ({
  path: path.resolve ('.env')
});

/*
|--------------------------------------------------------------------------
| Scantron Configuration
|--------------------------------------------------------------------------
|
*/

import Pattern from 'scantron/Pattern';

let config = {
  argv: minimist (process.argv.slice (2)),

  discord: {
    token  : process.env.DISCORD_TOKEN,
    status : 'wc3stats.com',
    emojis : 'Deathknell'
  },

  modules: {
    replayWatcher: {
      allowedExtensions: [
        '.w3g'
      ],

      watch: [
        {
          guild: 'Deathknell',
          channels: [
            'test',
            '455928346547585024'
          ]
        },

        {
          guild: 'M.Z.I Series',
          channels: [
            'replays'
          ]
        }
      ]
    },


    /**
     * Game Watcher Subscription Patterns:
     *
     * {
     *    name   : <pattern>,
     *    server : <pattern>,
     *    map    : <pattern>,
     *    host   : <pattern>
     * }
     *
     */
    gameWatcher: {
      updateInterval: 5000,

      subscriptions: [
        {
          guild: 'Deathknell',
          channel: '681316014344241172',
          ping: true,

          patterns: [
            // new Pattern ({
            //   map: /Azeroth Wars/i
            // })
          ]
        },

        {
          guild: 'Azeroth Wars LR',
          channel: '570772796666544138',
          ping: true,

          patterns: [
            new Pattern ({
              map: /Azeroth Wars/i,
              slotsTaken: /[5-9]|1[0-9]/
            })
          ]
        },

        {
          guild: 'Broken Alliances',
          channel: '674781657697353751',
          // ping: true,

          colours: {
            open    : 'green',
            closing : 'green',
            closed  : 'red',
            started : 'red'
          },

          patterns: [
            new Pattern ({
              map: /Broken Alliances/i
            })
          ]
        }
      ]
    }
  }
};

export default config;