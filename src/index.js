import http from 'http';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import Telegraf from 'telegraf';
import scrape from './scrape';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('zdarova!'));

bot.help((ctx) => ctx.reply('Send me a fuckin sticker'));

bot.on('sticker', (ctx) => ctx.reply('sdfsdfsdfsdf'));

bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.launch();

const app = express();

app.server = http.createServer(app);

app.use(cors({}));

app.get('/', (req, res) => {
  scrape().then((response) => {
    res.send(response.data);
  });
});

app.server.listen(process.env.PORT || 8080, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on port ${app.server.address().port}`);
});
