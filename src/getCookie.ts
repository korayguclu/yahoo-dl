import * as util from 'util';
import axios from 'axios';
import { YAHOO_HISTORY_URL } from './constants';

const getCookieBySendingADummyRequest = async (symbol) =>{
    let url = util.format( YAHOO_HISTORY_URL, symbol );
    const data = await axios.get(url);
    return data;
};

export default getCookieBySendingADummyRequest;
