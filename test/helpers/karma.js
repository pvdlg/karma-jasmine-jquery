const pEvent = require('p-event');
const {Server, constants} = require('karma');
const karmaJasmineJQuery = require('../..');

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
	babelPreprocessor: {options: {babelrc: false, presets: ['@babel/preset-env'], sourceMap: 'inline'}},
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
async function run(fixtures, frameworks) {
	const server = new Server(
		Object.assign(KARMA_CONFIG, {
			files: Array.isArray(fixtures) ? fixtures : [fixtures],
			frameworks: Array.isArray(frameworks) ? frameworks : [frameworks],
		}),
		() => 0
	);

	server.start();
	try {
		const [, result] = await pEvent(server, 'run_complete', {
			multiArgs: true,
			timeout: 30000,
			rejectionEvents: ['browser_error'],
		});

		return result;
	} catch (error) {
		const {
			lastResult: {success, failed, error: err, disconnected},
		} = error;

		return {success, failed, error: err, disconnected, exitCode: 1};
	}
}

module.exports = run;
