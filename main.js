const { argv, exit } = require('node:process');

function main() {
    if (argv.length < 3) {
        console.log('No website provided for crawler please enter a base URL');
        exit(1);
    }
    if (argv.length > 3) {
        console.log(
            'more than one website provided, please only enter one website'
        );
        exit(1);
    }
    console.log(`Crawler starting with base URL of ${argv[2]}`);
}

main();
