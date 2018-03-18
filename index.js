#!/usr/bin/env node

const program = require('commander');
const downloader= require('./src/downloader');

program
  .arguments('<file>')
  .option('-u, --username <username>', 'The user to authenticate as')
  .option('-p, --password <password>', 'The user\'s password')
  .action(function(file) {
    downloader.getData();
    console.log('user: %s pass: %s file: %s',
        program.username, program.password, file);
  });

program.parse(process.argv);
