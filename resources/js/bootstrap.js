import axios from 'axios';

window.axios = axios;

axios.defaults.baseURL = 'http://127.0.0.1:8000'; // Laravel backend URL
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
