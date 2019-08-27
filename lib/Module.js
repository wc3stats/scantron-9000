import logger from 'scantron/logger';

class Module
{
  constructor (client, config)
  {
    this.client = client;
    this.config = config;
  }

  async run ()
  {
    logger.warn ('Module not implemented.');
  }
}

export default Module;