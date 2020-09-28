import { CustomContextMessage } from 'telegraf';

const deleteKeyboardMessage = async (ctx: CustomContextMessage) => {
  const chatId = ctx.update.message.chat.id;
  const messageId = ctx.update.message.message_id;

  await ctx.telegram.deleteMessage(chatId, messageId);
};

export default deleteKeyboardMessage;
