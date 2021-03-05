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
import SalesSingleShow from '@/components/ModelHan/SalesSingleShow'
import SellCollect from '@/components/ModelHan/SellCollect'
import inven from '@/components/Inventory/InventorySels'
import SLeiBie from '@/components/ModelHan/SLeiBie'
import SShangPin from '@/components/ModelHan/SShangPin'
import SKeHu from '@/components/ModelHan/SKeHu'
import running from '@/components/Inventory/WaterSel'
import point from '@/components/Inventory/CheckShow'
import AddCheck from '@/components/Inventory/AddCheck'

import ClientShow from '@/components/MrYang/ClientShow'
import Client from '@/components/MrYang/Client'
import ClientModify from '@/components/MrYang/ClientModify'
import CustomerClassShow from '@/components/MrYang/CustomerClassShow'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: shou
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
