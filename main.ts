import commander from 'commander';
import getCookieBySendingADummyRequest from './src/getCookie';
import parseCookie from './src/parseCookie';
import ora from 'ora'

let cli = new commander.Command();
cli.name('yahoo-dl')
.version('1.0.0')
.option('-t, --timeframe <d,w,m>','Timeframe d for daily, w for weekly, m for monthly.') 
.option('-o, --output <output_path>','Output path.') 
.description('Yahoo stock price downloader.');

cli.command('get <symbol> ')
    .action((symbol)=>{
        const spinner = new ora(`Getting symbol ${symbol}`).start();
        getCookieBySendingADummyRequest(symbol).then((response)=>{
            const cookies = parseCookie(response);
            console.log(cookies);
            spinner.succeed();
        }).catch((err)=>{
            spinner.fail(); 
        });
        spinner.stop();
    });

cli.parse(process.argv);
