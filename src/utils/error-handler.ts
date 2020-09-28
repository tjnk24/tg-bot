import { CustomContextMessage } from 'telegraf';
import logger from './logger';

/**
 * Wrapper to catch async errors within a stage. Helps to avoid try catch blocks in there
 * @param fn - function to enter a stage
 */
const asyncWrapper = (fn: Function) => async (ctx: CustomContextMessage, next: Function) => {
  try {
    return await fn(ctx);
  } catch (error) {
    logger.error(ctx, 'asyncWrapper error, %O', error);
    await ctx.reply(ctx.i18n.t('shared.something_went_wrong'));
    return next();
  }
};

export default asyncWrapper;
