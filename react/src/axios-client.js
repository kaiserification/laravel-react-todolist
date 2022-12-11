import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN_KEY);
    console.log(import.meta.env.VITE_ACCESS_TOKEN_KEY)
    config.headers['Authorization'] = 'Bearer ' + token;
    return config;
});

axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    const { response } = error;
    if(response && response.status === 401) {
        localStorage.removeItem(import.meta.env.VITE_ACCESS_TOKEN_KEY);
    }
    throw error;
});

export default axiosInstance;