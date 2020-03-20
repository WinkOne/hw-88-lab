import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'http://localhost:8005'
});


export default axiosApi;