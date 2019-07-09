import {
  getAuthorDetails,
  parseDate,
  getTimestamp,
  getColorByStatus,
  getFormattedDateField,
  getIconByType,
  getButtonByType,
} from '../helpers';

const pipeline = payload => {
  const {
    user,
    project,
    builds,
    object_attributes: pipelineDetails,
  } = payload;

  const authorDetails = getAuthorDetails(user);
  const pipelineLink = `${project.web_url}/pipelines/${pipelineDetails.id}`;
  const fields = [
    {
      title: 'Status',
      value: pipelineDetails.status,
      short: true,
    },
    {
      title: 'Repository',
      value: project.name,
      short: true,
    },
    {
      title: 'Created',
      value: getFormattedDateField(pipelineDetails.created_at),
      short: true,
    },
  ];
  const actions = [
    {
      type: 'button',
      text: 'See Pipeline',
      url: pipelineLink,
      style: getButtonByType(pipelineDetails.status),
    },
  ];

  if (pipelineDetails.finished_at) {
    fields.push({
      title: 'Finished',
      value: getFormattedDateField(pipelineDetails.finished_at),
      short: true,
    });
  }

  if (pipelineDetails.status === 'failed') {
    const failedJob = builds.filter(build => build.status === 'failed').pop();

    fields.push({
      title: 'Failed Job',
      value: `_${failedJob.name}_ at *${failedJob.stage}* stage`,
    });

    const jobLink = `${project.web_url}/-/jobs/${failedJob.id}`;

    actions.push({
      type: 'button',
      text: 'See Job',
      url: jobLink,
      style: getButtonByType(failedJob.status),
    });
  }


  const timestamp = pipelineDetails.finished_at
    ? parseDate(pipelineDetails.finished_at)
    : getTimestamp();

  return {
    projectName: project.name,
    pipelineId: pipelineDetails.id,
    pipelineBranch: pipelineDetails.ref,
    pipelineStatus: pipelineDetails.status,
    pipelineIcon: getIconByType(pipelineDetails.status),
    pipelineLink,
    color: getColorByStatus(pipelineDetails.status),
    authorName: authorDetails.name,
    authorLink: authorDetails.link,
    authorIcon: authorDetails.icon,
    fields,
    actions,
    timestamp,
  };
};

export default pipeline;
