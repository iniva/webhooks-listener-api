import GitlabEvent from './event';

export default class GitlabService {
  constructor(slackService) {
    this.slackService = slackService;
    this.skip = false;
  }

  channel(channel = '') {
    this.slackService.channel(channel);

    return this;
  }

  message(message = '') {
    this.slackService.message(message);

    return this;
  }

  attach(attachments = []) {
    this.slackService.attach(attachments);

    return this;
  }

  prepare(headers = {}, payload = {}) {
    const event = new GitlabEvent(headers, payload);

    const content = event.getContent();
    const attachments = [content];

    this.skip = event.shouldSkip();

    return this.attach(attachments);
  }

  async getHooks() { // eslint-disable-line class-methods-use-this
    return GitlabEvent.getEventList();
  }

  async send() {
    if (this.skip) {
      return { status: 'message skipped' };
    }

    return this.slackService.send();
  }

  async preview() {
    if (this.skip) {
      return { status: 'message skipped' };
    }

    return this.slackService.preview();
  }
}
