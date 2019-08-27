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

let config = {
  argv: minimist (process.argv.slice (2)),

  discord: {
    token: process.env.DISCORD_TOKEN,
    status: 'wc3stats.com'
  },

  modules: {
    replayWatcher: {
      watch: [
        {
          guild: 'Deathknell',
          channels: [
            'general',
            '455928346547585024'
          ]
        }
      ]
    }
  }
};

export default config;