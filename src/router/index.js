import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import shou from '@/components/shou'
import XX from '@/components/views/XX'
import XX2 from '@/components/views/XX2'
import XX3 from '@/components/views/XX3'
import sell from '@/components/ModelLiu/sell'  //销售
import sellreturn from '@/components/ModelLiu/sellreturn'  //销售退货
import purchase from '@/components/ModelLiu/purchase'  //采购
import purchasereturn from '@/components/ModelLiu/purchasereturn'  //采购退货
import market from '@/components/ModelLiu/market'  //新增销售
import AddSellretun from '@/components/ModelLiu/AddSellretun'  //新增销售退货
import Addpurchase from '@/components/ModelLiu/Addpurchase'  //新增采购
import Addpurchaseretun from '@/components/ModelLiu/Addpurchaseretun'  //新增采购退货
import registerindex from '@/components/ModelLiu/registerindex'  //登录
import enrollindex from '@/components/ModelLiu/enrollindex'  //注册
import company from '@/components/ModelLiu/company'  //完善企业资料
import details from '@/components/ModelLiu/details'  //详情页

import receiptPayments from '@/components/ModelGuo/receiptPayments'
import payment from '@/components/ModelGuo/payment'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: shou
    } ,
    {
      path: '/sell',
      name: '销售单',
      component:sell,
    },
    {
      path: '/sellreturn',
      name: '销售退货申请单',
      component:sellreturn,
    },  
    {
      path: '/purchase',
      name: '采购单',
      component:purchase,
    },
    {
      path: '/purchasereturn',
      name: '采购退货申请单',
      component:purchasereturn,
    },  
    {
      path: '/zreceipt',
      name: '收款单',
      component:receiptPayments,
    } ,    
    {
      path: '/zpayment',
      name: '付款单',
      component:payment,
    } ,
    {
      path: '/market',
      name: '新增销售单',
      component:market,
    },
    {
      path: '/AddSellretun',
      name: '新增销售退货单',
      component:AddSellretun,
    },
    {
      path: '/Addpurchase',
      name: '新增采购单',
      component:Addpurchase,
    },
    {
      path: '/Addpurchaseretun',
      name: '新增采购退货单',
      component:Addpurchaseretun,
    },
    {
      path: '/details',
      name: '销售详情页',
      component:details,
    },
    {
      path: '/registerindex',
      name: '登录',
      component:registerindex,
    },
    {
      path: '/enrollindex',
      name: '注册',
      component:enrollindex,
    },
    {
      path: '/company',
      name: '完善企业资料',
      component:company,
    },
    



  ]
})
