import { Markup } from 'telegraf';

const getMainKeyboard = (ctx) => {
  const mainKeyboardSubscriptions = ctx.i18n.t('keyboards.main_keyboard.my_subscriptions');
  const mainKeyboardHelpcommands = ctx.i18n.t('keyboards.main_keyboard.helpcommands');
  const mainKeyboardHelp = ctx.i18n.t('keyboards.main_keyboard.help');

  let mainKeyboard = Markup.keyboard([
    [mainKeyboardSubscriptions, mainKeyboardHelpcommands],
    [mainKeyboardHelp],
  ]);

  mainKeyboard = mainKeyboard.resize().extra();

  return { mainKeyboard };
};

export default getMainKeyboard;
