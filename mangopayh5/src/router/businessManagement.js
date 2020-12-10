/**
 * @description demo
 * @author limanxiang<limanxiang@szzt.com> 2018-12-24
 */
export default [
  {
    path: '/mgp/businessManagement/businessAnalysisReport',
    component: resolve => require(['@/pages/businessManagement/businessAnalysisReport'], resolve),
    name: 'businessAnalysisReport',
    meta: {
      title: '业务分析报表',
      requiresAuth: true
    }
  },
  {
    path: '/mgp/businessManagement/redEnvelopeCollection',
    component: resolve => require(['@/pages/businessManagement/redEnvelopeCollection'], resolve),
    name: 'redEnvelopeCollection',
    meta: {
      title: '红包领取统计',
      requiresAuth: true
    }
  },
  {
    path: '/mgp/businessManagement/walletActivationTable',
    component: resolve => require(['@/pages/businessManagement/walletActivationTable'], resolve),
    name: 'walletActivationTable',
    meta: {
      title: '钱包激活统计表',
      requiresAuth: true
    }
  },


]
