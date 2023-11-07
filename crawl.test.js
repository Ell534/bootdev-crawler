const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
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

test('getURLsFromHTML absolute', () => {
    const inputHTMLbody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev/path/';
    const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
    const expected = ['https://blog.boot.dev/path/'];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
    const inputHTMLbody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
    const expected = ['https://blog.boot.dev/path/'];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative and absolute', () => {
    const inputHTMLbody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog Path 1
            </a>
            <a href="/path2/">
                Boot.dev Blog Path 2
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
    const expected = [
        'https://blog.boot.dev/path1/',
        'https://blog.boot.dev/path2/',
    ];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML invalid', () => {
    const inputHTMLbody = `
    <html>
        <body>
            <a href="invalid">
                Invalid URL
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
});
