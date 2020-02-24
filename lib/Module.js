import logger from 'scantron/logger';
import { isset } from 'scantron/util';

class Module
{
  constructor (client, config)
  {
    this.client = client;
    this.config = config;
  }

  requireKeys (keys)
  {
    for (let key of keys) {
      if (!isset (this.config, key)) {
        logger.error (`Missing configuration key: [${key}].`);
        throw new Error ();
      }
    }
  }

  async run ()
  {
    logger.warn ('Module not implemented.');
  }
}

export default Module;