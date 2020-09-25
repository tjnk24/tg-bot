import logger from './logger';
import User from '../models/User';
import saveToSession from './session';

/**
 * Function that updates language for the current user in all known places
 * @param ctx - telegram context
 * @param newLang - new language
 */
const updateLanguage = async (ctx, newLang) => {
  logger.debug(ctx, 'Updating language for user to %s', newLang);

  await User.findOneAndUpdate(
    { _id: ctx.from.id },
    { language: newLang },
    { new: true },
  );

  saveToSession(ctx, 'language', newLang);
  ctx.i18n.locale(newLang);
};

export default updateLanguage;
