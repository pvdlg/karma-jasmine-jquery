/* eslint-env jasmine, jquery, browser */

describe('Loading Jasmine-JQuery', () => {
	it('shoud export global function', () => {
		expect(window.jasmineRequire).toBeDefined();
		expect(window.setFixtures).toEqual(jasmine.any(Function));
		expect(window.appendSetFixtures).toEqual(jasmine.any(Function));
		window.setFixtures('<div id="fixture" class="fixture-class">42</div>');
		expect(document.querySelector('#fixture')).toBeTruthy();
		expect(window.readFixtures).toEqual(jasmine.any(Function));
	});

	it('shoud expose matchers', () => {
		expect(window.jasmine).toBeDefined();
		window.setFixtures('<div id="fixture" class="fixture-class">42</div>');
		expect(document.querySelector('#fixture')).toExist();
		expect(document.querySelector('#fixture')).toHaveClass('fixture-class');
		expect(document.querySelector('#fixture')).toHaveText('42');
		expect(document.body).toBeInDOM();
	});

	it('shoud expose embedded JQuery with $j or jasmineJQuery', () => {
		expect(window.$j).toBeDefined();
		expect(window.$j.fn.jquery).toBeTruthy();
		expect(window.jasmineJQuery).toBeDefined();
		expect(window.jasmineJQuery.fn.jquery).toBeTruthy();
	});

	it('shoud expose regular or embedded JQuery with $ or jQuery', () => {
		expect(window.$).toBeDefined();
		expect(window.$.fn.jquery).toBeTruthy();
		expect(window.jQuery).toBeDefined();
		expect(window.jQuery.fn.jquery).toBeTruthy();
	});
});
