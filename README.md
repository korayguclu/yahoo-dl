# yahoo-dl
A command-line tool for downloading yahoo stock prices.

## Installation

    npm install -g yahoo-dl

## Usage

To download weekly data for Apple you need to use following command from commandline.

    yahoo-dl -t w get AAPL

This will download weekly historically data for the latest 12 months. 

You can also use it as a library as follows

    let ydl = require('yahoo-dl');

    ydl.get('FB');

This will download facebook weekly stockprices. In order to download other timeframes use following syntax

     let options = {timeframe:'d'};
     ydl.get('FB',options);

