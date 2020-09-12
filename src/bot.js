// import http from 'http';
// import cors from 'cors';
// import express from 'express';
// import scrape from './scrape';
import path from 'path';
import Telegraf, { Stage } from 'telegraf';
import session from 'telegraf/session';
import TelegrafI18n, { match } from 'telegraf-i18n';
import startScene from './controllers/start';
// import { getMainKeyboard } from './utils/keyboards';

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Stage([startScene]);

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

bot.start(async (ctx) => ctx.scene.enter('start'));

bot.hears(
  [match('keyboards.main_keyboard.my_subscriptions'), '/list'],
  async (ctx) => {
    await ctx.reply(ctx.i18n.t('scenes.main.no_subscriptions'));
  },
);

bot.hears(
  [match('keyboards.main_keyboard.help'), '/help'],
  async (ctx) => {
    await ctx.reply(ctx.i18n.t('scenes.main.help'));
  },
);

bot.hears(
  [match('keyboards.main_keyboard.helpcommands'), '/helpcommands'],
  async (ctx) => {
    await ctx.replyWithHTML(ctx.i18n.t('scenes.main.helpcommands'));
  },
);

bot.hears(/(.*?)/, (ctx) => {
  console.log(ctx.message.text);
  ctx.reply('testing');
});
// bot.hears(/(.*?)/, (ctx) => {
//   const { mainKeyboard } = getMainKeyboard(ctx);

//   ctx.reply(ctx.i18n.t('other.default_handler'), mainKeyboard);
// });

// bot.help((ctx) => ctx.reply('Send me a fuckin sticker'));

// bot.on('sticker', (ctx) => ctx.reply('sdfsdfsdfsdf'));

// bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.launch();

console.log('bot has been launched!');

// const app = express();

// app.server = http.createServer(app);

// app.use(cors({}));

// app.get('/', (req, res) => {
//   scrape().then((response) => {
//     res.send(response.data);
//   });
// });

// app.server.listen(process.env.PORT || 8080, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Started on port ${app.server.address().port}`);
// });
