require ('module-alias/register');

let printf = require ('printf');
let config = require ('@/config');
let { discord } = require ('@/lib/discord');

discord.on ('ready', () => {
  printf (process.stdout, "Logged in as [%s]\n", discord.user.tag);
  discord.user.setActivity (config.discord.status);

  require ('@/plugins/monitor-clans').main ();
  require ('@/plugins/monitor-lobbies').main ();
  require ('@/plugins/monitor-replays').main ();
});

discord.login (config.discord.token);

// import { Client }  from 'discord.js';
// import { lcfirst } from 'scantron/util';

// global.client = new Client ();

// let controllers = [];

// client.on ('ready', async () => {
//   logger.info (`Logged in as ${client.user.tag}.`);
//   client.user.setActivity (config.discord.status);

//   /** **/

//   // controllers.push (init ('ReplayWatcher'));
//   // controllers.push (init ('GameWatcher'));
//   controllers.push (init ('ClanWatcher'));

//   /** **/

//   process.on ('SIGINT',  cleanup);
//   process.on ('SIGTERM', cleanup);

//   process.on ('unhandledRejection', (reason, promise) => {
//     try {
//       throw reason;
//     } catch (e) {
//       logger.error (e);
//     }
//   });

//   process.on ('uncaughtException', (e) => {
//     logger.error (e.toString ());
//   });
// });

// async function cleanup () {
//   logger.info (`Cleaning up.`);

//   try {
//     for (let controller of controllers) {
//       await controller.destroy ();
//     }

//     client.destroy ();
//   } catch (e) {
//     logger.error (e);
//     logger.error (`Cleanup failed.`);
//   }

//   process.exit ();
// }

// function init (module) {
//   logger.info (`Initializing module: ${module}.`);

//   let controller, settings;

//   settings = config.modules [lcfirst (module)] || {};

//   controller = require (`scantron/src/modules/${module}`);
//   controller = new controller (client, settings);
//   controller.run ();

//   return controller;
// }

// /** **/

// client.login (config.discord.token);
