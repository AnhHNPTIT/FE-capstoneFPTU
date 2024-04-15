import axios from 'axios';
import Cookies from 'js-cookie'
const tokenWeb = Cookies.get('tokenfpt') || ''
const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 15000,
});

instance.defaults.headers.common['Authorization'] = `Bearer ${tokenWeb}`;

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance