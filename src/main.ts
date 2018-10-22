import commander from 'commander';
import getCookieBySendingADummyRequest from './getCookie';
import getUrl from './getUrl';
import parseCookie from './parseCookie';
import getPriceData from './getPriceData';
import ora from 'ora';
import fs from 'fs';
import path from 'path';

let cli = new commander.Command();
cli.name('yahoo-dl')
.version('1.0.0')
.option('-t, --timeframe <d,w,m>','Timeframe d for daily, w for weekly, m for monthly.','w') 
.option('-p, --period <104>','Period of the selected time frame e.g. 200, 12 etc...', 104 ) 
.option('-o, --stdout','Output will be written to stdout.') 
.option('-f, --filename <symbol.csv>', 'Output will be written to a file default is symbol.csv')
.description('Yahoo stock price downloader.');


cli.command('get <symbol> ')
    .action((symbol,options)=>{
        const { timeframe, period, filename, stdout } = cli.opts();
        const spinner =  ora();
        const meta = `${symbol}  ${period}${timeframe}`;
        spinner.start(`Preparing: ${meta}`);
        const cookies = getCookieBySendingADummyRequest(symbol);
        const priceData = cookies.then((response)=>{
            const {crumb,cookieValue} = parseCookie(response);
            spinner.text = `Building url: ${meta}`;
            const url = getUrl(timeframe,period,symbol, crumb);
            spinner.text = `Getting price data: ${meta}`;
            const priceData = getPriceData(url,cookieValue);
            return priceData;
        });
        priceData.then((response)=>{
            if ( stdout ) {
                console.log(response.data);
                spinner.succeed(meta);
            } else if ( filename ) {
                spinner.info("Writing to "+path.resolve(__dirname, `${symbol}.csv` ));
                fs.writeFileSync(path.resolve(__dirname, filename ), response.data);
            } else {
                spinner.info("Writing to "+path.resolve(__dirname, `${symbol}.csv` ));
                fs.writeFileSync(path.resolve(__dirname, `${symbol}.csv` ), response.data);
            }
            spinner.succeed("Done "+meta);

        }).catch((err)=>{
            spinner.fail('An error occured. Please try again later.');
        });
    });

cli.parse(process.argv);
