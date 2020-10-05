import { CustomContextMessage, BaseScene } from 'telegraf';
import logger from '@utils/logger';
import addSubscriptionAction from './actions';

const subscribe = new BaseScene('subscribe');

const urlRegexp = /((https:\/\/)?(www\.)?(m\.)?vk.com\/)[\D\w]+/;
const urlSubstrRegexp = /((https:\/\/)?(www\.)?(m\.)?vk.com\/)/;

subscribe.enter(async (ctx: CustomContextMessage) => {
  logger.debug(ctx, 'Enters subscribe scene');

  const { text } = ctx.message;

  if (urlRegexp.test(text)) {
    const urlSubstr = urlSubstrRegexp.exec(text)[0];
    const groupUrlName = text.replace(urlSubstr, '');

    await addSubscriptionAction(ctx, groupUrlName);
  } else {
    await ctx.reply(ctx.i18n.t('shared.wrong_command'));

    ctx.scene.leave();
  }
});

subscribe.leave(async (ctx: CustomContextMessage) => {
  logger.debug(ctx, 'Leaves subscribe scene');
});

export default subscribe;
