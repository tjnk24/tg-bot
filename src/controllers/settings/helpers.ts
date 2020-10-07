import {
  CustomContextMessage,
  Extra,
  Markup,
} from 'telegraf';

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
