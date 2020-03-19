import { Level } from './interfaces';

export type Mode = 'none' | 'basic' | 'full';

var mode = 'none';
const reset = '\u001b[0m';

enum BasicColor {
  red = '\u001b[31m',
  green = '\u001b[32m',
  yellow = '\u001b[33m',
  blue = '\u001b[34;1m',
  magenta = '\u001b[35m',
  cyan = '\u001b[36m',
  black = '\u001b[30m',
  white = '\u001b[37m'
}
enum FullColor {
  red = '\u001b[38;5;160m',
  orange = '\u001b[38;5;208m',
  yellow = '\u001b[38;5;226m',
  green = '\u001b[38;5;82m',
  blue = '\u001b[38;5;33m',
  indigo = '\u001b[38;57;m',
  violet = '\u001b[38;5;200m',
  cyan = '\u001b[38;5;87m',
  brown = '\u001b[38;5;94m',
  olive = '\u001b[38;5;100m',
  white = '\u001b[38;5;255m',
  maroon = '\u001b[38;5;124m',
  mint = '\u001b[38;5;155m'
}

function color(target: string, color: BasicColor | FullColor) {
  if (mode != 'none') return `${color}${target}${reset}`;
  else return target;
}

function rawColor(target: string, color: string) {
  if (mode != 'none') return `${color}${target}${reset}`;
  else return target;
}

export function getRandomColor() {
  if (mode == 'none') return '';
  if (mode == 'basic') return `\u001b[${Math.floor(Math.random() * 197 + 32)};1m`;
  else return `\u001b[38;5;155m`;
}

export function level(level: Level) {
  let c: BasicColor | FullColor;
  let full = mode == 'full';
  switch (level) {
    case 'trace':
      c = full ? FullColor.blue : BasicColor.blue;
    case 'debug':
      c = full ? FullColor.cyan : BasicColor.cyan;
    case 'info':
      c = full ? FullColor.green : BasicColor.green;
    case 'warn':
      c = full ? FullColor.yellow : BasicColor.yellow;
    case 'error':
      c = full ? FullColor.orange : BasicColor.red;
    case 'fatal':
      c = full ? FullColor.red : BasicColor.magenta;
  }
  return color(level, c);
}

export function timestamp(timestamp: string) {
  return mode == 'full' ? color(timestamp, FullColor.maroon) : color(timestamp, BasicColor.red);
}

export function host(host: string) {
  return mode == 'full' ? color(host, FullColor.blue) : color(host, BasicColor.blue);
}

export function pid(pid: string) {
  return mode == 'full' ? color(pid, FullColor.red) : color(pid, BasicColor.red);
}

export function bracket(bracket: string) {
  return mode == 'full' ? color(bracket, FullColor.indigo) : color(bracket, BasicColor.blue);
}

export function dataKey(dataKey: string) {
  return mode == 'full' ? color(dataKey, FullColor.yellow) : color(dataKey, BasicColor.yellow);
}

export function message(message: string) {
  return mode == 'full' ? color(message, FullColor.mint) : message;
}

export function namespace(namespace: string, color: string) {
  return rawColor(namespace, color);
}

export function setColorMode(m: Mode) {
  mode = m;
}
