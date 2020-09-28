declare module 'telegraf-i18n' {
  export interface I18n {
    locale(languageCode: string): void;
  }

  // eslint-disable-next-line import/prefer-default-export
  export function match(resourceKey: string, templateData?: any): string;
}
