/**
 * Saving data to the session
 * @param ctx - telegram context
 * @param field - field to store in
 * @param data - data to store
 */
const saveToSession = (ctx, field, data) => {
  ctx.session[field] = data;
};

/**
 * Removing data from the session
 * @param ctx - telegram context
 * @param field - field to delete
 */
export const deleteFromSession = (ctx, field) => {
  delete ctx.session[field];
};

export default saveToSession;
