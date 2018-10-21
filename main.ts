import commander from 'commander';
import getCookieBySendingADummyRequest from './src/getCookie';
import getUrl from './src/getUrl';
import parseCookie from './src/parseCookie';
import getPriceData from './src/getPriceData';
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
        const { timeframe, period } = cli.opts();
        const spinner =  ora();

        spinner.start(`Preparing symbol ${symbol} for timeframe ${timeframe}`);
        const cookies = getCookieBySendingADummyRequest(symbol);
        const priceData = cookies.then((response)=>{
            const {crumb,cookieValue} = parseCookie(response);
            spinner.succeed();
            const url = getUrl(timeframe,period,symbol, crumb);
            return getPriceData(url,cookieValue);
        }).catch((err)=>{
            spinner.fail();
            return err;
        });
        priceData.then((data)=>{
            console.log(data.data);
        });
    });

cli.parse(process.argv);
