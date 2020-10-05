import { CustomContextMessage } from 'telegraf';
import logger from '@utils/logger';
import maximum_groups from '@utils/bot-values';
import Group, { IGroup } from '@models/Group';
import User from '@models/User';
import canSubscribe from './helpers';

const addSubscriptionAction = async (ctx: CustomContextMessage, groupUrlName: string) => {
  const groupUrl = `https://m.vk.com/${groupUrlName}`;

  const subscribeCheck = await canSubscribe(ctx, groupUrl, groupUrlName);

  const { i18n, title } = subscribeCheck;

  let remainingSubs;

  if (i18n === 'successfully_subscribed') {
    logger.debug(undefined, 'Subscribing the page');

    const groupDoc = await Group.findOneAndUpdate(
      { _id: groupUrlName },
      {
        title,
        url: groupUrl,
      },
      {
        new: true,
        upsert: true,
      },
    );

    const user = await User.findOneAndUpdate(
      { _id: ctx.from.id },
      {
        $addToSet: { observableGroups: groupDoc._id as unknown as IGroup },
        $inc: { totalGroups: 1 },
      },
      {
        new: true,
      },
    );

    remainingSubs = maximum_groups - user.totalGroups;
  }

  await ctx.reply(ctx.i18n.t(`scenes.subscribe.${i18n}`, {
    title,
    remainingSubs,
  }));

  ctx.scene.leave();
};

export default addSubscriptionAction;
