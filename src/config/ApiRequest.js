import axios from 'axios'
import {
  baseApi
} from './Api'

export const apiRequest = (url, method, params, timeout = 30000) => {
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  if (params.headers) {
    params.headers.forEach((x) => {
      headers = {
        ...headers,
        [x.keyHeader]: x.valueHeader,
      };
    });
  }
  if (params.urlParam) {
    url += '?'
    url += Object.keys(params.urlParam)
      .map((key, index) => `${key}=${encodeURIComponent(params.urlParam[key])}`)
      .join('&');
  }

  const config = {
    method: method,
    url: baseApi + url,
    headers,
    timeout,
  };

  // console.log(config)

  if (params.param) {
    const data = Object.keys(params.param)
      .map((key, index) => `${key}=${encodeURIComponent(params.param[key])}`)
      .join('&');

    config.headers = headers;
    config.data = data
  }
  axios.defaults.timeout = timeout
  return axios(config)
}