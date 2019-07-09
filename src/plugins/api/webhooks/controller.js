import Boom from '@hapi/boom';

import repositories from 'Config/repositories';

export default class WebhooksController {
  static async list(request) {
    const gitlabService = request.server.discoveryService.get('gitlab');
    const events = await gitlabService.getHooks();

    return {
      data: events,
    };
  }

  static async gitlab(request) {
    const {
      headers,
      params,
      payload,
      server,
    } = request;

    if (!Object.keys(repositories).includes(params.repoName)) {
      return Boom.badRequest(new Error(`Repository [${params.repoName}] is not available`));
    }

    const { discoveryService } = server;
    const eventService = discoveryService.get('events');

    const args = {
      gitlabService: discoveryService.get('gitlab'),
      data: {
        headers,
        params,
        payload,
      },
    };

    try {
      eventService.fire('processGitlabEvent', args);
    } catch (error) {
      return Boom.badRequest(error.message, error);
    }

    return {
      data: {
        message: `Received event from repository ${params.repoName}`,
      },
    };
  }
}
