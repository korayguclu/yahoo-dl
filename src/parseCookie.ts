import SetCookieParser from 'set-cookie-parser';
import { cookieRegex } from './constants';
import _ from 'lodash';
import moment from 'moment';

const parseCookie = (response) => {
    let crumb;
    let cookie;
    let body = response.data;
    var cookies = SetCookieParser.parse(response);
    cookie = cookie ||  _.find(cookies,{name:'B'});

    let lines = body.match(/[^\r\n]+/g);
    _.each(lines,function(line){
        let position = line.indexOf('CrumbStore');
        if(position!==-1){
            let candidate = line.substring(position-1,position+200);
            var match = cookieRegex.exec(candidate);
            if(match && match.length ){
                crumb = crumb ||  match[1] ;
            }
        }
    });

    return {cookie,crumb};
};

export default parseCookie;