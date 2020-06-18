require('mocha');

const assert = require('assert');
const Configuration = require('./log-detail/configuration');
const Writer = require('./log-detail/writer');

describe('Log Detail Module', function () {
  describe('Class: Configuration', function () {
    it('Should initialize with no parameters using appropriate defaults', function () {
      let c = new Configuration();
      assert.equal(c.color, Configuration.DEFAULTS.COLOR);
      assert.equal(c.enabled, Configuration.DEFAULTS.ENABLED);
      assert.equal(c.level, Configuration.DEFAULTS.LEVEL);
      assert.equal(c.appName, Configuration.DEFAULTS.APP_NAME);
    });
    it('Should throw an error when an invalid log level is set', function () {
      let c = new Configuration();
      assert.throws(() => c.setLevel('test'));
      assert.doesNotThrow(() => c.setLevel('fatal'));
    });
    it('Should approve writing for the level equal to and above the set level', function () {
      let c = new Configuration();
      assert.equal(c.shouldPrintEvent('info'), true);
      assert.equal(c.shouldPrintEvent('warn'), true);
      assert.equal(c.shouldPrintEvent('error'), true);
      assert.equal(c.shouldPrintEvent('fatal'), true);
      assert.equal(c.shouldPrintEvent('debug'), false);
      assert.equal(c.shouldPrintEvent('trace'), false);
    });
    it('Should allow custom configuration initialization', function () {
      let c = new Configuration({ appName: 'test', color: true, level: 'trace', enabled: false });
      assert.equal(c.color, true);
      assert.equal(c.enabled, false);
      assert.equal(c.level, 'trace');
      assert.equal(c.appName, 'test');
    });
  });
  describe('Class: Writer', function () {
    let c = new Configuration({ appName: 'Test', color: true, enabled: true, level: 'trace' });
    it('Output log entries set on trace level', function () {
      let w = new Writer('test:1', c);
      let uuid = 'abc123456789';
      let e = new Error('Test error');
      let f = function TestFunc() {};
      let fanon = function () {};
      e.name = 'UnitTestError';
      let results = [
        w.trace('Trace message', { some: 'data', obj: { hello: 'world' }, und: undefined }, uuid),
        w.debug('Debug message', { more: 'data', func: f, isNull: null }),
        w.info('Info message', undefined, uuid),
        w.warn('Warn message', null, uuid),
        w.error('Error message', { error: e, func: fanon }),
        w.fatal('Fatal message'),
      ];
      results = results.filter((r) => r);
      assert.equal(results.length, 6);
    });
    it('Should only output log events info level and up', function () {
      let w = new Writer('test:1');
      let results = [
        w.trace('Trace message'),
        w.debug('Debug message'),
        w.info('Info message'),
        w.warn('Warn message'),
        w.error('Error message'),
        w.fatal('Fatal message'),
      ];
      results = results.filter((r) => r);
      assert.equal(results.length, 4);
    });
  });
});
