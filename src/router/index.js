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
import inven from '@/components/Inventory/InventorySels'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shou',
      component: shou
    } ,
    {
      path: '/sell',
      name: 'sell',
      component:sell,
    },
    {
      path: '/sellreturn',
      name: 'sellreturn',
      component:sellreturn,
    },    
    {
      path: '/zreceipt',
      name: 'receiptPayments',
      component:receiptPayments,
    } ,    
    {
      path: '/zpayment',
      name: 'payment',
      component:payment,
    } ,
    {
      path: '/Stock',
      name: 'inven',
      component:inven,
    }
  ]
})
