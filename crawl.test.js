const { normalizeURL } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeURL, strip protocol', () => {
    const input = 'https://example.org/abc/xyz?123';
    const actual = normalizeURL(input);
    const expected = 'example.org/abc/xyz';
    expect(actual).toEqual(expected);
});

test('normalizeURL, strip trailing slashes', () => {
    const input = 'https://example.org/abc/';
    const actual = normalizeURL(input);
    const expected = 'example.org/abc';
    expect(actual).toEqual(expected);
});

test('normalizeURL, make lowercase', () => {
    const input = 'https://EXAMPLE.ORG/abc';
    const actual = normalizeURL(input);
    const expected = 'example.org/abc';
    expect(actual).toEqual(expected);
});
