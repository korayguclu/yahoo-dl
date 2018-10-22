import SetCookieParser from 'set-cookie-parser';
import { cookieRegex } from './constants';
import _ from 'lodash';
import moment from 'moment';

const getCandidateMatch = (line)=>{
    let position = line.indexOf('CrumbStore');
    if(position ===-1){
        return '';
    }
    let candidate = line.substring(position-1,position+200);
    return candidate;
}

const parseCrumbData = (candidate)=>{
    let k = candidate.match(cookieRegex);
    return k && k.groups && k.groups.crumb;
}

const getCrumbData = ( lines ) => {
    let crumb;
    for ( let line of lines ) {
        let candidate = getCandidateMatch( line );
        crumb = parseCrumbData( candidate) ;
        if( crumb ) {
            break;
        }
    }
    return crumb;
}

const parseCookie = (response) => {
    var cookies = SetCookieParser.parse(response);
    let cookie = _.find( cookies, {name:'B'} );
    const lines = response.data.match(/[^\r\n]+/g);
    const crumb = getCrumbData( lines );
    const data = { crumb:crumb, cookieValue:cookie.value };
    return data;
};

export default parseCookie;