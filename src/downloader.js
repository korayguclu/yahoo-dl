'use strict';

const util = require('util');
const axios = require('axios');
const setCookieParser = require('set-cookie-parser');
const _ = require('lodash');

const regex = /.*\"CrumbStore\":\{\"crumb\":\"([a-zA-Z0-9]+)\"\}/;
const yahooHistory = "https://finance.yahoo.com/quote/%s/history";
const yahooDownload = "https://query1.finance.yahoo.com/v7/finance/download/%s?period1=%s&period2=%s&interval=1wk&events=history&crumb=%s";

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
    if(crumb === undefined){
        throw new Error("Can not find cookie.");
    }
    return crumb;
};

const getCookieBySendingADummyRequest = (symbol) =>{
    let url = util.format( yahooHistory,symbol );
    return axios.get(url).then(readCookie).catch((err)=>{
        console.log("ERROR:",err);
        return err;
    });
};

const getData = async (symbol)=>{
    let crumb = await getCookieBySendingADummyRequest(symbol);
    console.log("cookie:",crumb);
};

module.exports = {
    getData
};




