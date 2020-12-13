let argv = (require ('minimist')) (process.argv.slice (2));
let path = require ('path');
let dotenv = require ('dotenv');
let config = {};

dotenv.config ({ path: path.resolve ('.env') });

// --

config.argv = argv;

config.discord = {
  token  : process.env.DISCORD_TOKEN,
  status : 'wc3stats.com',
  emojis : 'Deathknell'
};

// --

config.clans = {
  rate: 1000 * 60 * 1,

  guilds: [
    {
      // Broken Alliances
      id: '245688273937104897',

      lang: {
        clan: /Clan (.*)/,

        ranks: [
          { rank: 'Chieftain', level: 1 },
          { rank: 'Shaman', level: 2 },
          { rank: 'Grunt', level: 3 },
          { rank: 'Peon', level: 4 }
        ]
      }
    }
  ]
};

// --

config.lobbies = {
  guilds: [
    {
      // Broken Alliances
      id: '245688273937104897',
      channel: '721485109764554865',
      ping: false,
      clean: true,

      patterns: [
        { map: /Broken.Alliances/i }
      ]
    },

    {
      // Coming of the Horde
      id: '367754510736556034',
      channel: '409764349222322176',
      ping: '@here',

      patterns: [
        { map: /Coming of the Horde/i }
      ]
    }
  ]
};

// --

module.exports = config;


    // replayWatcher: {
    //   allowedExtensions: [
    //     '.w3g'
    //   ],

    //   watch: [
    //     {
    //       guild: 'Deathknell',
    //       channels: [
    //         'test',
    //         '455928346547585024'
    //       ]
    //     }
    //   ]
    // },


    // /**
    //  * Game Watcher Subscription Patterns:
    //  *
    //  * {
    //  *    name   : <pattern>,
    //  *    server : <pattern>,
    //  *    map    : <pattern>,
    //  *    host   : <pattern>
    //  * }
    //  *
    //  */
    // gameWatcher: {
    //   updateInterval: 5000,

    //   subscriptions: [
    //     {
    //       guild: 'Deathknell',
    //       channel: '681316014344241172',
    //       ping: true,

    //       patterns: [
    //       ]
    //     },

    //     {
    //       guild: '553349292144721942',
    //       channel: '743298865792417802',
    //       ping: true,

    //       patterns: [
    //         new Pattern ({ map: /War.in.the.Plaguelands/i }),
    //         new Pattern ({ map: /Warhammer.Tides.of.Chaos/i }),
    //         new Pattern ({ map: /Warhammer.TOC/i }),
    //         new Pattern ({ map: /The.First.War/i }),
    //         new Pattern ({ map: /Game.of.Thrones/i }),
    //         new Pattern ({ map: /BFME/i }),
    //         new Pattern ({ map: /Battle.For.Middle.Earth/i }),
    //         new Pattern ({ map: /Conquest.of.Tel.Sirion/i }),
    //       ]
    //     },

    //     {
    //       guild: 'Broken Alliances',
    //       channel: '721485109764554865',
    //       clean: true,
    //       // ping: true,

    //       // colours: {
    //       //   open    : 'green',
    //       //   closing : 'green',
    //       //   closed  : 'red',
    //       //   started : 'red'
    //       // },

    //       patterns: [
    //         new Pattern ({
    //           map: /Broken.Alliances/i
    //         })
    //       ]
    //     },

    //     {
    //       guild: 'Coming of the Horde',
    //       channel: '409764349222322176',
    //       ping: true,

    //       patterns: [
    //         new Pattern ({
    //           map: /Coming of the Horde/i
    //         })
    //       ]
    //     }
    //   ]
    // },

  //   clanWatcher: {
  //     updateInterval: 1000 * 5 * 1,

  //     subscriptions: [
  //       {
  //         guild: 'Broken Alliances',

  //         lang: {
  //           clan: /Clan (.*)/,

  //           ranks: {
  //             'Chieftain' : 1,
  //             'Shaman' : 2,
  //             'Grunt' : 3,
  //             'Peon' : 4
  //           }
  //         }
  //       }
  //     ]
  //   }
  // }
// };

// export default config;