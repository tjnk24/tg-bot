import { Markup } from 'telegraf';

/**
 * Returns main keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
const getMainKeyboard = (ctx) => {
  const mainKeyboardSubscriptions = ctx.i18n.t('keyboards.main_keyboard.my_subscriptions');
  const mainKeyboardHelpcommands = ctx.i18n.t('keyboards.main_keyboard.helpcommands');
  const mainKeyboardSettings = ctx.i18n.t('keyboards.main_keyboard.settings');
  const mainKeyboardHelp = ctx.i18n.t('keyboards.main_keyboard.help');

  let mainKeyboard = Markup.keyboard([
    [mainKeyboardSubscriptions, mainKeyboardHelpcommands],
    [mainKeyboardSettings, mainKeyboardHelp],
  ]);

  mainKeyboard = mainKeyboard.resize().extra();

  return { mainKeyboard };
};

export default getMainKeyboard;
