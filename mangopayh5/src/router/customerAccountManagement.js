/**
 * @description demo
 * @author limanxiang<limanxiang@szzt.com> 2018-12-24
 */
export default [
  {
    path: '/mgp/customerAccountManagement/membershipManagement',
    component: resolve => require(['@/pages/customerAccountManagement/membershipManagement'], resolve),
    name: 'membershipManagement',
    meta: {
      title: '会员管理',
      requiresAuth: true
    }
  },
  {
    path: '/mgp/customerAccountManagement/RealNameAuthenticationInformation',
    name: 'RealNameAuthenticationInformation',
    component: resolve => require(['@/pages/customerAccountManagement/RealNameAuthenticationInformation'], resolve),
    meta: {
      title: '实名认证信息',
      requiresAuth: true
    }
  },
  {
    path: '/mgp/customerAccountManagement/AccountInformationQuery',
    name: 'AccountInformationQuery',
    component: resolve => require(['@/pages/customerAccountManagement/AccountInformationQuery'], resolve),
    meta: {
      title: '账户信息查询',
      requiresAuth: true
    }
  },
  {
    path: '/mgp/customerAccountManagement/AccountHistoryQuery',
    name: 'AccountHistoryQuery',
    component: resolve => require(['@/pages/customerAccountManagement/AccountHistoryQuery'], resolve),
    meta: {
      title: '账户历史查询',
      requiresAuth: true
    }
  },
]
