// import scrape from './scrape';
import path from 'path';
import Telegraf, { Stage } from 'telegraf';
import session from 'telegraf/session';
import TelegrafI18n, { match } from 'telegraf-i18n';
import startScene from './controllers/start';
import settingsScene from './controllers/settings';
import startDevMode from './utils/dev-modes';
import deleteKeyboardMessage from './utils/helpers';

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Stage([startScene, settingsScene]);

const i18n = new TelegrafI18n({
  defaultLanguage: 'en',
  directory: path.resolve(__dirname, 'locales'),
  useSession: true,
  allowMissing: false,
  sessionName: 'session',
});

bot.use(session());
bot.use(i18n.middleware());
bot.use(stage.middleware());

bot.start(async (ctx) => {
  await deleteKeyboardMessage(ctx);
  return ctx.scene.enter('start');
});

bot.hears(
  [match('keyboards.main_keyboard.settings'), '/settings'],
  async (ctx) => {
    await deleteKeyboardMessage(ctx);
    return ctx.scene.enter('settings');
  },
);

bot.hears(
  [match('keyboards.main_keyboard.my_subscriptions'), '/list'],
  async (ctx) => {
    await deleteKeyboardMessage(ctx);
    await ctx.reply(ctx.i18n.t('scenes.main.no_subscriptions'));
  },
);

bot.hears(
  [match('keyboards.main_keyboard.help'), '/help'],
  async (ctx) => {
    await deleteKeyboardMessage(ctx);
    await ctx.reply(ctx.i18n.t('scenes.main.help'));
  },
);

bot.hears(
  [match('keyboards.main_keyboard.helpcommands'), '/helpcommands'],
  async (ctx) => {
    await deleteKeyboardMessage(ctx);
    await ctx.replyWithHTML(ctx.i18n.t('scenes.main.helpcommands'));
  },
);

bot.hears(/(.*?)/, (ctx) => {
  ctx.reply('testing');
});

startDevMode(bot);

console.log('bot has been launched!');
