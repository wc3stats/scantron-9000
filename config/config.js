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
          ]
        },

        {
          guild: 'Broken Alliances',
          channel: '713810806864871424',
          clean: true,
          // ping: true,

          // colours: {
          //   open    : 'green',
          //   closing : 'green',
          //   closed  : 'red',
          //   started : 'red'
          // },

          patterns: [
            new Pattern ({
              map: /Broken.Alliances/i
            })
          ]
        },

        {
          guild: 'Coming of the Horde',
          channel: '409764349222322176',
          ping: true,

          patterns: [
            new Pattern ({
              map: /Coming of the Horde/i
            })
          ]
        }
      ]
    },

    clanWatcher: {
      updateInterval: 1000 * 60 * 1,

      subscriptions: [
        {
          guild: 'Broken Alliances',

          lang: {
            clan: /Clan (.*)/,

            ranks: {
              'Chieftain' : 1,
              'Shaman' : 2,
              'Grunt' : 3,
              'Peon' : 4
            }
          }
        }
      ]
    }
  }
};

export default config;