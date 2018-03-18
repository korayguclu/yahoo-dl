#!/usr/bin/env node
'use strict';

const program = require('commander');
const downloader = require('./src/downloader');

program
    .name('yahoo-dl')
    .command('get <symbol>')
    .option('-o, --output <outputfilename>', 'Symbol short code')
    .action( ( symbol, options) => {
      console.log(`Downloading symbol '${symbol}' to file ${symbol}.csv `);
      downloader.getData(symbol);
});

if (!process.argv.slice(2).length){
    program.help();
}

program.parse(process.argv);
