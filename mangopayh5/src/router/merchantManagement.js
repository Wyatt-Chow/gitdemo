/**
 * @description demo
 * @author limanxiang<limanxiang@szzt.com> 2018-12-24
 */
export default [
  {
    path: '/mgp/merchantManagement/merchantManagement',
    name: 'merchantManagement',
    component: resolve => require(['@/pages/merchantManagement/merchantManagement'], resolve),
    meta: {
      title: '商户管理',
      requiresAuth: true
    }
  },
  {
    path: '/mgp/merchantManagement/businessAccountManagement',
    name: 'businessAccountManagement',
    component: resolve => require(['@/pages/merchantManagement/businessAccountManagement'], resolve),
    meta: {
      title: '商户账户管理',
      requiresAuth: true
    }
  },
  {
    path: '/mgp/merchantManagement/busAccHistoryQuery',
    name: 'busAccHistoryQuery',
    component: resolve => require(['@/pages/merchantManagement/busAccHistoryQuery'], resolve),
    meta: {
      title: '商户账户历史查询',
      requiresAuth: true
    }
  },

]
