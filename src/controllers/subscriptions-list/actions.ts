import { CustomContextMessage } from 'telegraf';
import logger from '@utils/logger';
import {
  deleteGroupFromObservables,
  getGroupControlMenu,
  getSubsMenu,
} from './helpers';

export const groupAction = async (ctx: CustomContextMessage) => {
  await ctx.editMessageText(
    ctx.group.title,
    getGroupControlMenu(ctx),
  );

  await ctx.answerCbQuery();
};

export const backAction = async (ctx: CustomContextMessage) => {
  await ctx.editMessageText(
    ctx.i18n.t('scenes.subscriptions_list.your_subs'),
    getSubsMenu(ctx.session.groups),
  );

  await ctx.answerCbQuery();
};

export const deleteAction = async (ctx: CustomContextMessage) => {
  logger.debug(ctx, 'Removing group %s from collection', ctx.group._id);

  const updatedGroupList = await deleteGroupFromObservables(ctx);

  if (updatedGroupList.length) {
    await ctx.editMessageText(
      ctx.i18n.t('scenes.subscriptions_list.your_subs'),
      getSubsMenu(updatedGroupList),
    );
  } else {
    await ctx.editMessageText(ctx.i18n.t('scenes.main.no_subscriptions'));
  }

  await ctx.answerCbQuery();
};
