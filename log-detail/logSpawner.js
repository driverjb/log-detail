const Writer = require('./writer');
const Configuration = require('./configuration');
/**
 * A function generator to create a common configuration log writer spawner
 * @param {Configuration} configuration
 */
function LogSpawner(configuration) {
  return function (namespace) {
    return new Writer(namespace, configuration);
  };
}

module.exports = LogSpawner;
