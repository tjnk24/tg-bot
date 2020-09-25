import path from 'path';
import mongoose from 'mongoose';
import Telegraf, { Stage } from 'telegraf';
import session from 'telegraf/session';
import TelegrafI18n, { match } from 'telegraf-i18n';
import getUserInfo from './middlewares/user-info';
import startScene from './controllers/start';
import settingsScene from './controllers/settings';
import logger from './utils/logger';
import startDevMode from './utils/dev-modes';
import asyncWrapper from './utils/error-handler';
import deleteKeyboardMessage from './utils/helpers';
import Telegram from './telegram';

require('dotenv').config();

const dbconfig = {
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASS,
  cluster: process.env.MONGODB_CLUSTER,
  dbname: process.env.MONGODB_DBNAME,
};

mongoose.connect(`mongodb+srv://${dbconfig.user}:${dbconfig.pass}@${dbconfig.cluster}/${dbconfig.dbname}?retryWrites=true&w=majority`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on('error', (err) => {
  logger.error(
    undefined,
    'Error occurred during an attempt to establish connection with the database: %O',
    err,
  );
  process.exit(1);
});

mongoose.connection.on('open', () => {
  const bot = new Telegraf(process.env.BOT_TOKEN);

  const stage = new Stage([startScene, settingsScene]);

  const i18n = new TelegrafI18n({
    defaultLanguage: 'ru',
    directory: path.resolve(__dirname, 'locales'),
    useSession: true,
    allowMissing: false,
    sessionName: 'session',
  });

  bot.use(session());
  bot.use(i18n.middleware());
  bot.use(stage.middleware());
  bot.use(getUserInfo);

  bot.start(asyncWrapper(async (ctx) => {
    await deleteKeyboardMessage(ctx);
    return ctx.scene.enter('start');
  }));

  bot.hears(
    [match('keyboards.main_keyboard.settings'), '/settings'],
    asyncWrapper(async (ctx) => {
      await deleteKeyboardMessage(ctx);
      return ctx.scene.enter('settings');
    }),
  );

  bot.hears(
    [match('keyboards.main_keyboard.my_subscriptions'), '/list'],
    asyncWrapper(async (ctx) => {
      await deleteKeyboardMessage(ctx);
      await ctx.reply(ctx.i18n.t('scenes.main.no_subscriptions'));
    }),
  );

  bot.hears(
    [match('keyboards.main_keyboard.help'), '/help'],
    asyncWrapper(async (ctx) => {
      await deleteKeyboardMessage(ctx);
      await ctx.reply(ctx.i18n.t('scenes.main.help'));
    }),
  );

  bot.hears(
    [match('keyboards.main_keyboard.helpcommands'), '/helpcommands'],
    asyncWrapper(async (ctx) => {
      await deleteKeyboardMessage(ctx);
      await ctx.replyWithHTML(ctx.i18n.t('scenes.main.helpcommands'));
    }),
  );

  bot.hears(/(.*?)/, asyncWrapper(async (ctx) => {
    await ctx.reply(ctx.i18n.t('shared.wrong_command'));
  }));

  bot.catch((error) => {
    logger.error(undefined, 'Global error has happened, %O', error);
  });

  startDevMode(bot);

  logger.debug(undefined, 'Bot has been launched!');
});
