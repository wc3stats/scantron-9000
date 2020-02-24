import request from 'request-promise';
import logger from 'scantron/logger';

/** **/

const endpoints = {
  upload   : 'https://api.wc3stats.com/upload',
  gamelist : 'https://api.wc3stats.com/gamelist'
};

/** **/

export async function upload (url) {
  logger.info (`Uploading replay: [${url}].`);

  let formData = {
    file: request (url)
  };

  return request.post (
    endpoints.upload,
    {
      formData,
      json: true
    }
  );
}

export async function getGamelist () {
  let gamelist;

  gamelist = await request.get (endpoints.gamelist);

  try {
    gamelist = JSON.parse (gamelist);
    gamelist = gamelist ['body'];
  } catch (e) {
    gamelist = [];
  }

  logger.info (`Found [${gamelist.length}] games.`);
  return gamelist;
}