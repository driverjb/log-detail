import { hostname } from 'os';
import { Level } from './interfaces';

export const configuration = {
  enabled: true,
  level: 'info' as Level,
  timestampFormat: 'YYYY-MM-DD HH:mm:ss',
  appName: 'myApp',
  hostname: hostname(),
  pid: process.pid.toString(),
  color: 'none'
};
