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
              slotsTaken: /[5-9]|1[0-9]/,
              server: 'usw'
            })
          ]
        },

        {
          guild: 'Azeroth Wars LR',
          channel: '681919874657812526',
          ping: true,

          patterns: [
            new Pattern ({
              map: /Azeroth Wars/i,
              slotsTaken: /[5-9]|1[0-9]/,
              server: 'eu'
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
        },

        /** **/

        {
          guild: 'The Old Guard',
          channel: 'other_hosted_games',

          patterns: [
            new Pattern ({ map: /Rise of the Vampyr/i }),
            new Pattern ({ map: /War of the Clans/i }),
            new Pattern ({ map: /Creep Wars/i }),
            new Pattern ({ map: /Siege of Jerusalem/i })
          ]
        },

        {
          guild: 'The Old Guard',
          channel: 'grand_strat_hosted_games',
          // ping: true,

          // sidebar: '#249b0f',

          patterns: [
            new Pattern ({ map: /First War/i }),
            new Pattern ({ map: /PLEC/i }),
            new Pattern ({ map: /War in the Plaguelands/i }),
            new Pattern ({ map: /Plaguelands: Eternal Conflict/i }),
            new Pattern ({ map: /World War Risk/i }),
            new Pattern ({ map: /Battle of Gilneas/i }),
            new Pattern ({ map: /Strife in the Plaguelands/i }),
            new Pattern ({ map: /Darkness Rising/i }),
            new Pattern ({ map: /The Last Crusade/i })
          ]
        },

        {
          guild: 'The Old Guard',
          channel: 'azerothian_hosted_games',
          // ping: true,

          // sidebar: '#1e6bd4',

          patterns: [
            new Pattern ({ map: /Azeroth Wars/i }),
            new Pattern ({ map: /Dark Ages of Warcraft/i }),
            new Pattern ({ map: /DAOW/i }),
            new Pattern ({ map: /Fall of Lordaeron/i })
          ]
        },

        {
          guild: 'The Old Guard',
          channel: 'marshlander_hosted_games',
          // ping: true,

          // sidebar: '#3cc4a0',

          patterns: [
            new Pattern ({ map: /Lordaeron TA/i }),
            new Pattern ({ map: /Lordaeron TF/i }),
            new Pattern ({ map: /Kalimdor TA/i })
          ]
        },

        {
          guild: 'The Old Guard',
          channel: 'middle_earth_hosted_games',
          // ping: true,

          // sidebar: '#b89c24',

          patterns: [
            new Pattern ({ map: /Roberts Rebellion/i }),
            new Pattern ({ map: /Ring Wars/i }),
            new Pattern ({ map: /War of the Jewels/i }),
            new Pattern ({ map: /Battle for Middle Earth/i }),
            new Pattern ({ map: /BFME/i })
          ]
        },

        {
          guild: 'The Old Guard',
          channel: 'divided_conq_hosted_games',
          // ping: true,

          // sidebar: '#ce0303',

          patterns: [
            new Pattern ({ map: /Glory of the Horde/i }),
            new Pattern ({ map: /War for Orrinon/i }),
            new Pattern ({ map: /Warhammer: Age of Wrath/i }),
            new Pattern ({ map: /Lordaeron Tactics/i }),
            new Pattern ({ map: /Rise of the Scourge/i }),
            new Pattern ({ map: /Tales of Durotar Testing/i }),
            new Pattern ({ map: /Conflict for Sereg/i }),
            new Pattern ({ map: /Kings of Azeroth/i })
          ]
        }
      ]
    }
  }
};

export default config;