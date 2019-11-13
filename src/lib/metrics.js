import { noop } from "lodash";
import amplitude from 'amplitude-js';

const amplitudeInstance = amplitude.getInstance();

export const trackEvent = (eventName, opts = {}, callback = noop) => {
  if (typeof amplitude !== "object") {
    return callback();
  }

  amplitudeInstance.logEvent(eventName, opts, callback);
};

export const trackOutboundLink = event => {
  if (typeof amplitude !== "object") {
    return;
  }

  event.preventDefault();

  const eventName = "outbound link click";
  const href = event.target.href;
  const target = event.target.target;
  const opts = {
    href,
  };
  const callback = () => {
    window.open(href, target);
  };

  // track event
  amplitudeInstance.logEvent(eventName, opts, callback);
};