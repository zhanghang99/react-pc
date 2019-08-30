/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 15:53:04
 * @LastEditTime: 2019-08-26 15:53:04
 * @LastEditors: your name
 */
import axios from 'axios';
import { message } from 'antd';

axios.defaults.timeout = 60000;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断状态(redux、localStorage或cookie...)中是否存在token        
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
    //const token = store.state.token;        
    //token && (config.headers.Authorization = token);  
    return config
  },
  err => Promise.reject(err),
);
axios.interceptors.response.use(
  (res) => {
    // 跳转登录
    if (res && res.data && res.data.status === 'jump') {
      if (res.data.result && res.data.result.redirect) {
        setTimeout(() => {
          window.location.href = res.data.result.redirect;
        }, 200);
      }
      return null;
    }
    // 全局统一出错处理
    if (res && res.data && res.data.status !== 'ok') {
      if (res.data.message) {
        message.error(res.data.message);
      }
      return res.data;
    }
    // 请求正常处理
    if (res && res.data && res.data.status === 'ok') {
      return res.data.result;
    }
    return res;
  },
  (error) => {
    let status = error.response.status;
    message.error(status);
  },
);
export default axios;
