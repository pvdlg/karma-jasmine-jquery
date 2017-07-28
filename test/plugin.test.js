/* eslint-disable no-magic-numbers */
import test from 'ava';
import run from './helpers/karma';

test('Jasmine-JQuery should be loaded', async t => {
  const fixture = 'test/fixtures/jasmine-jquery.test.js';
  const {success, failed, error, disconnected, exitCode} = await run(fixture, 'jasmine-jquery');

  t.ifError(error, 'Karma returned an error');
  t.ifError(disconnected, 'Karma disconnected');
  t.is(exitCode, 0, 'Expected zero exit code');
  t.is(success, 4, 'Expected 4 test successful');
  t.is(failed, 0, 'Expected no failed test');
});

test('Custom JQuery should be loaded when added after "jasmine-jquery"', async t => {
  const fixtures = ['test/fixtures/jasmine-jquery.test.js', 'test/fixtures/jquery-version.test.js'];
  const {success, failed, error, disconnected, exitCode} = await run(fixtures, ['jasmine-jquery', 'jquery-2.0.0']);

  t.ifError(error, 'Karma returned an error');
  t.ifError(disconnected, 'Karma disconnected');
  t.is(exitCode, 0, 'Expected zero exit code');
  t.is(success, 5, 'Expected 5 test successful');
  t.is(failed, 0, 'Expected no failed test');
});

test('Custom JQuery should be loaded when added before "jasmine-jquery"', async t => {
  const fixtures = ['test/fixtures/jasmine-jquery.test.js', 'test/fixtures/jquery-version.test.js'];
  const {success, failed, error, disconnected, exitCode} = await run(fixtures, ['jquery-2.0.0', 'jasmine-jquery']);

  t.ifError(error, 'Karma returned an error');
  t.ifError(disconnected, 'Karma disconnected');
  t.is(exitCode, 0, 'Expected zero exit code');
  t.is(success, 5, 'Expected 5 test successful');
  t.is(failed, 0, 'Expected no failed test');
});

test('Loading "karma-jasmine" after "jasmine-jquery" should not create errors', async t => {
  const fixture = 'test/fixtures/jasmine-jquery.test.js';
  const {success, failed, error, disconnected, exitCode} = await run(fixture, ['jasmine-jquery', 'jasmine']);

  t.ifError(error, 'Karma returned an error');
  t.ifError(disconnected, 'Karma disconnected');
  t.is(exitCode, 0, 'Expected zero exit code');
  t.is(success, 4, 'Expected 4 test successful');
  t.is(failed, 0, 'Expected no failed test');
});

test('Loading "karma-jasmine" before "jasmine-jquery" should not create errors', async t => {
  const fixture = 'test/fixtures/jasmine-jquery.test.js';
  const {success, failed, error, disconnected, exitCode} = await run(fixture, ['jasmine', 'jasmine-jquery']);

  t.ifError(error, 'Karma returned an error');
  t.ifError(disconnected, 'Karma disconnected');
  t.is(exitCode, 0, 'Expected zero exit code');
  t.is(success, 4, 'Expected 4 test successful');
  t.is(failed, 0, 'Expected no failed test');
});
/* eslint-enable no-magic-numbers */
