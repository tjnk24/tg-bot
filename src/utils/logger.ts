/* eslint-disable camelcase */
import { CustomContextMessage } from 'telegraf';
import util from 'util';
import winston, { format } from 'winston';

/**
 * Adds user id and nickname if found. Also formats message to display complex objects
 * @param ctx - telegram context
 * @param msg  - message
 * @param data - object to log
 */
const prepareMessage = (ctx: CustomContextMessage | undefined, msg: string, ...data: any[]) => {
  const formattedMessage = data.length ? util.format(msg, ...data) : msg;

  if (ctx && ctx.from) {
    const { first_name, last_name } = ctx.from;

    return `[${ctx.from.id}/${first_name} ${last_name}]: ${formattedMessage}`;
  }

  return `: ${formattedMessage}`;
};

const { combine, timestamp, printf } = format;
const logFormat = printf((info) => `[${info.timestamp}] [${info.level}]${info.message}`);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    }),
    new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
  ],
  format: combine(timestamp(), format.splat(), format.simple(), logFormat),
});

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

const loggerWithCtx = {
  debug: (
    ctx: CustomContextMessage | undefined,
    msg: string,
    ...data: any[]
  ) => logger.debug(prepareMessage(ctx, msg, ...data)),
  error: (
    ctx: CustomContextMessage | undefined,
    msg: string,
    ...data: any[]
  ) => logger.error(prepareMessage(ctx, msg, ...data)),
};

export default loggerWithCtx;
