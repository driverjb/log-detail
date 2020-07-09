/**
 * The strings that are allowed to be color modes
 * @typedef {('none'|'basic'|'full')} ColorMode
 */

/**
 * The strings that are allowed to be log levels
 * @typedef {('trace'|'debug'|'info'|'warn'|'error'|'fatal')} LogLevel
 */

const LogEvent = require('./logEvent');

function Crayon() {
  this.namespaceColor = `\u001b[38;5;${Crayon.RANDOM_COLOR.FULL[Math.floor(Math.random() * 19)]}m`;
}
/**
 * Color the log event (if configured to do so)
 * @param {LogEvent} ev
 */
Crayon.prototype.colorLogEvent = function (ev) {
  ev.timestamp = Crayon.COLORS.FULL.brown(ev.timestamp);
  ev.hostname = Crayon.COLORS.FULL.blue(ev.hostname);
  ev.pid = Crayon.COLORS.FULL.red(ev.pid);
  ev.level = this.colorLevel(ev.level);
  ev.nameSpace = `${this.namespaceColor}${ev.nameSpace}${Crayon.COLORS.RESET}`;
  ev.data = Crayon.prepareData(ev.data, ev.uuid);
  ev.message = Crayon.COLORS.FULL.mint(ev.message);
  return ev;
};

/**
 *
 * @param {LogLevel} level
 */
Crayon.prototype.colorLevel = function (level) {
  switch (level) {
    case 'trace':
      return Crayon.COLORS.FULL.blue(level);
    case 'debug':
      return Crayon.COLORS.FULL.cyan(level);
    case 'info':
      return Crayon.COLORS.FULL.green(level);
    case 'warn':
      return Crayon.COLORS.FULL.yellow(level);
    case 'error':
      return Crayon.COLORS.FULL.orange(level);
    case 'fatal':
      return Crayon.COLORS.FULL.red(level);
  }
};

Crayon.prepareData = function (data, uuid) {
  let lB = Crayon.COLORS.FULL.indigo('[');
  let rB = Crayon.COLORS.FULL.indigo(']');
  let colorKey = Crayon.COLORS.FULL.yellow;
  if (!data || Object.keys(data).length === 0) {
    if (uuid) data = { uuid: uuid };
    else return `${lB}${rB}`;
  }
  let o = '';
  for (let k in data) {
    if (data[k] !== undefined) {
      let d = data[k];
      if (typeof d == 'function') {
        let name = d.toString().split('(')[0].split(' ')[1];
        d = `[Function: ${name ? name : 'Anonymous'}]`;
      } else if (d instanceof Error) {
        d = `${d.name}: ${d.message}`;
      } else if (typeof d == 'object') {
        if (d) d = JSON.stringify(d);
      }
      o += o === '' ? `${colorKey(k)}='${d}'` : ` ${colorKey(k)}='${d}'`;
    }
  }
  return `${lB}${o}${rB}`;
};

Crayon.prepareDataNoColor = function (data, uuid) {
  if (!data) {
    if (uuid) data = { uuid: uuid };
    else return `[]`;
  }
  let o = '';
  for (let k in data) {
    if (data[k] !== undefined) {
      let d = data[k];
      if (typeof d == 'function') {
        let name = d.toString().split('(')[0].split(' ')[1];
        d = `[Function: ${name ? name : 'Anonymous'}]`;
      } else if (d instanceof Error) {
        d = `${d.name}: ${d.message}`;
      } else if (typeof d == 'object') {
        if (d) d = JSON.stringify(d);
      }
      o += o === '' ? `${k}='${d}'` : ` ${k}='${d}'`;
    }
  }
  return `[${o}]`;
};

Crayon.makeColorFunction = function (color) {
  return function (text) {
    return `${color}${text}${Crayon.COLORS.RESET}`;
  };
};

Crayon.RANDOM_COLOR = {
  FULL: [33, 34, 39, 42, 48, 51, 57, 63, 80, 88, 93, 95, 105, 120, 129, 160, 167, 184, 200],
};

Crayon.COLORS = {
  FULL: {
    red: Crayon.makeColorFunction('\u001b[38;5;160m'),
    orange: Crayon.makeColorFunction('\u001b[38;5;208m'),
    yellow: Crayon.makeColorFunction('\u001b[38;5;226m'),
    green: Crayon.makeColorFunction('\u001b[38;5;82m'),
    blue: Crayon.makeColorFunction('\u001b[38;5;33m'),
    indigo: Crayon.makeColorFunction('\u001b[38;5;57m'),
    violet: Crayon.makeColorFunction('\u001b[38;5;200m'),
    cyan: Crayon.makeColorFunction('\u001b[38;5;87m'),
    brown: Crayon.makeColorFunction('\u001b[38;5;94m'),
    olive: Crayon.makeColorFunction('\u001b[38;5;100m'),
    white: Crayon.makeColorFunction('\u001b[38;5;255m'),
    maroon: Crayon.makeColorFunction('\u001b[38;5;124m'),
    mint: Crayon.makeColorFunction('\u001b[38;5;157m'),
  },
  RESET: '\u001b[0m',
};

module.exports = Crayon;
