import { getLanguageKeyboard } from './helpers';
import updateLanguage from '../../utils/language';
import { deleteFromSession } from '../../utils/session';

export const languageSettingsAction = async (ctx) => ctx.editMessageText(ctx.i18n.t('scenes.settings.pick_language'), getLanguageKeyboard());

export const languageChangeAction = async (ctx) => {
  const langData = JSON.parse(ctx.callbackQuery.data);

  await updateLanguage(ctx, langData.payload);

  const { messagesToDelete } = ctx.session.settingsScene;

  messagesToDelete.forEach(async (message) => {
    await ctx.telegram.deleteMessage(message.chatId, message.messageId);
  });

  deleteFromSession(ctx, 'settingsScene');
  ctx.scene.leave();
};
