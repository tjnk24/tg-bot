import { CustomContextMessage, BaseScene } from 'telegraf';
import getMainKeyboard from '../../utils/keyboards';
import logger from '../../utils/logger'; // TODO: make normal aliases
import User from '../../models/User';

const start = new BaseScene('start');

start.enter(async (ctx: CustomContextMessage) => {
  const uid = String(ctx.from.id);
  const user = await User.findById(uid);
  const { mainKeyboard } = getMainKeyboard(ctx);

  if (!user) {
    const now = new Date().getTime();

    const newUser = new User({
      _id: uid,
      created: now,
      username: ctx.from.username,
      name: `${ctx.from.first_name} ${ctx.from.last_name}`,
      observableGroups: [],
      lastActivity: now,
      language: 'ru',
    });

    await newUser.save();

    logger.debug(ctx, 'New user has been created');
    await ctx.reply(ctx.i18n.t('scenes.main.send_link'), mainKeyboard);
  }
});

export default start;
