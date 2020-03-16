import { Level } from './interfaces';
import moment from 'moment-timezone';
import { configuration } from './configuration';

interface DataPoints {
  [key: string]: any;
}

export class Writer {
  private namespace: string;
  private level: number;
  constructor(namespace: string) {
    this.namespace = namespace;
    this.level = Writer.levelToNumber(configuration.level);
  }
  private prepareData(data?: DataPoints, uuid?: string) {
    if (!data) {
      if (uuid) data = { uuid: uuid };
      else return '[]';
    } else {
      if (uuid) Object.assign(data, { uuid: uuid });
    }
    let o = '';
    for (let k in data) {
      let d = typeof data[k] == 'object' ? (data[k] ? JSON.stringify(data[k]) : data[k]) : data[k];
      if (typeof d == 'function') {
        let name = d
          .toString()
          .split('(')[0]
          .split(' ')[1];
        d = `[Function: ${name ? name : 'Anonymous'}]`;
      }
      o += o === '' ? `${k}='${d}'` : ` ${k}='${d}'`;
    }
    return `[${o}]`;
  }
  private write(level: Level, message: string, data?: DataPoints, uuid?: string): boolean {
    let l = Writer.levelToNumber(level);
    if (l >= this.level) {
      let time = moment().format(configuration.timestampFormat);
      let d = this.prepareData(data, uuid);
      console.error(
        `${time} ${configuration.hostname} ${configuration.appName}[${configuration.pid}]: ${level} ${this.namespace} ${d} ${message}`
      );
      return true;
    } else return false;
  }
  /**
   * Write a log event of level trace
   * @param message
   * @param data
   * @param uuid
   */
  public trace(message: string, data?: DataPoints, uuid?: string): boolean {
    return this.write('trace', message, data, uuid);
  }
  /**
   * Write a log event of level debug
   * @param message
   * @param data
   * @param uuid
   */
  public debug(message: string, data?: DataPoints, uuid?: string) {
    return this.write('debug', message, data, uuid);
  }
  /**
   * Write a log event of level info
   * @param message
   * @param data
   * @param uuid
   */
  public info(message: string, data?: DataPoints, uuid?: string) {
    return this.write('info', message, data, uuid);
  }
  /**
   * Write a log event of level warn
   * @param message
   * @param data
   * @param uuid
   */
  public warn(message: string, data?: DataPoints, uuid?: string) {
    return this.write('warn', message, data, uuid);
  }
  /**
   * Write a log event of level error
   * @param message
   * @param data
   * @param uuid
   */
  public error(message: string, data?: DataPoints, uuid?: string) {
    return this.write('error', message, data, uuid);
  }
  /**
   * Write a log event of level fatal
   * @param message
   * @param data
   * @param uuid
   */
  public fatal(message: string, data?: DataPoints, uuid?: string) {
    return this.write('fatal', message, data, uuid);
  }
  /**
   * Create a new Writer instance based off of the current namespace
   * @param message
   * @param data
   * @param uuid
   */
  public spawnSubWriter(namespace: string) {
    return new Writer(`${this.namespace}:${namespace}`);
  }
  private static levelToNumber(level: Level) {
    switch (level) {
      case 'trace':
        return 1;
      case 'debug':
        return 2;
      case 'info':
        return 3;
      case 'warn':
        return 4;
      case 'error':
        return 5;
      case 'fatal':
        return 6;
    }
  }
}
