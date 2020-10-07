import { CustomContextMessage, Extra, Markup } from 'telegraf';
import { IGroup } from '@models/Group';
import User from '@models/User';
import { saveToSession } from '@utils/session';

/**
 * Displays menu with a list of groups
 * @param groups - list of groups
 */
export const getSubsMenu = (groups: IGroup[]) => Extra.markup(
  (m: Markup) => m.inlineKeyboard(
    groups.map((group) => [
      m.callbackButton(
        group.title,
        JSON.stringify({ a: 'group', p: group._id }),
        false,
      ),
    ]),
    {},
  ),
);

/**
 * Menu to control current group
 * @param ctx - telegram context
 */
export const getGroupControlMenu = (ctx: CustomContextMessage) => Extra.HTML().markup(
  (m: Markup) => m.inlineKeyboard(
    [
      m.callbackButton(
        ctx.i18n.t('shared.back_button'),
        JSON.stringify({ a: 'back', p: undefined }),
        false,
      ),
      m.callbackButton(
        ctx.i18n.t('scenes.subscriptions_list.unsubscribe_button'),
        JSON.stringify({ a: 'delete', p: ctx.group._id }),
        false,
      ),
    ],
    {},
  ),
);

/**
 * Delete group from observable array and refreshes groups in session
 * @param ctx - telegram context
 */
export async function deleteGroupFromObservables(ctx: CustomContextMessage): Promise<IGroup[]> {
  const user = await User.findOneAndUpdate(
    { _id: ctx.from.id },
    {
      $pull: { observableGroups: ctx.group._id },
      $inc: { totalGroups: -1 },
    },
    {
      new: true,
    },
  ).populate('observableGroups');

  saveToSession(ctx, 'groups', user.observableGroups);

  return user.observableGroups;
}
