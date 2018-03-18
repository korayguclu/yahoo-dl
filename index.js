#!/usr/bin/env node
'use strict';

const program = require('commander');
const downloader= require('./src/downloader');

program
  .arguments('<file>')
  .option('-s, --symbol <symbol>', 'Symbol short code')
  .action(function(symbol, file) {
    downloader.getData();
    console.log('downloading: %s symbol to file: %s',
        program.symbol, file);
  });

program.parse(process.argv);
