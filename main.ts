import commander from 'commander';
import getCookieBySendingADummyRequest from './src/getCookie';
import getUrl from './src/getUrl';
import parseCookie from './src/parseCookie';
import ora from 'ora'

let cli = new commander.Command();
cli.name('yahoo-dl')
.version('1.0.0')
.option('-t, --timeframe <d,w,m>','Timeframe d for daily, w for weekly, m for monthly.','w') 
.option('-p, --period','Period of the selected time frame e.g. 200, 12 etc...', 104 ) 
.option('-o, --output <output_path>','Output path.') 
.description('Yahoo stock price downloader.');


cli.command('get <symbol> ')
    .action((symbol,options)=>{
        const { timeframe, period } = cli.opts().timeframe;
        const spinner =  ora();
        spinner.start(`Getting symbol ${symbol} for timeframe ${timeframe}`);
        const cookies = getCookieBySendingADummyRequest(symbol).then((response)=>{
            const cookies = parseCookie(response);
            spinner.succeed();
            return cookies;
        }).catch((err)=>{
            spinner.fail();
            return err;
        });
        const url = getUrl(timeframe,period,symbol, cookies['crumb']);
        console.log("URL:",url);

    });

cli.parse(process.argv);
