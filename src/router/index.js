import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import shou from '@/components/shou'
import sell from '@/components/views/sell'
import sellreturn from '@/components/views/sellreturn'
import receiptPayments from '@/components/ModelGuo/receiptPayments'
import Addfkd from '@/components/ModelGuo/Addfkd'
import Addfkdy from '@/components/ModelGuo/Addfkdy'
import payment from '@/components/ModelGuo/payment'
import SalesSingleShow from '@/components/ModelHan/SalesSingleShow'
import SellCollect from '@/components/ModelHan/SellCollect'
import inven from '@/components/Inventory/InventorySels'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: shou
    },
    {
      path: '/Stock',
      name: '库存',
      component: inven
    },
    {
      path: '/sellreturn',
      name: '销售退货申请单',
      component: sellreturn,
    },
    {
      path: '/zreceipt',
      name: '收款单',
      component: receiptPayments,
    },
    {
      path: '/zpayment',
      name: '付款单',
      component: payment,
    },
    {
      path: '/bdetail',
      name: '销售明细表',
      component: SalesSingleShow,
    },
    {
      path: '/bcollect',
      name: '销售汇总表',
      component: SellCollect,
    },
    {
      path: '/Addfkd',
      name: '收款单添加',
      component: Addfkd,
    },
    {
      path: '/Addfkdy',
      name: '付款单添加',
      component: Addfkdy,
    }

  ]
})
