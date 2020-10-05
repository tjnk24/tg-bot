import {
  CustomContextMessage,
  Extra,
  Markup,
} from 'telegraf';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import get from 'lodash.get';
import saveToSession from '@utils/session';

export const getLanguageKeyboard = () => Extra.markup(
  (m: Markup) => m.inlineKeyboard(
    [
      m.callbackButton('🇺🇸 English', JSON.stringify({ action: 'languageChange', payload: 'en' }), false),
      m.callbackButton('🇷🇺 Русский', JSON.stringify({ action: 'languageChange', payload: 'ru' }), false),
    ],
    {},
  ),
);

export const getSettingsKeyboard = (ctx: CustomContextMessage) => Extra.markup(
  (m: Markup) => m.inlineKeyboard(
    [
      m.callbackButton(
        ctx.i18n.t('scenes.settings.language_button'),
        JSON.stringify({ a: 'languageSettings' }),
        false,
      ),
    ],
    {},
  ),
);

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
