/**
 * @class
 * @constructor
 * @property {string} appName - Name of the application
 * @property {LogLevel} level - Level of the event
 * @property {string} message - Log message
 * @property {string} nameSpace - Namespace for the event. Makes searching for groups of events easier
 * @property {number} pid - Process ID for the running process
 * @property {string} hostname - Hostname of the server running the process
 * @property {string} [uuid] - Unique identifier for the log event. Useful for tracing groups of events that share a common uuid.
 * @property {string} timestamp - Timestamp for when the event occurred
 * @property {Object} data - Key/Value pairs that will be included with log output
 * @param {Object} opts - The data object to initialize a log event
 * @param {string} opts.appName - Name of the application
 * @param {LogLevel} opts.level - Level of the event
 * @param {string} opts.message - Log message
 * @param {string} opts.nameSpace - Namespace for the event. Makes searching for groups of events easier
 * @param {string} opts.uuid - Unique identifier for the log event. Useful for tracing groups of events that share a common uuid.
 * @param {Object} opts.data - Key/Value pairs that will be included with log output
 */
function LogEvent(
  opts = { appName: '', level: '', message: '', nameSpace: '', data: {}, uuid: '' }
) {
  this.appName = opts.appName;
  this.level = opts.level;
  this.message = opts.message;
  this.nameSpace = opts.nameSpace;
  this.data = opts.data;
  this.pid = LogEvent.PID;
  this.hostname = LogEvent.HOSTNAME;
  this.uuid = opts.uuid;
  this.timestamp = LogEvent.generateTimeStamp();
}

LogEvent.generateTimeStamp = function () {
  var dt = new Date();
  let year = dt.getFullYear().toString();
  let month = (dt.getMonth() + 1).toString().padStart(2, '0');
  let day = dt.getDate().toString().padStart(2, '0');
  let hours = dt.getHours().toString().padStart(2, '0');
  let minutes = dt.getMinutes().toString().padStart(2, '0');
  let seconds = dt.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Generate the log event output for the object
 */
LogEvent.prototype.toString = function () {
  return `${this.timestamp} ${this.hostname} ${this.appName} ${this.pid} ${this.level} ${this.nameSpace} ${this.data} ${this.message}`;
};

LogEvent.PID = process.pid;
LogEvent.HOSTNAME = require('os').hostname();

module.exports = LogEvent;
