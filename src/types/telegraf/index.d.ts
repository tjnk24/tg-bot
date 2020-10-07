import { IGroup } from '@models/Group';
import { I18n } from 'telegraf-i18n';
import { TelegrafContext } from 'telegraf/typings/context';

declare module 'telegraf' {
  export interface CustomContextMessage extends TelegrafContext {
    i18n: I18n;
    scene: any;
    session: {
      groups: IGroup[];
      settingsScene: {
        messagesToDelete: any[];
      };
      language: 'en' | 'ru';
    }
    group: any;
    webhookReply: boolean;
  }
}
