import rp from 'request-promise';
import logger from './logger';

const startDevMode = (botParam) => {
  logger.debug(undefined, 'Starting a bot in development mode');

  rp(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/deleteWebhook`)
    .then(() => botParam.startPolling());
};

export default startDevMode;
