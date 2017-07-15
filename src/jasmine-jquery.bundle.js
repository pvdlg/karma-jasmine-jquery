import jQuery from 'jquery';
import 'jasmine-jquery';

if (typeof window.jQuery === 'undefined') {
  window.jQuery = jQuery.noConflict();
  // eslint-disable-next-line id-length
  window.$ = jQuery.noConflict();
}

window.jasmineJQuery = jQuery;
window.$j = jQuery;
