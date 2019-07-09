import {
  getEventFromHeaders,
  getEventFromPayload,
  shouldSkipEvent,
} from './helpers';
import parser from './parser';
import pipeline from './events/pipeline';
import mergeRequest from './events/mergeRequest';
import tagPush from './events/tagPush';
import note from './events/note';

const events = {
  pipeline,
  mergeRequest,
  tagPush,
  note,
};

const normalizedType = type => type.replace(/_\w/g, match => match[1].toUpperCase());

export default class Event {
  constructor(headers, payload) {
    const eventTitle = getEventFromHeaders(headers);

    if (!payload) {
      throw new Error(`Event [${eventTitle}] has no payload`);
    }

    const eventType = getEventFromPayload(payload);
    const event = normalizedType(eventType);

    if (!Object.keys(events).includes(event)) {
      throw new Error(`Event [${eventType}] is not available in GitLab webhooks`);
    }

    this.data = events[event](payload);
    this.content = parser(event, this.data);
    this.skip = shouldSkipEvent(event, this.data);

    logToNewRelic(event, this.data, payload);
  }

  static getEventList() {
    return Object.keys(events);
  }

  shouldSkip() {
    return this.skip;
  }

  getData() {
    return this.data;
  }

  getContent() {
    return this.content;
  }
}
