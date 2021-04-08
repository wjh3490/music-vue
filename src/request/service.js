import axios from 'axios';
const service = axios.create({
  baseURL: 'https://netease-cloud-music-api-gilt.vercel.app/', // 121.4.152.254
  timeout: 5000
});
service.defaults.retry = 4;
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
    let res = response.data;
    // if (res.code == '401') {
    //   //
    // } else if (res.code == '402') {
    //   //
    // }
    return res;
  },
  err => {
    /*eslint-disable */

    // ECONNABORTED
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
      return service(config);
    });
    // console.log(error.code);
    // Promise.reject(error);
  }
);

export default service;