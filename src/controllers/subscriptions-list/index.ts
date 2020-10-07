import { CustomContextMessage, BaseScene } from 'telegraf';
import logger from '@utils/logger';
import { saveToSession } from '@utils/session';
import User from '@models/User';
import { getSubsMenu } from './helpers';
import { backAction, deleteAction, groupAction } from './actions';
import exposeGroup from './middlewares';

const subscriptionsList = new BaseScene('subscriptions-list');

subscriptionsList.enter(async (ctx: CustomContextMessage) => {
  logger.debug(ctx, 'Enters subscriptions-list scene');

  const user = await User.findById(ctx.from.id);

  saveToSession(ctx, 'groups', user.observableGroups);

  if (user.totalGroups) {
    ctx.reply(
      ctx.i18n.t('scenes.subscriptions_list.your_subs'),
      getSubsMenu(user.observableGroups),
    );
  } else {
    await ctx.reply(ctx.i18n.t('scenes.main.no_subscriptions'));
  }
});

subscriptionsList.leave(async (ctx: CustomContextMessage) => {
  logger.debug(ctx, 'Leaves subscriptions-list scene');
});

subscriptionsList.action(/group/, exposeGroup, groupAction);
subscriptionsList.action(/back/, backAction);
subscriptionsList.action(/delete/, exposeGroup, deleteAction);

export default subscriptionsList;
