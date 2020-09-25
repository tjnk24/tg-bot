import Stage from 'telegraf/stage';
import Scene from 'telegraf/scenes/base';
import logger from '../../utils/logger';
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
  deleteFromSession(ctx, 'settingsScene');
});

settings.command('saveme', leave());

settings.action(/languageSettings/, languageSettingsAction);
settings.action(/languageChange/, languageChangeAction);

export default settings;
