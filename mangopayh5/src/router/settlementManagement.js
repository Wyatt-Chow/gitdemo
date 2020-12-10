/**
 * @description demo
 * @author limanxiang<limanxiang@szzt.com> 2018-12-24
 */
export default [
  {
    path: '/mgp/settlementManagement/settlementManagement',
    component: resolve => require(['@/pages/settlementManagement/settlementManagement'], resolve),
    name: 'settlementManagement',
    meta: {
      title: '结算管理',
      requiresAuth: true
    }
  },
  {
    path: '/mgp/settlementManagement/redEnvelopeRuleManagement',
    component: resolve => require(['@/pages/settlementManagement/redEnvelopeRuleManagement'], resolve),
    name: 'redEnvelopeRuleManagement',
    meta: {
      title: '红包规则管理',
      requiresAuth: true
    }
  },
  {
    path: '/mgp/settlementManagement/redEnvelopeSettlementPreparation',
    component: resolve => require(['@/pages/settlementManagement/redEnvelopeSettlementPreparation'], resolve),
    name: 'redEnvelopeSettlementPreparation',
    meta: {
      title: '红包结算预备款',
      requiresAuth: true
    }
  }
]
