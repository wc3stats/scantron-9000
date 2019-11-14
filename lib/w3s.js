import request from 'request-promise';
import logger from 'scantron/logger';

/** **/

const endpoints = {
  upload: 'https://api.wc3stats.com/upload'
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