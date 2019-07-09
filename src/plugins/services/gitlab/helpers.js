import Loader from 'Utils/helpers/loader';
import eventSchemas from './schemas';
import skipRules from './skipRules';
import { COLOR_ALL, ICON_ALL, BUTTON_ALL } from '../slack/constants';

/**
 * @function getAuthorDetails
 * @description Returns details for the author of the Event
 *
 * @param {Object}
 *
 * @returns {Object}
 */
const getAuthorDetails = ({ name, username, avatar_url: avatarUrl }) => ({
  name,
  link: `${process.env.GITLAB_DOMAIN}/${username}`,
  icon: avatarUrl,
});

/**
 * @function getEventFromPayload
 * @description Gets the event type from the Event payload
 *
 * @param {Object}
 *
 * @returns {String}
 */
const getEventFromPayload = ({ object_kind: eventType }) => eventType;

/**
 * @function getEventFromHeaders
 * @description Gets the event type from the Event headers
 *
 * @param {Object}
 *
 * @returns {String}
 */
const getEventFromHeaders = (headers = {}) => {
  const eventHeader = 'x-gitlab-event';

  if (!Object.keys(headers).includes(eventHeader)) {
    throw new Error('GitLab Event is not present in headers');
  }

  return headers[eventHeader].replace('Hook', '').trim();
};

/**
 * @function getEventStatusFromPayload
 * @description Gets the event status from the Event payload
 *
 * @param {String} eventType
 * @param {Object} payload
 *
 * @returns {String}
 */
const getEventStatusFromPayload = (eventType, payload) => {
  const loader = new Loader(payload);
  const statusField = eventSchemas.status[eventType];

  if (statusField.includes('custom:')) {
    return statusField.split(':').pop();
  }

  return loader.get(statusField);
};

/**
 * @function parseDate
 * @description Converts a date string into a timestamp expressed in seconds
 *
 * @param {String} dateString
 *
 * @returns {Number}
 */
const parseDate = dateString => Math.round(Date.parse(dateString) / 1000);

/**
 * @function getTimestamp
 * @description Returns the current timestamp expressed in seconds
 *
 * @returns {Number}
 */
const getTimestamp = () => Math.round((new Date()).getTime() / 1000);

/**
 * @function getDate
 * @description Returns the current ISO date
 *
 * @returns {String}
 */
const getDate = () => (new Date()).toISOString();

/**
 * @function getFormattedDateField
 * @description Converts a date string into a Slack formatted date
 *
 * @param {String} dateString
 *
 * @returns {String}
 */
const getFormattedDateField = dateString => {
  const timestamp = parseDate(dateString);

  return `<!date^${timestamp}^{date_short} {time}|${dateString}>`;
};

const getCleanText = text => {
  const cleaned = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, ' ');

  return cleaned;
};

/**
 * @function getColorByStatus
 * @description Returns a color according to the Event Status
 *
 * @param {String} status
 *
 * @returns {String}
 */
const getColorByStatus = status => COLOR_ALL[status] || COLOR_ALL.default;

/**
 * @function getIconByType
 * @description Returns an icon according to the Event status type
 *
 * @param {String} type
 *
 * @returns {String}
 */
const getIconByType = type => ICON_ALL[type] || ICON_ALL.default;

/**
 * @function getButtonByType
 * @description Returns a button type according to the Event status type
 *
 * @param {String} type
 *
 * @returns {(String|undefined)}
 */
const getButtonByType = type => BUTTON_ALL[type] || undefined;

/**
 * @function shouldSkipEvent
 * @description Determines if an event must be skipped so to avoid sending a message
 *
 * @param {String} event
 * @param {Object} data
 *
 * @returns {Boolean}
 */
const shouldSkipEvent = (event, data) => {
  const rules = skipRules[event] || false;

  if (!rules) {
    return false;
  }

  const { targetField, skippable } = rules;
  const value = data[targetField];

  return skippable.includes(value);
};

export {
  getAuthorDetails,
  getEventFromPayload,
  getEventFromHeaders,
  parseDate,
  getTimestamp,
  getDate,
  getFormattedDateField,
  getCleanText,
  getColorByStatus,
  getIconByType,
  getButtonByType,
  getEventStatusFromPayload,
  shouldSkipEvent,
};
