import {
  getAuthorDetails,
  getTimestamp,
  getDate,
  getColorByStatus,
  getFormattedDateField,
  getIconByType,
  getButtonByType,
} from '../helpers';
// import Loader from 'Utils/helpers/loader';

const tagPush = payload => {
  // const loader = new Loader(payload);
  const { project } = payload;
  const authorDetails = getAuthorDetails({
    name: payload.user_name,
    username: payload.user_username,
    avatar_url: payload.user_avatar,
  });

  const tagVersionPath = payload.ref.replace('refs/', '');
  const tagLink = `${project.web_url}/${tagVersionPath}`;

  const fields = [
    {
      title: 'Repository',
      value: project.name,
      short: true,
    },
    {
      title: 'Created',
      value: getFormattedDateField(getDate()),
      short: true,
    },
  ];

  const actions = [
    {
      type: 'button',
      text: 'See Tag',
      url: tagLink,
      style: getButtonByType('success'),
    },
  ];

  const timestamp = getTimestamp();

  return {
    projectName: project.name,
    tagVersion: tagVersionPath.split('/').pop(),
    tagIcon: getIconByType('success'),
    tagLink,
    color: getColorByStatus('success'),
    authorName: authorDetails.name,
    authorLink: authorDetails.link,
    authorIcon: authorDetails.icon,
    thumbUrl: project.avatar_url,
    fields,
    actions,
    timestamp,
  };
};

export default tagPush;
