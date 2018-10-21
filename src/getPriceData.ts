import axios from 'axios';

const getPriceData = async (downloadUrl,cookieValue) =>{
    return axios.get(downloadUrl , { headers: { Cookie: "B="+cookieValue } })
};

export default getPriceData;




