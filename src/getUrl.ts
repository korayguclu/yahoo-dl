import * as util from 'util';
import { YAHOO_DOWNLOAD_URL, TIMEFRAMES } from './constants';
import moment from 'moment';

const getUrl = (selectedTimeframe,selectedPeriod,symbol,crumb) => {
    const currentDate = moment();
    const end = moment(currentDate);
    const start = moment(currentDate).subtract( selectedPeriod,selectedTimeframe) ;
    const interval = TIMEFRAMES[selectedTimeframe] || TIMEFRAMES.d;
    const downloadUrl = util.format( YAHOO_DOWNLOAD_URL, symbol,start.unix(),end.unix(),interval,crumb );
    return downloadUrl;
};

export default getUrl;