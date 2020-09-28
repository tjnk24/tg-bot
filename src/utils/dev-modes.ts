import rp from 'request-promise';
import Telegraf from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';
import logger from './logger';

const startDevMode = (botParam: Telegraf<TelegrafContext>) => {
  logger.debug(undefined, 'Starting a bot in development mode');

  rp(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/deleteWebhook`)
    .then(() => botParam.startPolling());
};

export default startDevMode;
