import Scene from 'telegraf/scenes/base';
import getMainKeyboard from '../../utils/keyboards';

const start = new Scene('start');

start.enter(async (ctx) => {
  const { mainKeyboard } = getMainKeyboard(ctx);
  await ctx.reply(ctx.i18n.t('scenes.main.send_link'), mainKeyboard);
});

export default start;
