'use strict';

const util = require('util');
const axios = require('axios');
const setCookieParser = require('set-cookie-parser');
const _ = require('lodash');
const moment = require('moment');
const fs = require('fs');

const DATE_FORMAT = "YYYYMMDD";
const regex = /.*\"CrumbStore\":\{\"crumb\":\"([a-zA-Z0-9]+)\"\}/;
const yahooHistory = "https://finance.yahoo.com/quote/%s/history";
const yahooDownload = "https://query1.finance.yahoo.com/v7/finance/download/%s?period1=%s&period2=%s&interval=%s&events=history&crumb=%s";
const timeframes = {'d':'1d','w':'1wk','m':'1mo'};
const readCookie = (response) => {
    let crumb;
    let cookie;
    let body = response.data;
    var cookies = setCookieParser.parse(response);
    cookie = cookie ||  _.find(cookies,{name:'B'});

    let lines = body.match(/[^\r\n]+/g);
    _.each(lines,function(line){
        let position = line.indexOf('CrumbStore');
        if(position!==-1){
            let candidate = line.substring(position-1,position+200);
            var match = regex.exec(candidate);
            if(match && match.length ){
                crumb = crumb ||  match[1] ;
            }
        }
    });

    return {cookie,crumb};
};

const getCookieBySendingADummyRequest = (symbol) =>{
    let url = util.format( yahooHistory,symbol );
    return axios.get(url).then(readCookie).catch((err)=>{
        console.log("ERROR:",err);
        return err;
    });
};

const getSymbolData = (symbol, cookie, crumb, options) => {

    let currentDate = moment();
    let end = moment(currentDate);
    let start = moment(currentDate).subtract( 12,'month') ;
    let interval = timeframes[options.timeframe] || timeframes.w;
    let downloadUrl = util.format( yahooDownload,symbol,start.unix(),end.unix(),interval,crumb );
    let dataFilename =  _.upperCase(symbol) +'-'+ end.format(DATE_FORMAT)+'_'+start.format(DATE_FORMAT);
    dataFilename = process.cwd()+'/'+dataFilename+'.csv';
    console.log("file:",dataFilename);
    return axios.get(downloadUrl , { headers: { Cookie: "B="+cookie.value } })
        .then(function(response){
            fs.writeFile(dataFilename, response.data, (err) => {
                if (err) throw err;
                console.log(symbol+' [OK] -> '+dataFilename);
            });
            return response.data;
        }).catch((err)=>{
            console.log("ERROR:",err.response.status," Please try again.");
            return err;
        });
}

const get = async (symbol,options) => {
    if(!symbol){
        throw new Error('Symbol can not be empty.');
        return ;
    }
    let cookieAndCrumb = await getCookieBySendingADummyRequest(symbol);
    console.log(`Cookie B '${cookieAndCrumb.cookie.value}' and Crumb '${cookieAndCrumb.crumb}'`);
    let data = await getSymbolData(symbol,cookieAndCrumb.cookie,cookieAndCrumb.crumb,options);
};

module.exports = {
    get
};




