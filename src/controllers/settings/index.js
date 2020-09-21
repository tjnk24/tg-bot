import Stage from 'telegraf/stage';
import Scene from 'telegraf/scenes/base';
import logger from '../../utils/logger';
import getMainKeyboard from '../../utils/keyboards';
import { deleteFromSession } from '../../utils/session';
import { getSettingsKeyboard, sendMessageToBeDeletedLater } from './helpers';
import {
  languageSettingsAction,
  languageChangeAction,
} from './actions';

const { leave } = Stage;
const settings = new Scene('settings');

settings.enter(async (ctx) => {
  logger.debug(ctx, 'Enters settings scene');

  deleteFromSession(ctx, 'settingsScene');

  await sendMessageToBeDeletedLater(
    ctx,
    'scenes.settings.what_to_change',
    getSettingsKeyboard(ctx),
  );
});

settings.leave(async (ctx) => {
  const { mainKeyboard } = getMainKeyboard(ctx);
  await ctx.reply(ctx.i18n.t('scenes.settings.language_changed'), mainKeyboard);
  deleteFromSession(ctx, 'settingsScene');
});

settings.command('saveme', leave());

settings.action(/languageSettings/, languageSettingsAction);
settings.action(/languageChange/, languageChangeAction);

export default settings;
