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
import SLeiBie from '@/components/ModelHan/SLeiBie'
import SShangPin from '@/components/ModelHan/SShangPin'
import SKeHu from '@/components/ModelHan/SKeHu'
import running from '@/components/Inventory/WaterSel'
import point from '@/components/Inventory/CheckShow'
import AddCheck from '@/components/Inventory/AddCheck'
import AddAllot from '@/components/Inventory/AddAllot'
import TiaoBo from '@/components/Inventory/AllotShow'
import ClientShow from '@/components/MrYang/ClientShow'
import Client from '@/components/MrYang/Client'
import ClientModify from '@/components/MrYang/ClientModify'
import CustomerClassShow from '@/components/MrYang/CustomerClassShow'
import lend from '@/components/Inventory/JieChu'
import AddJie from '@/components/Inventory/AddJie'
import ckmanagement from '@/components/Inventory/ckmanagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: shou
    } ,
    {
      path: '/ckmanagement',
      name: '出库管理',
      component: ckmanagement
    } ,
    {
      path: '/AddJie',
      name: '借出新增',
      component: AddJie
    } ,
    {
      path: '/lend',
      name: '借出',
      component: lend
    },
    {
      path: '/TiaoBo',
      name: '调拨单',
      component: TiaoBo
    } ,
    {
      path: '/AddAllot',
      name: '亲憎调拨单',
      component: AddAllot
    } ,
    {
      path: '/AddCheck',
      name: '新增盘点表',
      component: AddCheck
    } ,
    {
      path: '/running',
      name: '库存流水',
      component: running
    } ,
    {
      path: '/point',
      name: '库存盘点',
      component: point
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
    },
    {
      path: '/SLeiBie',
      name: '销售汇总表(按类别)',
      component:SLeiBie,
    }
    ,
    {
      path: '/SShangPin',
      name: '销售汇总表(按商品)',
      component:SShangPin,
    },
    {
      path: '/SKeHu',
      name: '销售汇总表(按客户)',
      component:SKeHu,
    },
    {
      path: '/zclient',
      name: '客户管理',
      component:ClientShow,
    } ,
    {
      path: '/zclientadd',
      name: '客户管理添加页面',
      component:Client,
    } ,
    {
      path: '/zclientmodify',
      name: '客户管理修改页面',
      component:ClientModify,
    } ,
    {
      path: '/zclassify',
      name: '客户分类',
      component:CustomerClassShow,
    } 
    

  ]
})
