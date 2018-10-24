# yahoo-dl
A command-line tool for downloading yahoo stock prices.

## Installation

    npm install -g yahoo-dl

![yahoo-dl installation](docs/installation.gif?raw=true "yahoo-dl installation")    

## Usage

To download weekly data for Apple you need to use following command from commandline.

    yahoo-dl -t w get AAPL

![Download Stock Price](docs/download-data.gif?raw=true "Download Stock Price") 

This will download weekly historically data for the latest 12 months. 


    Usage: yahoo-dl [options] [command]

    Yahoo stock price downloader.

    Options:
      -V, --version                output the version number
      -t, --timeframe <d,w,m>      Timeframe d for daily, w for weekly, m for monthly. (default: "w")
      -p, --period <104>           Period of the selected time frame e.g. 200, 12 etc... (default: 104)
      -o, --stdout                 Output will be written to stdout.
      -f, --filename <symbol.csv>  Output will be written to a file default is symbol.csv
      -h, --help                   output usage information

    Commands:
      get <symbol>
      
### Example

Download spy 104 week data.

    kg@tmp $ yahoo-dl get spy
    ℹ Writing to /Users/kg/tmp/spy.csv
    ✔ Done spy  104w

Output is as follows

    kg@tmp $ cat spy.csv
    Date,Open,High,Low,Close,Adj Close,Volume
    2016-10-24,215.000000,215.320007,211.710007,212.539993,204.589417,420237800
    2016-10-31,212.929993,213.190002,208.380005,208.550003,200.748672,485446500
    2016-11-07,208.550003,218.309998,208.550003,216.419998,208.324280,743158200
    2016-11-14,217.029999,219.270004,215.720001,218.500000,210.326462,404338000
    2016-11-21,219.169998,221.559998,219.000000,221.520004,213.233505,232394000
    ...
    2018-10-01,292.109985,293.209991,286.220001,287.820007,287.820007,391529300
    2018-10-08,287.049988,288.859985,270.359985,275.950012,275.950012,834839200
    2018-10-15,275.549988,281.149994,274.299988,276.250000,276.250000,605470400

# Symbols

You can find some of the [symbols from here](docs/indices.md) 

# License 

MIT
