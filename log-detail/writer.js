const Configuration = require('./configuration');
const LogEvent = require('./logEvent');
const Crayon = require('./crayon');

var default_config = new Configuration();

/**
 * @class
 * @constructor
 * @param {string} namespace The namespace for all log events written by this Writer
 * @param {Configuration} config The configuration to use for this {@link Writer}
 */
function Writer(namespace, config) {
  this.namespace = namespace || 'default';
  this.config = config || default_config;
  this.crayon = new Crayon();
}

Writer.prototype.generateEvent = function (level, message, data, uuid) {
  if (this.config.shouldPrintEvent(level)) {
    let e = new LogEvent({
      appName: this.config.appName,
      nameSpace: this.namespace,
      message: message,
      level: level,
      data: data,
      uuid: uuid,
    });
    if (this.config.color) e = this.crayon.colorLogEvent(e);
    else e.data = Crayon.prepareDataNoColor(e.data, e.uuid);
    console.log(e.toString());
    return true;
  }
  return false;
};

Writer.prototype.spawnSubWriter = function (namespaceExtension, config) {
  return new Writer(`${this.namespace}:${namespaceExtension}`, config ? config : this.config);
};

/**
 * Write a log event at the trace level
 * @param {string} message - the message to print for the log event
 * @param {object} [data] - key value pairs that will be included with the event as details
 * @param {string} [uuid] - a unique identifier that will be appended to the data block if provided
 */
Writer.prototype.trace = function (message, data, uuid) {
  return this.generateEvent('trace', message, data, uuid);
};

/**
 * Write a log event at the debug level
 * @param {string} message - the message to print for the log event
 * @param {object} [data] - key value pairs that will be included with the event as details
 * @param {string} [uuid] - a unique identifier that will be appended to the data block if provided
 */
Writer.prototype.debug = function (message, data, uuid) {
  return this.generateEvent('debug', message, data, uuid);
};

/**
 * Write a log event at the info level
 * @param {string} message - the message to print for the log event
 * @param {object} [data] - key value pairs that will be included with the event as details
 * @param {string} [uuid] - a unique identifier that will be appended to the data block if provided
 */
Writer.prototype.info = function (message, data, uuid) {
  return this.generateEvent('info', message, data, uuid);
};
/**
 * Write a log event at the warn level
 * @param {string} message - the message to print for the log event
 * @param {object} [data] - key value pairs that will be included with the event as details
 * @param {string} [uuid] - a unique identifier that will be appended to the data block if provided
 */
Writer.prototype.warn = function (message, data, uuid) {
  return this.generateEvent('warn', message, data, uuid);
};
/**
 * Write a log event at the error level
 * @param {string} message - the message to print for the log event
 * @param {object} [data] - key value pairs that will be included with the event as details
 * @param {string} [uuid] - a unique identifier that will be appended to the data block if provided
 */
Writer.prototype.error = function (message, data, uuid) {
  return this.generateEvent('error', message, data, uuid);
};
/**
 * Write a log event at the fatal level
 * @param {string} message - the message to print for the log event
 * @param {object} [data] - key value pairs that will be included with the event as details
 * @param {string} [uuid] - a unique identifier that will be appended to the data block if provided
 */
Writer.prototype.fatal = function (message, data, uuid) {
  return this.generateEvent('fatal', message, data, uuid);
};

/**
 * Set the default configuration for Writers created without passing Configuration object.
 * This can be used instead of creating a LogSpawner
 * @param {Configuration} config
 */
Writer.setDefaultConfiguration = function (config) {
  default_config = config;
};

module.exports = Writer;
