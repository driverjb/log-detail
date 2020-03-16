export type Level = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export interface Config {
  enabled?: boolean;
  timestampFormat?: string;
  level?: Level;
  //color?: boolean;
  appName?: string;
}
