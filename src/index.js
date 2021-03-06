import Hapi from '@hapi/hapi';
import blipp from 'blipp';
import Good from '@hapi/good';

import Config from './config';
import SLACK from 'Config/slack';
import Plugins from './plugins';
import Extensions from 'Utils/extensions';
import Logger from 'Utils/logger';

const options = Config.get('server');
const server = Hapi.server(options);
const log = Logger.create();

const init = async () => {
  try {
    // Community Plugins
    await server.register(blipp);
    await server.register({
      plugin: Good,
      options: Config.get('logging.good'),
    });

    // Our Plugins
    const pluginOptions = {
      services: {
        ...Config.get('services'),
        slack: SLACK,
      },
    };

    await Plugins.register(server, pluginOptions);

    // Register Server Extensions
    Extensions.register(server);

    // Server Init
    await server.start();
    log(`${process.env.APP_NAME} ${Config.get('version')} running at ${server.info.uri}`);
  } catch (error) {
    log(`There was an error while starting the server: ${error.message}`);
    log(error);
  }
};

process.on('unhandledRejection', err => {
  log('An Unhandled Rejection occurred.');
  log(err);
});

(async () => {
  await init();
})();
