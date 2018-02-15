import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: 'src/jasmine-jquery.bundle.js',
	output: {
		file: 'lib/jasmine-jquery.bundle.js',
		format: 'es',
	},
	plugins: [nodeResolve(), commonjs({include: ['node_modules/**/*']})],
};
