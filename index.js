#!/usr/bin/env node
'use strict';

const program = require('commander');
const downloader = require('./src/downloader');

program
    .name('yahoo-dl')
    .version('1.0.0')
    .description('Client Management System');
    // .option('-t, --timeframe <d,w,m>','Timeframe d for daily, w for weekly, m for monthly.') ;


program
    .command('get <symbol> ')
    .option('-t, --timeframe <d,w,m>','Timeframe d for daily, w for weekly, m for monthly.') 
    .option('-o, --output <output_path>','Output path.') 
    .action( ( symbol,options ) => {
        options.timeframe = options.timeframe || 'w'  ;
        options.output = options.output || '.'  ;

        console.log(`Downloading symbol '${symbol}' to file ${symbol}.csv `);
        downloader.get(symbol,options);
});

program.parse(process.argv);

var NO_COMMAND_SPECIFIED = program.args.length === 0;

if (NO_COMMAND_SPECIFIED||!process.argv.slice(2).length) {
    program.help();
}