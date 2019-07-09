import { Dispatcher } from 'slack-webhooks-handler';

export default class SlackService {
  constructor({ webhook }) {
    this.dispatcher = new Dispatcher(webhook);
  }

  channel(channel = '') {
    this.dispatcher.setChannel(channel);

    return this;
  }

  message(message = '') {
    this.dispatcher.setMessage(message);

    return this;
  }

  attach(attachments = []) {
    this.dispatcher.withAttachments(attachments);

    return this;
  }

  async send() {
    return this.dispatcher.send();
  }

  async preview() {
    this.dispatcher.preparePayload();

    return this.dispatcher.payload;
  }
}
