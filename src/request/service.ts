import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosPromise,AxiosResponse } from 'axios'
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? 'https://netease-cloud-music-api-gilt.vercel.app/':'http://localhost:3001', 
  // baseURL: 'https://netease-cloud-music-api-gilt.vercel.app/',
});
interface Time {
  retry: number,
  retryDelay: number
}
type Service = AxiosRequestConfig & Time;

(service.defaults as Service).retry = 0;
(service.defaults as Service).retryDelay = 1000;

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // if ('token') {
    //   config.headers['token'] = fn()
    //   config.headers['ContentType'] = 'application/json; charset=utf-8'
    // }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const { code, ...rest } : {code: number, rest: {}} = response.data;
    if(code === 200) {
      return rest as any;
    }
  },
  err => {
    // ECONNABORTED
    var config = err.config;
    if (!config || !config.retry) return Promise.reject(err);
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= config.retry) {
      return Promise.reject(err);
    }
    config.__retryCount += 1;
    var backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, config.retryDelay || 1);
    });

    return backoff.then(function() {
      return service(config);
    });
  }
);

export default service;