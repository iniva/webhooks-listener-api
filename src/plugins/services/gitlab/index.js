import GitlabService from './service';

const name = 'gitlab-service';

export default {
  name,
  register: async (server, { mask, slackService }) => {
    const service = new GitlabService(slackService);

    server.decorate('server', `${mask}gitlab`, service);
  },
};
