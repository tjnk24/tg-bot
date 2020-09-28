import { Telegram } from 'telegraf';

require('dotenv').config();

const telegram = new Telegram(process.env.BOT_TOKEN, {});
export default telegram;
