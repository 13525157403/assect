import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'el-icon-s-home', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // 监控预警
  {
    path: '/monitorManage',
    component: Layout,
    redirect: 'noRedirect',
    name: 'monitorManage',
    meta: { title: 'monitorManage', icon: 'el-icon-s-data', roles: 'monitorManage' },
    children: [
      {
        path: 'monitor',
        name: 'monitor',
        component: () => import('@/views/monitor'),
        meta: { title: '监控' },
        children: [
          {
            path: 'monitorDetail',
            component: () => import('@/views/monitorManage/monitorDetail'),
            name: 'monitorDetail',
            meta: { title: 'monitorDetail', roles: 'monitorDetail' }
          },
          {
            path: 'monitorInfo',
            component: () => import('@/views/monitorManage/monitorInfo'),
            name: 'monitorInfo',
            meta: { title: 'monitorInfo', roles: 'monitorManage' }
          }
        ]
      },
      {
        path: 'early',
        name: 'early',
        component: () => import('@/views/alert'),
        meta: { title: '预警' },
        children: [
          {
            path: 'alertInfo',
            component: () => import('@/views/alert/alertInfo'),
            name: 'alertInfo',
            meta: { title: 'alertInfo', roles: 'alertManage' }
          },
          {
            path: 'alertInfoDetails',
            component: () => import('@/views/alert/alertInfoDetails'),
            name: 'alertInfoDetails',
            meta: {
              title: 'alertInfoDetails', roles: 'alertInfoDetails'
            }
          },
          {
            path: 'earlywarningprocessing',
            component: () => import('@/views/alert/earlywarningprocessing'),
            name: 'earlywarningprocessing',
            meta: { title: 'earlywarningprocessing', roles: 'alertDeal' }
          }
        ]
      },
      // 监控管理,监控详情
      // {
      //   path: 'monitorDetail',
      //   component: () => import('@/views/monitorManage/monitorDetail'),
      //   name: 'monitorDetail',
      //   meta: { title: 'monitorDetail', roles: 'monitorDetail' }
      // },
      // {
      //   path: 'monitorInfo',
      //   component: () => import('@/views/monitorManage/monitorInfo'),
      //   name: 'monitorInfo',
      //   meta: { title: 'monitorInfo', roles: 'monitorManage' }
      // },
      {
        path: 'monitorDetailInfoResult',
        component: () => import('@/views/monitorManage/monitorDetailInfoResult'),
        name: 'monitorDetailInfoResult',
        hidden: true,
        meta: { title: 'monitorDetailInfoResult', roles: 'monitorDetailInfoResult' }
      },
      // 资金流向监控
      {
        path: 'propertyInvestment',
        component: () => import('@/views/monitorManage/propertyInvestment'),
        name: 'propertyInvestment',
        hidden: true,
        meta: { title: 'propertyInvestment' }
      },
      // 地址评分详情
      {
        path: 'fraudData',
        component: () => import('@/views/fraud-data/management'),
        name: 'fraudData',
        hidden: true,
        meta: { title: '地址评分详情' }
      },
      {
        path: 'addressScorePersonDetails',
        component: () => import('@/views/fraud-data/addressScorePersonDetails'),
        name: 'addressScorePersonDetails',
        hidden: true,
        meta: { title: '地址评分-累计人数' }
      },
      {
        path: 'addressScoreScoreDetails',
        component: () => import('@/views/fraud-data/addressScoreScoreDetails'),
        name: 'addressScoreScoreDetails',
        hidden: true,
        meta: { title: '地址评分-累计评分' }
      },
      {
        path: 'addressScoreFocalPointDetails',
        component: () => import('@/views/fraud-data/addressScoreFocalPointDetails'),
        name: 'addressScoreFocalPointDetails',
        hidden: true,
        meta: { title: '地址评分-重点提示地区' }
      },
      {
        path: 'addressScoreRapidGrowthDetails',
        component: () => import('@/views/fraud-data/addressScoreRapidGrowthDetails'),
        name: 'addressScoreRapidGrowthDetails',
        hidden: true,
        meta: { title: '地址评分-快速增长地区' }
      },
      {
        path: 'riskLabelPersonDetails',
        component: () => import('@/views/fraud-data/riskLabelPersonDetails'),
        name: 'riskLabelPersonDetails',
        hidden: true,
        meta: { title: '风险标签-累计人数' }
      },
      {
        path: 'riskLabelScoreDetails',
        component: () => import('@/views/fraud-data/riskLabelScoreDetails'),
        name: 'riskLabelScoreDetails',
        hidden: true,
        meta: { title: '风险标签-累计标签' }
      },
      // 反欺诈详情
      {
        path: 'ManagEment',
        component: () => import('@/views/fraud-data/fraud-data'),
        name: 'ManagEment',
        hidden: true,
        meta: { title: '反欺诈详情' }
      },
      // 风险标签详情数据
      {
        path: 'riskLabel',
        component: () => import('@/views/fraud-data/riskLabel'),
        name: 'RiskLabel',
        hidden: true,
        meta: { title: '风险标签详情' }
      },
      // 详情页
      {
        path: 'addressScore',
        component: () => import('@/views/monitorManage/addressScore'),
        name: 'addressScore',
        hidden: true,
        meta: { title: 'addressScore', roles: 'addressScore' }
      },
      // 地址评分详情
      {
        path: 'frauddata',
        component: () => import('@/views/fraud-data/management'),
        name: 'fraudData',
        hidden: true,
        meta: { title: '地址评分详情' }
      },
      // 反欺诈详情
      {
        path: 'management',
        component: () => import('@/views/fraud-data/fraud-data'),
        name: 'ManagEment',
        hidden: true,
        meta: { title: '反欺诈详情' }
      },
      // 核销销客户详情
      {
        path: 'writeOffCustomer',
        component: () => import('@/views/writeOffCustomer/writer'),
        name: 'writeOffCustomer',
        hidden: true,
        meta: { title: '核销客户详情' }
      },
      {
        path: 'writecustPopleList',
        component: () => import('@/views/writeOffCustomer/writecustPopleList'),
        name: 'writecustPopleList',
        hidden: true,
        meta: { title: '核销客户-累计监控人数' }
      },
      {
        path: 'writeScoreList',
        component: () => import('@/views/writeOffCustomer/writeScoreList'),
        name: 'writeScoreList',
        hidden: true,
        meta: { title: '核销客户-累计放款数据' }
      },
      // 反欺诈累计监控人数
      {
        path: 'FraudDataPerson',
        component: () => import('@/views/fraud-data/fraudData/FraudDataPerson'),
        name: 'FraudDataPerson',
        hidden: true,
        meta: { title: '反欺诈累计监控人数' }
      },
      // 反欺诈累计评分结果
      {
        path: 'FraudDataScore',
        component: () => import('@/views/fraud-data/fraudData/FraudDataScore'),
        name: 'FraudDataScore',
        hidden: true,
        meta: { title: '反欺诈累计评分结果' }
      },
      // 风险标签详情数据
      {
        path: 'RiskLabel',
        component: () => import('@/views/fraud-data/riskLabel'),
        name: 'RiskLabel',
        hidden: true,
        meta: { title: '风险标签详情' }
      },
      // 预警详情
      // {
      //   path: 'alertInfoDetails',
      //   component: () => import('@/views/alert/alertInfoDetails'),
      //   name: 'alertInfoDetails',
      //   meta: { title: 'alertInfoDetails' },
      //   hidden: false
      // },
      {
        path: 'alertInfoDetailList',
        component: () => import('@/views/alert/alertInfoDetailList'),
        name: 'alertInfoDetailList',
        meta: { title: 'alertInfoDetailList' },
        hidden: true
      },

      // 预警管理
      // {
      //   path: 'alertInfo',
      //   component: () => import('@/views/alert/alertInfo'),
      //   name: 'alertInfo',
      //   meta: { title: 'alertInfo', roles: 'alertManage' }
      // },
      {
        path: 'ruleConfig',
        component: () => import('@/views/monitorManage/ruleConfig'),
        name: 'ruleConfig',
        meta: { title: 'ruleConfig', roles: 'ruleConfig' }
      }
    ]
  },

  // 风险运营
  {
    path: '/riskoperation',
    component: Layout,
    redirect: 'riskoperation',
    name: 'riskoperation',
    meta: { title: 'riskoperation', icon: 'el-icon-set-up', roles: 'riskOperation' },
    // hidden:true,
    children: [
      // 策略管理
      {
        path: 'policymanagement',
        component: () => import('@/views/policymanagement'),
        name: 'policymanagement',
        meta: { title: 'policymanagement', role: 'policymanagement' },
        children: [
          {
            // 主动策略
            path: 'activestrategy',
            component: () => import('@/views/policymanagement/activestrategy'),
            name: 'activestrategy',
            meta: { title: 'activestrategy', roles: 'activeStrategy' }
          },
          {
            // 主动策略-查看明细
            path: 'seeviewreport',
            component: () => import('@/views/policymanagement/seeviewreport'),
            name: 'seeviewreport',
            hidden: true,
            meta: { title: 'seeviewreport', role: 'seeviewreport' }
          },
          {
            // 入模参数
            path: 'moldingparameters',
            component: () => import('@/views/policymanagement/moldingparameters'),
            name: 'moldingparameters',
            hidden: true,
            meta: { title: 'moldingparameters', role: 'moldingparameters' }
          },
          {
            // 入模参数展示
            path: 'showfmoldingparameters',
            component: () => import('@/views/policymanagement/modelshoweach'),
            name: 'showfmoldingparameters',
            hidden: true,
            meta: { title: 'showfmoldingparameters', role: 'showfmoldingparameters' }
          }
        ]
      },
      {
        // 模型配置
        path: 'modelconfiguration',
        component: () => import('@/views/policymanagement/modelconfiguration'),
        name: 'modelconfiguration',
        meta: { title: 'modelconfiguration', roles: 'modelConfig' }
      },
      {
        // 监控报表
        path: 'monitoringreport',
        component: () => import('@/views/policymanagement/monitoringreport'),
        name: 'monitoringreport',
        hidden: true,
        meta: { title: 'monitoringreport', role: 'monitoringreport' }
      }
    ]
  },

  // 用户分析
  {
    path: '/userAnalysis',
    component: Layout,
    redirect: 'noRedirect',
    name: 'userAnalysis',
    meta: { title: 'userAnalysis', icon: 'el-icon-user-solid', roles: 'userAnalysis' },
    children: [
      // 统计报告
      {
        path: 'statisticalreport',
        component: () => import('@/views/individualCustomer'),
        name: 'statisticalreport',
        meta: { title: 'statisticalreport', role: 'statisticalreport' },
        children: [
          // 个人客户
          {
            path: 'customerList',
            component: () => import('@/views/individualCustomer/customerList'),
            name: 'consumerClient',
            meta: { title: 'consumerClient', roles: 'individualCustomer' }
          },
          // 企业用户
          {
            path: 'enterprisecustomers',
            component: () => import('@/views/individualCustomer/enterprisecustomers'),
            name: 'enterprisecustomers',
            hidden: true,
            meta: { title: 'enterprisecustomers', role: 'enterprisecustomers' }
          }
        ]
      },
      // 个人用户详情
      {
        path: 'customerAnalysis',
        component: () => import('@/views/individualCustomer/customerAnalysis'),
        name: 'individualCustomer',
        meta: { title: 'individualCustomer', role: 'individualCustomer' },
        hidden: true
      },
      // 用户画像
      {
        path: 'userportrait',
        name: 'userportrait',
        component: () => import('@/views/userportrait'),
        meta: { title: 'userportrait', roles: 'customerPortrait' },
        children: [
          {
            // 客群画像
            path: 'guestgroupportrait',
            component: () => import('@/views/userportrait/guestgroupportrait'),
            name: 'guestgroupportrait',
            meta: { title: 'guestgroupportrait', roles: 'portraitManage' }
          },
          // 创建用户画像
          {
            path: 'usergroupportrait',
            component: () => import('@/views/userportrait/usergroupportrait'),
            name: 'usergroupportrait',
            hidden: true,
            meta: { title: 'usergroupportrait', role: 'usergroupportrait' }
          },
          //画像详情
          {
            path: 'portraitdetails',
            component: () => import('@/views/userportrait/portraitdetails'),
            name: 'portraitdetails',
            hidden: true,
            meta: { title: 'portraitdetails', role: 'portraitdetails' }
          },
          {
            // 标签管理
            path: 'labelmanagement',
            component: () => import('@/views/userportrait/labelmanagement'),
            name: 'labelmanagement',
            meta: { title: 'labelmanagement', roles: 'tagManage' }
          },
          {
            // 客群管理
            path: 'customergroupmanagement',
            component: () => import('@/views/userportrait/customergroupmanagement'),
            name: 'customergroupmanagement',
            meta: { title: 'customergroupmanagement', roles: 'userGroupManage' }
          }

        ]
      }
    ]
  },

  // 贷后管理
  {
    path: '/postLoanManage',
    component: Layout,
    redirect: 'noRedirect',
    name: 'postLoanManage',
    meta: { title: 'postLoanManage', icon: 'tab', roles: 'postLoanManage' },
    children: [
      {
        // 贷后回访
        path: 'postLoanReturnVisit',
        component: () => import('@/views/postLoanManage/postLoanReturnVisit'),
        name: 'postLoanReturnVisit',
        meta: { title: 'postLoanReturnVisit', roles: 'postLoanReturnVisit' }
      },
      {
        // 核销管理
        path: 'writeoffmanagement',
        component: () => import('@/views/writeOffCustomer/writeoffmanagement'),
        name: 'writeoffmanagement',
        hidden: true,
        meta: { title: 'writeoffmanagement', role: 'writeoffmanagement' }
      },
      {
        // 档案管理
        path: 'filemanagement',
        component: () => import('@/views/writeOffCustomer/filemanagement'),
        name: 'filemanagement',
        hidden: true,
        meta: { title: 'filemanagement', role: 'filemanagement' }
      }
    ]
  },

  // {
  //   path: '/client-manage',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'clientManage',
  //   meta: { title: 'clientManage', icon: 'tab',role:"clientManage" },
  //   children: [
  //     {
  //       path: '/consumerClient',
  //       component: () => import('@/views/client-manage/consumerClient'),
  //       name: 'consumerClient',
  //       meta: { title: 'consumerClient',role:"consumerClient" }
  //     }
  //   ]
  // },
  // 资金流向列表
  {
    path: '/fund-flow',
    component: Layout,
    redirect: 'noRedirect',
    name: 'fundManage',
    hidden: true,
    meta: { title: 'fundManage', icon: 'tab' },
    children: [
      {
        path: 'dubious',
        component: () => import('@/views/fund-flow/dubious'),
        name: 'dubious',
        meta: { title: 'dubious' }
      },
      {
        path: 'alertNumberPeople',
        component: () => import('@/views/fund-flow/alertNumberPeople'),
        name: 'alertNumberPeople',
        meta: { title: 'alertNumberPeople' }
      }
    ]
  },
  {
    path: '/systemManage',
    component: Layout,
    redirect: 'noRedirect',
    name: 'systemManage',
    meta: { title: 'systemManage', icon: 'el-icon-s-tools', roles: 'systemManage' },
    children: [
      {
        path: 'role',
        component: () => import('@/views/systemManage/role/index'),
        name: 'roleManage',
        meta: { title: 'roleManage', roles: 'roleManage' }
      },
      {
        path: 'user',
        component: () => import('@/views/systemManage/user/index'),
        name: 'userManage',
        meta: { title: 'userManage', roles: 'userManage' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

//路由版本问题报错
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

export default router
