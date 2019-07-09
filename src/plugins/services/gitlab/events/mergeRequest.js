import {
  getAuthorDetails,
  parseDate,
  getTimestamp,
  getColorByStatus,
  getFormattedDateField,
  getIconByType,
} from '../helpers';

const mergeRequest = payload => {
  const { user, project, object_attributes: mergeRequestDetails } = payload;
  const authorDetails = getAuthorDetails(user);

  const fields = [
    {
      title: 'Repository',
      value: project.name,
      short: true,
    },
    {
      title: 'Created',
      value: getFormattedDateField(mergeRequestDetails.created_at),
      short: true,
    },
    {
      title: 'Source Branch',
      value: mergeRequestDetails.source_branch,
      short: true,
    },
    {
      title: 'Target Branch',
      value: mergeRequestDetails.target_branch,
      short: true,
    },
  ];

  const actions = [
    {
      type: 'button',
      text: 'See Merge Request',
      url: mergeRequestDetails.url,
    },
  ];

  const timestamp = mergeRequestDetails.updated_at
    ? parseDate(mergeRequestDetails.updated_at)
    : getTimestamp();

  return {
    projectName: project.name,
    mergeRequestId: mergeRequestDetails.id,
    mergeRequestAction: mergeRequestDetails.action,
    mergeRequestUrl: mergeRequestDetails.url,
    mergeRequestTitle: mergeRequestDetails.title,
    mergeRequestIcon: getIconByType(mergeRequestDetails.action),
    color: getColorByStatus(mergeRequestDetails.state),
    authorName: authorDetails.name,
    authorLink: authorDetails.link,
    authorIcon: authorDetails.icon,
    fields,
    actions,
    timestamp,
  };
};

export default mergeRequest;
