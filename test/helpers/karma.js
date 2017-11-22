import pEvent from 'p-event';
import {Server, constants} from 'karma';
import karmaJasmineJQuery from '../../lib/index';

/**
 * Base Karma configuration tu run plugin.
 *
 * @type {Object}
 */
const KARMA_CONFIG = {
  basePath: '',
  preprocessors: {
    'test/fixtures/**/*.test.js': ['babel'],
  },
  babelPreprocessor: {options: {babelrc: false, presets: ['es2015'], sourceMap: 'inline'}},
  colors: true,
  logLevel: constants.LOG_DISABLE,
  browsers: ['PhantomJS'],
  singleRun: true,
  plugins: [
    'karma-jquery',
    'karma-jasmine',
    'karma-phantomjs-launcher',
    'karma-babel-preprocessor',
    karmaJasmineJQuery,
  ],
};

/**
 * @typedef {Object} KarmaOutput
 * @property {Number} success
 * @property {Number} failed
 * @property {Boolean} error
 * @property {Boolean} disconnected
 * @property {Boolean} exitCode
 * @property {String} errMsg
 */

/**
 * Run Karma with:
 * - Base Karma configuration {@link KARMA_CONFIG}
 * - Jasmine JS test file in `fixtures`
 * - Frameworks in `frameworks`
 *
 * @method run
 * @param {string|Array<string>} fixtures path of the Jasmine test files to run.
 * @param {string|Array<string>}  frameworks Karma frameworks to include in the run.
 * @return {Promise<KarmaOutput>} A `Promise` that resolve to the Karma execution results.
 */
export default function run(fixtures, frameworks) {
  const server = new Server(
    Object.assign(KARMA_CONFIG, {
      files: Array.isArray(fixtures) ? fixtures : [fixtures],
      frameworks: Array.isArray(frameworks) ? frameworks : [frameworks],
    }),
    () => 0
  );
  /* eslint-disable unicorn/catch-error-name */
  const promise = pEvent(server, 'run_complete', {multiArgs: true, rejectionEvents: ['browser_error']})
    .then(result => result[1])
    .catch(result => {
      const {success, failed, error, disconnected} = result[0].lastResult;

      return {success, failed, error, disconnected, exitCode: 1, errMsg: result[1]};
    });

  /* eslint-enable unicorn/catch-error-name */
  server.start();
  return promise;
}
