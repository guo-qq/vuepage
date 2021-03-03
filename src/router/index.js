import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import shou from '@/components/shou'
import XX from '@/components/views/XX'
import XX2 from '@/components/views/XX2'
import XX3 from '@/components/views/XX3'
import sell from '@/components/views/sell'
import sellreturn from '@/components/views/sellreturn'
import receiptPayments from '@/components/ModelGuo/receiptPayments'
import payment from '@/components/ModelGuo/payment'
import SalesSingleShow from '@/components/ModelHan/SalesSingleShow'
import SellCollect from '@/components/ModelHan/SellCollect'
import inven from '@/components/Inventory/InventorySels'
import Client from '@/components/MrYang/Client'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: shou
    } ,
    {
      path: '/Stock',
      name: '库存',
      component: inven
    } ,
    {
      path: '/sellreturn',
      name: '销售退货申请单',
      component:sellreturn,
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
    },
    {
      path: '/bdetail',
      name: '销售明细表',
      component:SalesSingleShow,
    },
    {
      path: '/bcollect',
      name: '销售汇总表',
      component:SellCollect,
    }
    } ,
    {
      path: '/zclient',
      name: '客户管理',
      component:Client,
    } 

  ]
})
