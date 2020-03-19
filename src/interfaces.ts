export type Level = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export interface Config {
  /** Enable/Disable logging globally */
  enabled?: boolean;
  /** Refer to moment module for formatting string options */
  timestampFormat?: string;
  /** Set the minimum level of logging for output */
  level?: Level;
  //color?: boolean;
  /** Name of the application being logged */
  appName?: string;
  color?: 'full' | 'basic' | 'none';
}
