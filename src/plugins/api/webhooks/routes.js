import WebhooksController from './controller';

const API_PATH = '/webhooks';

export default [
  {
    method: 'GET',
    path: `${API_PATH}/gitlab`,
    options: {
      description: 'Returns a list of available Gitlab Webhooks',
      handler: WebhooksController.list,
    },
  },

  {
    method: 'POST',
    path: `${API_PATH}/gitlab/{repoName}`,
    options: {
      description: 'Triggers a Gitlab Webhook for the specified Repository',
      handler: WebhooksController.gitlab,
    },
  },
];
