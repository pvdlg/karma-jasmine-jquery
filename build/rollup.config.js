import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  format: 'es',
  entry: 'src/jasmine-jquery.bundle.js',
  plugins: [nodeResolve(), commonjs({include: ['node_modules/**/*']})],
};
