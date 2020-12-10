export default [
  {
    path: '/home',redirect: '/mgp/index',
    component: resolve => require(['@/pages/home/home'], resolve),
    meta: {
      title: '',
      requiresAuth: true,
    },
    children: [
        {
          path: '/mgp/index',
          name: 'Index',
          component: resolve => require(['@/pages/index/Index'], resolve),
          meta: {
            title: '首页',
            requiresAuth: true
          }
        },
        
        {
          path: '/mgp/platformAccountManagement/account',
          name: 'platformAccountManagement',
          component: resolve => require(['@/pages/platformAccountManagement/account'], resolve),
          meta: {
            title: '平台账号管理',
            requiresAuth: true
          }
        },
        
        {
          path: '/mgp/customerAccountManagement/membershipManagement',
          name: 'membershipManagement',
          component: resolve => require(['@/pages/customerAccountManagement/membershipManagement'], resolve),
          meta: {
            title: '会员管理',
            requiresAuth: true
          }
        },
        {
          path: '/mgp/customerAccountManagement/ProCustomer',
          name: 'ProCustomer',
          component: resolve => require(['@/pages/customerAccountManagement/ProCustomer'], resolve),
          meta: {
            title: '已准入客户管理',
            requiresAuth: true
          }
        },
        {
          path: '/mgp/customerAccountManagement/BlackList',
          name: 'BlackList',
          component: resolve => require(['@/pages/customerAccountManagement/BlackList'], resolve),
          meta: {
            title: '黑名单客户管理',
            requiresAuth: true
          }
        },
        {
          path: '/mgp/customerAccountManagement/customerDetails',
          name: 'customerDetails',
          component: resolve => require(['@/pages/customerAccountManagement/CustomerDetails'], resolve),
          meta: {
            title: '查看准入客户管理',
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
      {
        path: '/mgp/businessManagement/ActivationFailed',
        component: resolve => require(['@/pages/businessManagement/ActivationFailed'], resolve),
        name: 'ActivationFailed',
        meta: {
          title: '激活失败查询表',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/businessManagement/StatsElecAccountList',
        component: resolve => require(['@/pages/businessManagement/failedStatistics'], resolve),
        name: 'failedStatistics',
        meta: {
          title: '激活失败统计表',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/TransactionManagement/consumptionManagement',
        component: resolve => require(['@/pages/TransactionManagement/consumptionManagement'], resolve),
        name: 'consumptionManagement',
        meta: {
          title: '消费管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/TransactionManagement/cashManagement',
        component: resolve => require(['@/pages/TransactionManagement/cashManagement'], resolve),
        name: 'cashManagement',
        meta: {
          title: '提现管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/TransactionManagement/redEnvelopeManagement',
        component: resolve => require(['@/pages/TransactionManagement/redEnvelopeManagement'], resolve),
        name: 'redEnvelopeManagement',
        meta: {
          title: '红包管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/TransactionManagement/RechargeManagement',
        component: resolve => require(['@/pages/TransactionManagement/RechargeManagement'], resolve),
        name: 'RechargeManagement',
        meta: {
          title: '充值管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/TransactionManagement/refundManagement',
        component: resolve => require(['@/pages/TransactionManagement/refundManagement'], resolve),
        name: 'refundManagement',
        meta: {
          title: '退款管理',
          requiresAuth: true
        }
      },
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
        name: 'merchantManagement',
        component: resolve => require(['@/pages/merchantManagement/businessAccountManagement'], resolve),
        meta: {
          title: '商户账户管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/merchantManagement/busAccHistoryQuery',
        name: 'merchantManagement',
        component: resolve => require(['@/pages/merchantManagement/busAccHistoryQuery'], resolve),
        meta: {
          title: '商户账户历史查询',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/reconciliationManagement/bankReconciliationManagement',
        name: 'merchantManagement',
        component: resolve => require(['@/pages/reconciliationManagement/bankReconciliationManagement'], resolve),
        meta: {
          title: '银行对账管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/reconciliationManagement/telBillReconciliationManagement',
        name: 'telBillReconciliationManagement',
        component: resolve => require(['@/pages/reconciliationManagement/telBillReconciliationManagement'], resolve),
        meta: {
          title: '充值话费对账管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/reconciliationManagement/telBillReconciliationResultQuery',
        name: 'telBillReconciliationResultQuery',
        component: resolve => require(['@/pages/reconciliationManagement/telBillReconciliationResultQuery'], resolve),
        meta: {
          title: '话费充值对账结果查询',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/reconciliationManagement/reconciliationResultQuery',
        name: 'merchantManagement',
        component: resolve => require(['@/pages/reconciliationManagement/reconciliationResultQuery'], resolve),
        meta: {
          title: '对账结果查询',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/reconciliationManagement/serviceNodeManagement',
        name: 'serviceNodeManagement',
        component: resolve => require(['@/pages/reconciliationManagement/serviceNodeManagement'], resolve),
        meta: {
          title: '服务节点管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/settlementManagement/settlementManagement',
        name: 'settlementManagement',
        component: resolve => require(['@/pages/settlementManagement/settlementManagement'], resolve),
        meta: {
          title: '结算管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/systemManagement/operator',
        component: resolve => require(['@/pages/systemManagement/operator'], resolve),
        name: 'operator',
        meta: {
          title: '操作员',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/systemManagement/roleManagement',
        component: resolve => require(['@/pages/systemManagement/roleManagement'], resolve),
        name: 'roleManagement',
        meta: {
          title: '角色管理',
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
      },
      {
        path: '/mgp/settlementManagement/redEnvelopeTypeManagement',
        component: resolve => require(['@/pages/settlementManagement/redEnvelopeTypeManagement'], resolve),
        name: 'redEnvelopeTypeManagement',
        meta: {
          title: '红包类型管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/commodityManagement/commodityDiscountManagement',
        component: resolve => require(['@/pages/commodityManagement/commodityDiscountManagement'], resolve),
        name: 'commodityDiscountManagement',
        meta: {
          title: '商品折扣管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/commodityManagement/productManagement',
        component: resolve => require(['@/pages/commodityManagement/productManagement'], resolve),
        name: 'productManagement',
        meta: {
          title: '商品管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/commodityManagement/shopActivityManagement',
        component: resolve => require(['@/pages/commodityManagement/shopActivityManagement'], resolve),
        name: 'shopActivityManagement',
        meta: {
          title: '活动管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/bannerManagement/bannerManagement',
        component: resolve => require(['@/pages/bannerManagement/bannerManagement'], resolve),
        name: 'bannerManagement',
        meta: {
          title: '广告管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/bannerManagement/bannerReviewManagement',
        component: resolve => require(['@/pages/bannerManagement/bannerReviewManagement'], resolve),
        name: 'bannerReviewManagement',
        meta: {
          title: '广告审核管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/returnManagement/returnManagement',
        component: resolve => require(['@/pages/returnManagement/returnManagement'], resolve),
        name: 'returnManagement',
        meta: {
          title: '退货退款列表',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/returnManagement/returnReviewManagement',
        component: resolve => require(['@/pages/returnManagement/returnReviewManagement'], resolve),
        name: 'returnReviewManagement',
        meta: {
          title: '退货退款审核',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/couponManagement/couponList',
        component: resolve => require(['@/pages/coupon/couponList'], resolve),
        name: 'couponList',
        meta: {
          title: '卡券列表',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/couponManagement/couponReview',
        component: resolve => require(['@/pages/coupon/couponReview'], resolve),
        name: 'couponReview',
        meta: {
          title: '卡券审核',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/couponManagement/couponDetails',
        component: resolve => require(['@/pages/coupon/couponDetails'], resolve),
        name: 'couponDetails',
        meta: {
          title: '卡券明细',
          requiresAuth: true
        }
      },
      /* {
        path: '/mgp/labelManagement/labelList',
        component: resolve => require(['@/pages/label/labelList'], resolve),
        name: 'labelList',
        meta: {
          title: '标签列表',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/bankAccountList',
        component: resolve => require(['@/pages/bankAccount/bankAccountList'], resolve),
        name: 'bankAccountList',
        meta: {
          title: '银行账户列表',
          requiresAuth: true
        }
      }, */
      {
        path: '/mgp/preloan/creditManagement',
        component: resolve => require(['@/pages/preloan/creditManagement'], resolve),
        name: 'creditManagement',
        meta: {
          title: '授信管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/loaning/contractList',
        component: resolve => require(['@/pages/loaning/contractList'], resolve),
        name: 'contractList',
        meta: {
          title: '合同管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/loaning/productCredit',
        component: resolve => require(['@/pages/loaning/productCredit'], resolve),
        name: 'productCredit',
        meta: {
          title: '借据管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/loaning/loanCheck',
        component: resolve => require(['@/pages/loaning/loanCheck'], resolve),
        name: 'loanCheck',
        meta: {
          title: '放款审批',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/loaned/paymentManagement',
        component: resolve => require(['@/pages/loaned/paymentManagement'], resolve),
        name: 'paymentManagement',
        meta: {
          title: '还款计划',
          requiresAuth: true
        }
      },
     /*  {
        path: '/mgp/loaning/loanProcessing',
        component: resolve => require(['@/pages/loaning/loanProcessing'], resolve),
        name: 'loanProcessing',
        meta: {
          title: '放款处理',
          requiresAuth: true
        }
      }, */
      {
        path: '/mgp/financeReport/reconciliation',
        component: resolve => require(['@/pages/financeReport/reconciliation'], resolve),
        name: 'reconciliation',
        meta: {
          title: '应收还款计划表',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/financeReport/principalReport',
        component: resolve => require(['@/pages/financeReport/principalReport'], resolve),
        name: 'principalReport',
        meta: {
          title: '实收还款计划表',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/financeReport/principalPayment',
        component: resolve => require(['@/pages/financeReport/principalPayment'], resolve),
        name: 'principalPayment',
        meta: {
          title: '退款计划表',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/financeReport/serviceFee',
        component: resolve => require(['@/pages/financeReport/serviceFee'], resolve),
        name: 'serviceFee',
        meta: {
          title: '成本收益表',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/financeReport/accountStatement',
        component: resolve => require(['@/pages/financeReport/accountStatement'], resolve),
        name: 'accountStatement',
        meta: {
          title: '银行流水管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/mallOrder/orderList',
        component: resolve => require(['@/pages/mallOrder/orderList'], resolve),
        name: 'orderList',
        meta: {
          title: '商城订单管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/mallOrder/feedback',
        component: resolve => require(['@/pages/mallOrder/feedback'], resolve),
        name: 'feedback',
        meta: {
          title: '订单反馈管理',
          requiresAuth: true
        }
      },
      {
        path: '/mgp/blank',
        component: resolve => require(['@/pages/blank/blank'], resolve),
        name: '信贷平台',
        meta: {
          title: '信贷平台',
          requiresAuth: true
        }
      },
    ]
  }
]
