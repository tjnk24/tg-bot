import { CustomContextMessage } from 'telegraf';
import * as rp from 'request-promise';
import cheerio from 'cheerio';
import User from '@models/User';
import logger from '@utils/logger';
import maximum_groups from '@utils/bot-values';

const canSubscribe = async (
  ctx: CustomContextMessage,
  groupUrl: string,
  groupUrlName: string,
) => {
  logger.debug(undefined, 'Checking if page is available');

  const user = await User.findById(ctx.from.id);

  // проверка на кол-во групп у пользователя
  if (user.totalGroups >= maximum_groups) {
    return { i18n: 'maximum_subscriptions' };
  }

  // проверка, не подписан ли пользователь уже на этот паблик
  if (user.observableGroups.some((group) => group._id === groupUrlName)) {
    return { i18n: 'already_subscribed' };
  }

  const htmlResponse = await rp.get(groupUrl)
    .catch(() => false);

  if (htmlResponse) {
    const $ = cheerio.load(htmlResponse);

    const isPublic = $('.wall_posts').length;

    // проверка на приватную группу
    if (!isPublic) return { i18n: 'group_is_private' };

    const title = $('.basisGroup__groupTitle').text().trim();

    return {
      i18n: 'successfully_subscribed',
      title,
    };
  }

  return { i18n: 'wrong_address' };
};

export default canSubscribe;
