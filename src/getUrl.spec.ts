import getUrl from './getUrl';

test('using default interval 1d if given interval is not valid', () => {
    const selectedTimeframe = 'xxx';
    const selectedPeriod = 120;
    const symbol = 'spy'
    const crumb ='crumbdataishere';
    expect(getUrl(selectedTimeframe,selectedPeriod,symbol,crumb)).toContain('interval=1d');
});


test('sets w1 for weekly interval', () => {
    const selectedTimeframe = 'w';
    const selectedPeriod = 120;
    const symbol = 'spy'
    const crumb ='crumbdataishere';
    expect(getUrl(selectedTimeframe,selectedPeriod,symbol,crumb)).toContain('interval=1w');
});

test('sets 1m for monthly interval ', () => {
    const selectedTimeframe = 'm';
    const selectedPeriod = 120;
    const symbol = 'spy'
    const crumb ='crumbdataishere';
    expect(getUrl(selectedTimeframe,selectedPeriod,symbol,crumb)).toContain('interval=1m');
});

test('sets symbol correctly', () => {
    const selectedTimeframe = 'w';
    const selectedPeriod = 120;
    const symbol = 'spy'
    const crumb ='crumbdataishere';
    expect(getUrl(selectedTimeframe,selectedPeriod,symbol,crumb)).toContain('download/spy?');
});

test('sets crumb data correctly', () => {
    const selectedTimeframe = 'w';
    const selectedPeriod = 120;
    const symbol = 'spy'
    const crumb ='crumbdataishere';
    expect(getUrl(selectedTimeframe,selectedPeriod,symbol,crumb)).toContain('crumb=crumbdataishere');
});

test('sets domain name and url correctly', () => {
    const selectedTimeframe = 'w';
    const selectedPeriod = 120;
    const symbol = 'spy'
    const crumb ='crumbdataishere';
    expect(getUrl(selectedTimeframe,selectedPeriod,symbol,crumb)).toContain('https://query1.finance.yahoo.com/v7/finance/download/');
});