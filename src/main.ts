import commander from 'commander';
import getCookieBySendingADummyRequest from './getCookie';
import getUrl from './getUrl';
import parseCookie from './parseCookie';
import getPriceData from './getPriceData';
import ora from 'ora';

let cli = new commander.Command();
cli.name('yahoo-dl')
.version('1.0.0')
.option('-t, --timeframe <d,w,m>','Timeframe d for daily, w for weekly, m for monthly.','w') 
.option('-p, --period <104>','Period of the selected time frame e.g. 200, 12 etc...', 104 ) 
.option('-o, --output <output_path>','Output path.') 
.description('Yahoo stock price downloader.');


cli.command('get <symbol> ')
    .action((symbol,options)=>{
        const { timeframe, period } = cli.opts();
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
            spinner.succeed();
            return priceData;
        });
        priceData.then((data)=>{
            console.log(data.data);
        }).catch((err)=>{
            spinner.fail();
            console.error(err);
        });
    });

cli.parse(process.argv);
