const webhookUrl = process.env.SLACK_WEBHOOK_URL || '';
const webhookBotName = process.env.SLACK_WEBHOOK_BOT_NAME || 'My App Webhook';

export default {
  webhook: {
    url: webhookUrl,
    botName: webhookBotName,
  },
};
