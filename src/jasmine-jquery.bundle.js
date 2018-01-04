/* eslint-env browser */

import jQuery from 'jquery';
import 'jasmine-jquery'; // eslint-disable-line import/no-unassigned-import

if (typeof window.jQuery === 'undefined') {
  window.jQuery = jQuery.noConflict();
  window.$ = jQuery.noConflict();
}

window.jasmineJQuery = jQuery;
window.$j = jQuery;
