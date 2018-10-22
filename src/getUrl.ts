import * as util from 'util';
import { yahooDownload,timeframes } from './constants';
import moment from 'moment';

const getUrl = (selectedTimeframe,selectedPeriod,symbol,crumb) => {
    const currentDate = moment();
    const end = moment(currentDate);
    const start = moment(currentDate).subtract( selectedPeriod,selectedTimeframe) ;
    const interval = timeframes[selectedTimeframe] || timeframes.d;
    const downloadUrl = util.format( yahooDownload,symbol,start.unix(),end.unix(),interval,crumb );
    return downloadUrl;
};

export default getUrl;