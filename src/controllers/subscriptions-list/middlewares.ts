import { CustomContextMessage } from 'telegraf';
import { IGroup } from '@models/Group';

/**
 * Exposes required movie according to the given callback data
 * @param ctx - telegram context
 * @param next - next function
 */
const exposeGroup = (ctx: CustomContextMessage, next: Function) => {
  const action = JSON.parse(ctx.callbackQuery.data);
  ctx.group = (ctx.session.groups as IGroup[]).find((item: IGroup) => item._id === action.p);

  return next();
};

export default exposeGroup;
