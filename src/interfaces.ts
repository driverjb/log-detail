export type Level = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export interface Config {
  /** Enable/Disable logging globally */
  enabled?: boolean;
  /** Set the minimum level of logging for output */
  level?: Level;
  //color?: boolean;
  /** Name of the application being logged */
  appName?: string;
  color?: 'full' | 'basic' | 'none';
}
