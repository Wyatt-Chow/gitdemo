/**
 * @description http配置
 * @author limanxiang  on 2019-01-03
 *
 * @version v1.0.0
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import { Loading, Message } from 'element-ui'
import api from '../static/config.js'

// axios 配置
axios.defaults.timeout = 15000;
//设置后台服务器请求地址
axios.defaults.baseURL = api.API_GATEWATE;


// http request 拦截器
axios.interceptors.request.use(config => {
    // element ui Loading方法
    return config;
}, error => {
    Message.error({
        message: '加载超时！'
    });
    return Promise.reject(error);
});

// http response 拦截器

axios.interceptors.response.use(data => {// 响应成功关闭loading
        return data;
   }, error => {
    Message.error({
        message: '加载失败！'
    });
    return Promise.reject(error);
})

export default axios
