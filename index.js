#!/usr/bin/env node
'use strict';

const program = require('commander');
const downloader = require('./src/downloader');

program
    .name('yahoo-dl')
    .option('-t, --timeframe <d,w,m>','Timeframe d for daily, w for weekly, m for weekly.')
    ;


program
    .command('get <symbol>')
    .option('-o, --output <outputfilename>', 'Symbol short code')
    .action( ( symbol, options) => {
      console.log(`Downloading symbol '${symbol}' to file ${symbol}.csv `);
      downloader.getData(symbol,options);
});

program.parse(process.argv);

var NO_COMMAND_SPECIFIED = program.args.length === 0;

if (NO_COMMAND_SPECIFIED||!process.argv.slice(2).length) {
    program.help();
}