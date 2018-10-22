import axios from 'axios';

const getPriceData = async (downloadUrl,cookieValue) =>{
    const data = await axios.get(downloadUrl , { headers: { Cookie: "B="+cookieValue } });
    return data;
};

export default getPriceData;




