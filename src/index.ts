export * from './writer';
export * from './interfaces';
import { Config } from './interfaces';
import { configuration } from './configuration';
import { setColorMode, Mode, host, pid } from './colors';
import moment from 'moment-timezone';

/**
 * Set the configuration of the log module
 * @param cfg - The configuration object
 */
export function setConfiguration(cfg: Config) {
  Object.assign(configuration, cfg);
  setColorMode(configuration.color as Mode);
  configuration.hostname = host(configuration.hostname);
  configuration.pid = pid(configuration.pid);
}

/**
 * Get a timestamp formatted like the current configuration
 */
export function getTimeStamp() {
  return moment().format(configuration.timestampFormat);
}
