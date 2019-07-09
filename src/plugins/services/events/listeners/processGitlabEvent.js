import Boom from '@hapi/boom';

import Base from './base';
import Logger from 'Utils/logger';
import repositories from 'Config/repositories';

const NAME = 'processGitlabEvent';

const log = Logger.create(`plugins:api:events:listeners:${NAME}`);

export default class ProcessGitlabEvent extends Base {
  constructor() {
    super(NAME);
  }

  // eslint-disable-next-line class-methods-use-this
  async getHandler({ gitlabService, data }) {
    const { headers, params, payload } = data;

    try {
      const { channel } = repositories[params.repoName];

      const message = await gitlabService
        .channel(channel)
        .prepare(headers, payload)
        .send();

      console.log(message);
    } catch (error) {
      throw Boom.badRequest(error);
    }

    log(`Processed event from repository [${params.repoName}]`);
  }
}
