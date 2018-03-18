const regex = /.*\"CrumbStore\":\{\"crumb\":\"([a-zA-Z0-9]+)\"\}/;
const path = __dirname +'/trading-tools-yahoo/assets/';
const yahooHistory = "https://finance.yahoo.com/quote/%s/history";
const yahooDownload = "https://query1.finance.yahoo.com/v7/finance/download/%s?period1=%s&period2=%s&interval=1wk&events=history&crumb=%s";

const getData = (symbol)=>{
    console.log("donwload yahoo data for symbol "+symbol);
}

module.exports = {
    getData
}




