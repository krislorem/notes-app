import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://117.72.48.44:3001/api',  // 后端 API 的基础 URL
  withCredentials: true,  // 如果需要跨域请求，确保携带cookie
});

export default axiosInstance;
