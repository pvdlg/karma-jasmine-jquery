const path = require('path');
const karmaJasmine = require('karma-jasmine');

/* eslint prefer-named-capture-group: "off" */

/**
 * Karma framework function.
 * Call the `karma-jasmine` module if corresponding files are not already and included and add the jquery + jasmine-jquery bundle to the Karma files (after the `karma-jasmine` files in present, in first position otherwise).
 *
 * @method framework
 * @param {Array<string>} files list of current Karma files.
 */
function framework(files) {
	let insertIndex = 0;

	for (let len = files.length, i = len - 1; i >= 0; i--) {
		if (files[i].pattern.search(/karma-jasmine(\/|\\)lib(\/|\\).*\.js/) !== -1) {
			insertIndex = i + 1;
			break;
		}
	}

	files.splice(insertIndex, 0, {
		pattern: path.resolve(require.resolve('./lib/jasmine-jquery.bundle.js')),
		included: true,
		served: true,
		watched: false,
	});

	if (insertIndex === 0) {
		karmaJasmine['framework:jasmine'][1](files);
	}
}

framework.$inject = ['config.files'];

module.exports = {
	'framework:jasmine-jquery': ['factory', framework],
};
