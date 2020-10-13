import { CustomContextMessage, SessionType } from 'telegraf';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import get from 'lodash.get';
import logger from './logger';

type SessionDataField = 'groups' | 'settingsScene' | 'language';

const sessionStorage: SessionType = {
  groups: [],
  settingsScene: {
    messagesToDelete: [],
  },
  language: 'en' || 'ru',
};

/**
 * Saving data to the session
 * @param ctx - telegram context
 * @param field - field to store in
 * @param data - data to store
 */
export const saveToSession = (ctx: CustomContextMessage, field: SessionDataField, data: any) => {
  logger.debug(ctx, 'Saving %s to session', field);
  ctx.session[field] = data;
  sessionStorage[field] = data;
};

export const getFromSession = () => sessionStorage;

/**
 * Removing data from the session
 * @param ctx - telegram context
 * @param field - field to delete
 */
export const deleteFromSession = (ctx: CustomContextMessage, field: SessionDataField) => {
  logger.debug(ctx, 'Saving %s to session', field);
  delete ctx.session[field];
  delete sessionStorage[field];
};

/**
 * Send message and saving it to the session. Later it can be deleted.
 * Used to avoid messages duplication
 * @param ctx - telegram context
 * @param translationKey - translation key
 * @param extra - extra for the message, e.g. keyboard
 */
export const sendMessageToBeDeletedLater = async (
  ctx: CustomContextMessage,
  translationKey: string,
  extra?: ExtraReplyMessage,
) => {
  ctx.webhookReply = false;
  const message = await ctx.reply(ctx.i18n.t(translationKey), extra);
  const messagesToDelete = get(ctx.session, 'settingsScene.messagesToDelete', []);

  saveToSession(ctx, 'settingsScene', {
    messagesToDelete: [
      ...messagesToDelete,
      {
        chatId: message.chat.id,
        messageId: message.message_id,
      },
    ],
  });
};
