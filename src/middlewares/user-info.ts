import { CustomContextMessage } from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';
import User from '@models/User';

/**
 * Modifies context and add some information about the user
 * @param ctx - telegram context
 * @param next - next function
 */
const getUserInfo = async (ctxValue: CustomContextMessage | TelegrafContext, next: Function) => {
  const ctx = ctxValue as CustomContextMessage;

  if (ctx.from && !ctx.session.language) {
    const user = await User.findById(ctx.from.id);

    if (user) {
      ctx.session.language = user.language;
      ctx.i18n.locale(user.language);
    }
  }

  return next();
};

export default getUserInfo;
