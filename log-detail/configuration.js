/**
 * The strings that are allowed to be log levels
 * @typedef {('trace'|'debug'|'info'|'warn'|'error'|'fatal')} LogLevel
 */

/**
 * A configuration object for the {@link Writer} class.
 * @class
 * @constructor
 * @property {string} appName - Name of the application that these events belong to
 * @property {boolean} enabled - Print log events if enabled
 * @property {LogLevel} level - Minimum level required before an event is written
 * @property {boolean} color - Color log output
 * @param {Object} obj The object containing all settings for the {@link Writer} class
 * @param {string} [obj.appName=MyApp] The name of the application.
 * @param {boolean} [obj.enabled=true] Print logs or not.
 * @param {LogLevel} [obj.level=info] Minimum level required before a log event is written.
 * @param {boolean} [obj.color=false] Color on or off
 */
function Configuration(obj = { appName: '', enabled: true, level: 'info', color: false }) {
  this.appName = obj.appName || Configuration.DEFAULTS.APP_NAME;
  this.enabled = obj.enabled !== undefined ? obj.enabled : Configuration.DEFAULTS.ENABLED;
  this.color = obj.color !== undefined ? obj.color : Configuration.DEFAULTS.COLOR;
  let level = Configuration.DEFAULTS.LEVEL; //make sure it's included in the object definition

  /**
   * The current log level of the configuration
   * @returns {LogLevel}
   */
  this.__defineGetter__('level', function () {
    return level;
  });
  /**
   * Set the level of the configuration object for logging
   * @param {LogLevel} newLevel The new log level: trace, debug, info, warn, error, fatal
   * @throws {Error} Invalid log level
   */
  this.setLevel = (newLevel) => {
    newLevel = newLevel.toLowerCase();
    if (newLevel in Configuration.validLevels) {
      level = newLevel;
    } else {
      throw new Error(`Invalid log level: ${newLevel}`);
    }
  };
  /**
   * Determines assists the {@link Writer} with whether or not it should output a log event.
   * @param {LogLevel} testLevel The level of the log event that will be written
   * @returns {boolean} Should write true or false
   */
  this.shouldPrintEvent = function (testLevel) {
    return (
      this.enabled &&
      Configuration.validLevels[testLevel.toLowerCase()] >= Configuration.validLevels[level]
    );
  };
  this.setLevel(obj.level || Configuration.DEFAULTS.LEVEL);
}

/** The valid log levels converted to numbers for determining if a log event should fire. See: ${@link LogLevel} */
Configuration.validLevels = Object.freeze({
  trace: 1,
  debug: 2,
  info: 3,
  warn: 4,
  error: 5,
  fatal: 6,
});

/**
 * Default values for {@link Configuration} objects
 * @property {string} LEVEL=info Initial log level
 * @property {string} COLOR=false Initial color mode
 */
Configuration.DEFAULTS = Object.freeze({
  LEVEL: 'info',
  COLOR: false,
  ENABLED: true,
  APP_NAME: 'MyApp',
});

module.exports = Configuration;
