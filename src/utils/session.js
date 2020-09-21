import logger from './logger';

/**
 * Saving data to the session
 * @param ctx - telegram context
 * @param field - field to store in
 * @param data - data to store
 */
const saveToSession = (ctx, field, data) => {
  logger.debug(ctx, 'Saving %s to session', field);
  ctx.session[field] = data;
};

/**
 * Removing data from the session
 * @param ctx - telegram context
 * @param field - field to delete
 */
export const deleteFromSession = (ctx, field) => {
  logger.debug(ctx, 'Saving %s to session', field);
  delete ctx.session[field];
};

export default saveToSession;
