import merge from 'webpack-merge';
import Path from 'path';

import { version } from '../../package';

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const SERVER_HOST = process.env.SERVER_HOST || '0.0.0.0';
const SERVER_PORT = process.env.SERVER_PORT || 8091;
const APP_NAME = process.env.APP_NAME || 'My App API';
const API_VERSION = version;
const DISCOVERY_SERVICE_MASK = process.env.DISCOVERY_SERVICE_MASK || 'service::';

const rootDir = Path.dirname(require.main.filename || process.mainModule.filename);
const defaultConfig = {
  debug: {
    global: false,
    request: false,
    response: false,
    error: false,
  },

  rootDir,

  userAgent: `${APP_NAME}/${API_VERSION}`,

  version: API_VERSION,

  services: {
    mask: DISCOVERY_SERVICE_MASK,
  },

  server: {
    app: {
      version: API_VERSION,
    },
    host: SERVER_HOST,
    port: SERVER_PORT,
    router: {
      stripTrailingSlash: true,
    },
    routes: {
      state: {
        // Avoid errors when receiving invalid cookies
        parse: false,
        failAction: 'ignore',
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['X-Requested-With'],
      },
    },
  },

  logging: {
    good: {
      ops: {
        interval: 1000,
      },
      reporters: {
        ConsoleReporter: [
          {
            module: '@hapi/good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }],
          },
          {
            module: '@hapi/good-console',
          },
          'stdout',
        ],
      },
    },
  },
};
const { default: targetConfig } = require(`./${ENVIRONMENT}`); // eslint-disable-line import/no-dynamic-require
const configurations = merge(defaultConfig, targetConfig);

const find = (object, property) => {
  const elements = Array.isArray(property) ? property : property.split('.');
  const name = elements[0];
  const value = object[name];

  if (elements.length <= 1) {
    return value;
  }

  if (value === null || typeof value !== 'object') {
    return undefined;
  }

  return find(value, elements.slice(1));
};

export default class Config {
  /**
     * Briefly inspired by https://github.com/lorenwest/node-config
     */
  static get(property) {
    const value = find(configurations, property);

    if (value === undefined) {
      throw new Error(`Configuration property ${property} was not found!`);
    }

    return value;
  }
}
