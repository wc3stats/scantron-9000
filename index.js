import 'module-alias/register';

/*
|--------------------------------------------------------------------------
| Load Configuration
|--------------------------------------------------------------------------
|
| The bot configuration includes general parameters and the guild / channel
| listeners. Guilds are made up of channels which can subscribe to
| listeners. When a listener has matched a game from a data source, a post
| will be made for all channels that have subscribed to that listener.
|
*/

import config from 'scantron/config';
import logger from 'scantron/logger';

/*
|--------------------------------------------------------------------------
| Main Routine
|--------------------------------------------------------------------------
|
| Establish Discord connection and start listening!
|
*/

import { Client }  from 'discord.js';
import { lcfirst } from 'scantron/util';

global.client = new Client ();

client.on ('ready', async () => {
  logger.info (`Logged in as ${client.user.tag}.`);
  client.user.setActivity (config.discord.status);

  /** **/

  init ('ReplayWatcher');

  /** **/

  process.on ('SIGINT',  cleanup);
  process.on ('SIGTERM', cleanup);

  process.on ('unhandledRejection', (reason, promise) => {
    try {
      throw reason;
    } catch (e) {
      logger.error (e);
    }
  });

  process.on ('uncaughtException', (e) => {
    logger.error (e.toString ());
  });
});

async function cleanup () {
  logger.info (`Cleaning up.`);

  try {
    client.destroy ();
  } catch (e) {
    logger.error (`Cleanup failed.`);
  }

  process.exit ();
}

async function init (module) {
  logger.info (`Initializing module: ${module}.`);

  let controller, settings;

  settings = config.modules [lcfirst (module)] || {};

  controller = require (`scantron/src/modules/${module}`);
  controller = new controller (client, settings);
  controller.run ();

  return controller;
}

/** **/

client.login (config.discord.token);
