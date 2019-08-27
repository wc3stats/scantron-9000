import winston from 'winston';
import debug   from 'winston-dconsole';
import config  from 'scantron/config';

let transport;

if (config.argv.debug) {
  transport = new debug.Dconsole (
    {
      level: 'trace',
      json: false,
      colorize: true,
      timestamp: true
    }
  );
} else {
  transport = new winston.transports.Console (
    {
      level: 'info',
      json: false,
      colorize: true,
      timestamp: true
    }
  );
}

let logger = new winston.Logger (
  {
    levels: {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warn: 4,
      notice: 5,
      info: 6,
      debug: 7,
      trace: 8
    },

    transports: [
      transport
    ]
  }
);

winston.addColors ({
  trace: 'gray'
});

export default logger;