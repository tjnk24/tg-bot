import { CustomContextMessage, BaseScene } from 'telegraf';
import logger from '@utils/logger';
import { deleteFromSession } from '@utils/session';
import { getSettingsKeyboard, sendMessageToBeDeletedLater } from './helpers';
import {
  languageSettingsAction,
  languageChangeAction,
} from './actions';

const settings = new BaseScene('settings');

settings.enter(async (ctx: CustomContextMessage) => {
  logger.debug(ctx, 'Enters settings scene');

  deleteFromSession(ctx, 'settingsScene');

  await sendMessageToBeDeletedLater(
    ctx,
    'scenes.settings.what_to_change',
    getSettingsKeyboard(ctx),
  );
});

settings.leave(async (ctx: CustomContextMessage) => {
  deleteFromSession(ctx, 'settingsScene');
});

settings.action(/languageSettings/, languageSettingsAction);
settings.action(/languageChange/, languageChangeAction);

export default settings;
