const { JSDOM } = require('jsdom');

async function crawlPage(baseURL) {
    console.log(`actively crawling ${baseURL}`);

    try {
        const response = await fetch(baseURL);

        if (response.status > 399) {
            console.log(
                `error in fetch with status code: ${response.status} on page: ${baseURL}`
            );
            return;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType.includes('text/html')) {
            console.log(
                `response is not html, content type is: ${contentType}, on page ${baseURL}`
            );
            return;
        }
        console.log(await response.text());
    } catch (err) {
        console.log(`error in fetch ${err.message}, on page ${baseURL}`);
    }
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            //relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href);
            } catch (err) {
                console.log(`error with relative url: ${err.message}`);
            }
        } else {
            //absolute
            try {
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`);
            }
        }
    }
    return urls;
}

// getURLsFromHTML(`<a href="https://boot.dev">Learn Backend Development</a>`);

function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const normalized = `${urlObj.hostname}${urlObj.pathname}`;
    if (normalized.length > 0 && normalized.slice(-1) === '/') {
        return normalized.slice(0, -1);
    }
    return normalized;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
};
