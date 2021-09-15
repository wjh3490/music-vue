import axios from 'axios';
const service = axios.create({
  baseURL: import.meta.env.PROD ? 'https://netease-cloud-music-api-gilt.vercel.app/':'http://localhost:3001', 
});
service.defaults.retry = 0;
service.defaults.retryDelay = 1000;

service.interceptors.request.use(
  config => {
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
  response => {
    const { code, ...rest } = response.data;
    if(code === 200) {
      return rest;
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