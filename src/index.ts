export * from './writer';
export * from './interfaces';
import { Config } from './interfaces';
import { configuration } from './configuration';

export function setConfiguration(cfg: Config) {
  Object.assign(configuration, cfg);
}
