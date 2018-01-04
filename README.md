# **karma-jasmine-jquery**

A Karma plugin for [Jasmine-jQuery](https://github.com/velesin/jasmine-jquery).

[![npm](https://img.shields.io/npm/v/@metahub/karma-jasmine-jquery.svg)](https://www.npmjs.com/package/@metahub/karma-jasmine-jquery)
[![npm](https://img.shields.io/npm/dt/@metahub/karma-jasmine-jquery.svg)](https://www.npmjs.com/package/@metahub/karma-jasmine-jquery)
[![Greenkeeper badge](https://badges.greenkeeper.io/vanduynslagerp/karma-jasmine-jquery.svg)](https://greenkeeper.io/)
[![license](https://img.shields.io/github/license/vanduynslagerp/karma-jasmine-jquery.svg)](https://github.com/vanduynslagerp/karma-jasmine-jquery/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[![Travis](https://img.shields.io/travis/vanduynslagerp/karma-jasmine-jquery.svg)](https://travis-ci.org/vanduynslagerp/karma-jasmine-jquery)
[![AppVeyor](https://img.shields.io/appveyor/ci/vanduynslagerp/karma-jasmine-jquery.svg)](https://ci.appveyor.com/project/vanduynslagerp/karma-jasmine-jquery)
[![Codecov](https://img.shields.io/codecov/c/github/vanduynslagerp/karma-jasmine-jquery.svg)](https://codecov.io/gh/vanduynslagerp/karma-jasmine-jquery)

## Installation

```bash
npm install karma jasmine-core karma-jasmine jasmine-jquery @metahub/karma-jasmine-jquery --save-dev
```
**_Note: `@metahub/karma-jasmine-jquery` depends on [Jasmine](https://github.com/jasmine/jasmine), [Karma-Jasmine](https://github.com/karma-runner/karma-jasmine), and [Jasmine-jQuery](https://github.com/velesin/jasmine-jquery) but they are not bundled, just defined as [peer-dependencies](https://nodejs.org/en/blog/npm/peer-dependencies). This allow you to use any version independently of `@metahub/karma-jasmine-jquery`._**

## Configuration

### Standard

```js
module.exports = function(config) {
  config.set({
    plugins: ['@metahub/karma-jasmine-jquery', 'karma-*'],
    frameworks: ['jasmine-jquery'],
  });
};
```
**_Note: Karma can auto-load plugins named `karma-*` (see [plugins](http://karma-runner.github.io/1.0/config/plugins.html)). Unfortunatly it doesn't work with [scoped packages](https://docs.npmjs.com/misc/scope), therefore `@metahub/karma-jasmine-jquery` has to be explicitly added to the `plugins` configuration. In order to continue to automatically load other plugins you can add `karma-*` to the `plugins` configuration._**

**_Note: `@metahub/karma-jasmine-jquery` will automatically import the necesary files from [jQuery](https://github.com/jquery/jquery), [Jasmine](https://github.com/jasmine/jasmine) and [Karma-Jasmine](https://github.com/karma-runner/karma-jasmine). No need to add them to `plugins` or `frameworks`._**

In your [Jasmine](https://github.com/jasmine/jasmine) tests, [jQuery](https://github.com/jquery/jquery) will be accessible with `$` or `jQuery`:
```js
describe('Jasmine tests with Jasmine-jQuery', () => {
  it('shoud allow to use jQuery', () => {
    setFixtures('<div id="fixture" class="fixture-class">fixture content</div>');
    expect($('#fixture')).toHaveText('fixture content');
    expect(jQuery('#fixture')).toHaveClass('fixture-class');
  });
});
```

### With a custom jQuery version
`@metahub/karma-jasmine-jquery` uses a recent version of [jQuery](https://github.com/jquery/jquery) but it might be desirable to use the specific version of [jQuery](https://github.com/jquery/jquery) used in your application for executing the [Jasmine](https://github.com/jasmine/jasmine) tests.

In that case you can use [Karma-jQuery](https://github.com/scf2k/karma-jquery):
```bash
npm install karma-jquery --save-dev
```

```js
module.exports = function(config) {
  config.set({
    plugins: ['@metahub/karma-jasmine-jquery', 'karma-*'],
    frameworks: ['jasmine-jquery', 'jquery-1.8.3'],
  });
};
```

In your [Jasmine](https://github.com/jasmine/jasmine) tests, the version of [jQuery](https://github.com/jquery/jquery) configured with [Karma-jQuery](https://github.com/scf2k/karma-jquery) will be accessible with `$` or `jQuery`. The version of [jQuery](https://github.com/jquery/jquery) used by `@metahub/karma-jasmine-jquery` will be accessible with `$j` or `jasmineJQuery`:
```js
describe('Jasmine tests with Jasmine-jQuery and Karma-jQuery', () => {
  it('shoud allow to use a specific version jQuery', () => {
    expect($.fn.jquery).toBe('1.8.3');
    $.fn.jquery // 1.8.3 => version installed by Karma-jQuery
    jQuery.fn.jquery // 1.8.3 => version installed by Karma-jQuery

    expect($j.fn.jquery).toBe('3.2.1');
    $j.fn.jquery // 3.2.1 => version installed by @metahub/karma-jasmine-jquery
    jasmineJQuery.fn.jquery // 3.2.1 => version installed by @metahub/karma-jasmine-jquery
  });
});
```
