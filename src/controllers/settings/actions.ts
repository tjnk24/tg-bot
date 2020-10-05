import { CustomContextMessage } from 'telegraf';
import updateLanguage from '@utils/language';
import { deleteFromSession } from '@utils/session';
import getMainKeyboard from '@utils/keyboards';
import { getLanguageKeyboard } from './helpers';

export const languageSettingsAction = async (ctx: CustomContextMessage) => ctx.editMessageText(ctx.i18n.t('scenes.settings.pick_language'), getLanguageKeyboard());

export const languageChangeAction = async (ctx: CustomContextMessage) => {
  const langData = JSON.parse(ctx.callbackQuery.data);

  await updateLanguage(ctx, langData.payload);

  const { messagesToDelete } = ctx.session.settingsScene;

  messagesToDelete.forEach(async (message) => {
    await ctx.telegram.deleteMessage(message.chatId, message.messageId);
  });

  deleteFromSession(ctx, 'settingsScene');

  const { mainKeyboard } = getMainKeyboard(ctx);
  await ctx.reply(ctx.i18n.t('scenes.settings.language_changed'), mainKeyboard);

  ctx.scene.leave();
};
