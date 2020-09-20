import rp from 'request-promise';

const startDevMode = (botParam) => {
  rp(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/deleteWebhook`).then(() => botParam.startPolling());
};

export default startDevMode;
