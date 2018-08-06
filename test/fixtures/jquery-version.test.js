/* eslint-env jasmine, jquery */

describe('JQuery', () => {
	it('shoud be defined in global scope', () => {
		expect($).toBeDefined();
		expect(jQuery).toBeDefined();
		expect(jQuery.fn.jquery).toBe('2.0.0');
	});
});
