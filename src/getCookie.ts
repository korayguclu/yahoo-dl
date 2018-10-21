import * as util from 'util';
import axios from 'axios';
import { yahooHistory } from './constants';

const getCookieBySendingADummyRequest = async (symbol) =>{
    let url = util.format( yahooHistory,symbol );
    const data = await axios.get(url);
    return data;
};

export default getCookieBySendingADummyRequest;
