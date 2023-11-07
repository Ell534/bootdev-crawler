function printReport(pages) {
    console.log('*******************');
    console.log('===================');
    console.log('Report starting....');
    const sortedPages = sortPages(pages);
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0];
        const hits = sortedPage[1];
        console.log(`Found ${hits} internal links to ${url}`);
    }
    console.log('===================');
    console.log('*******************');
    console.log('End of Report');
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => {
        const aHits = a[1];
        const bHits = b[1];
        return bHits - aHits;
    });
    return pagesArr;
}

module.exports = { sortPages, printReport };
