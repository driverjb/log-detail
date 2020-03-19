export * from './writer';
export * from './interfaces';
import { Config } from './interfaces';
import { configuration } from './configuration';
import { setColorMode, Mode, host, pid } from './colors';

export function setConfiguration(cfg: Config) {
  Object.assign(configuration, cfg);
  setColorMode(configuration.color as Mode);
  configuration.hostname = host(configuration.hostname);
  configuration.pid = pid(configuration.pid);
}
