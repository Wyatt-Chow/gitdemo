/**
 * @description 用户业务接口
 * @author huangyan<huangyan@szzt.com> 2018-08-29
 * @version 1.0.0
 */


import qs from 'qs'
import axios from '../Http'

/**
 * @description 用户登录请求接口
 * @param {username,password} params
 * @return user
 */
export const login = params => { return axios.post(this.api.API_GATEWATE+`/sessions`, qs.stringify(params),{headers:{'AID':'002','SID':'00000'}}).then(res => res.data); };

export const logout = params => {return axios.post(`/api/mangopay/session`,).then(res => res.data); };




