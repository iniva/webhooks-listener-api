import {
  getAuthorDetails,
  parseDate,
  getTimestamp,
  getColorByStatus,
  getFormattedDateField,
  getIconByType,
} from '../helpers';

const note = payload => {
  const { user, project, object_attributes: noteDetails } = payload;
  const authorDetails = getAuthorDetails(user);

  const fields = [
    {
      title: 'Repository',
      value: project.name,
      short: true,
    },
    {
      title: 'Created',
      value: getFormattedDateField(noteDetails.created_at),
      short: true,
    },
    {
      title: 'Comment',
      value: noteDetails.note,
    },
  ];

  const actions = [
    {
      type: 'button',
      text: 'See Comment',
      url: noteDetails.url,
    },
  ];

  const timestamp = noteDetails.updated_at
    ? parseDate(noteDetails.updated_at)
    : getTimestamp();

  return {
    projectName: project.name,
    mergeRequestId: payload.merge_request.id,
    mergeRequestTitle: payload.merge_request.title,
    commentIcon: getIconByType('comment'),
    commentLink: noteDetails.url,
    color: getColorByStatus('info'),
    authorName: authorDetails.name,
    authorLink: authorDetails.link,
    authorIcon: authorDetails.icon,
    fields,
    actions,
    timestamp,
  };
};

export default note;
