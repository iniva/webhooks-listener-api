// Services Plugins
import discoveryService from './services/discovery';
import slackService from './services/slack';
import eventsService from './services/events';
import gitlabService from './services/gitlab';
// API Plugins
import health from './api/health';
import webhooks from './api/webhooks';

export default class Plugins {
  static async register(server, options) {
    // Services
    // Dependency Services
    // This services are registered first because there are services that depend on them
    await server.register([
      {
        plugin: discoveryService,
        options: {
          mask: options.services.mask,
        },
      },
      {
        plugin: slackService,
        options: {
          mask: options.services.mask,
          ...options.services.slack,
        },
      },
    ]);
    // This services are registered after their dependencies are ready
    await server.register([
      {
        plugin: eventsService,
        options: {
          mask: options.services.mask,
        },
      },
      {
        plugin: gitlabService,
        options: {
          mask: options.services.mask,
          slackService: server.discoveryService.get('slack'),
        },
      },
    ]);

    // API
    await server.register([
      health,
      webhooks,
    ]);
  }
}
