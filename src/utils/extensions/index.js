import onRequestEvent from './onRequestEvent';
import onPreHandlerEvent from './onPreHandlerEvent';
import onPreResponseEvent from './onPreResponseEvent';

export default class Extensions {
  static register(server) {
    server.ext(onRequestEvent);
    server.ext(onPreHandlerEvent);
    server.ext(onPreResponseEvent);
  }
}
