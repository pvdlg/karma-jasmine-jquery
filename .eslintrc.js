module.exports = {
  extends: ['pretty/es6', 'pretty/node', 'pretty/promise', 'pretty/jasmine', 'pretty/ava', 'pretty/prettier'],
  env: {browser: true, jquery: true},
  parserOptions: {sourceType: 'module'},
};
