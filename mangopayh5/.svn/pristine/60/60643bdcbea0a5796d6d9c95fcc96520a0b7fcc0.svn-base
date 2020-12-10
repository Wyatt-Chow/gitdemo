/**
 * @description 用户菜单-业务接口
 * @author huangyan<huangyan@szzt.com> 2018-08-29
 * @version 1.0.0
 */


import qs from 'qs'
import axios from '../Http'



/**
 * @description 获取用户权限内的菜单列表请求接口
 * @param {userId,sysCode} params 
 * @returns menuList
 */
export const listMenu = params => { return axios.post(`/paas-server/menu/queryUserMenus/`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => res.data); };



