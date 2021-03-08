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
import LeiBie from '@/components/ModelHan/LeiBie'

import ClientShow from '@/components/MrYang/ClientShow'
import Client from '@/components/MrYang/Client'
import ClientModify from '@/components/MrYang/ClientModify'
import CustomerClassShow from '@/components/MrYang/CustomerClassShow'
import CustomerClass from '@/components/MrYang/CustomerClass'
import CustomerClassModify from '@/components/MrYang/CustomerClassModify'
import ClientgradeShow from '@/components/MrYang/ClientgradeShow'
import Clientgradeadd from '@/components/MrYang/Clientgradeadd'
import ClientgradeModify from '@/components/MrYang/ClientgradeModify'
import Custometag from '@/components/MrYang/Custometag'
import Custometagadd from '@/components/MrYang/Custometagadd'
import Custometagmodify from '@/components/MrYang/Custometagmodify'
import GongyingshangShow from '@/components/MrYang/Gongyinghang/GongyingshangShow'
import Supplieradd from '@/components/MrYang/Gongyinghang/Supplieradd'
import Gongyingshangmodify from '@/components/MrYang/Gongyinghang/Gongyingshangmodify'
import Clationadd from '@/components/MrYang/Gongyinghang/Clationadd'
import Clationshow from '@/components/MrYang/Gongyinghang/Clationshow'
import Clationmodify from '@/components/MrYang/Gongyinghang/Clationmodify'
import Mdianadd from '@/components/MrYang/Mendian/Mdianadd'
import Mdianmodify from '@/components/MrYang/Mendian/Mdianmodify'
import Mdianshow from '@/components/MrYang/Mendian/Mdianshow'
import Warehouseshow from '@/components/MrYang/Warehouse/Warehouseshow'
import Warehouseadd from '@/components/MrYang/Warehouse/Warehouseadd'
import Warehousemodify from '@/components/MrYang/Warehouse/Warehousemodify'
import Accountadd from '@/components/MrYang/Account/Accountadd'
import Accountmodify from '@/components/MrYang/Account/Accountmodify'
import Accountshow from '@/components/MrYang/Account/Accountshow'
import Shopmodify from '@/components/MrYang/Shoping/Shopmodify'
import Shoptypeadd from '@/components/MrYang/Shoping/Shoptypeadd'
import Shoptypeshow from '@/components/MrYang/Shoping/Shoptypeshow'
import Shopbqadd from '@/components/MrYang/Shoping/Shopbqadd'
import shopbqmodify from '@/components/MrYang/Shoping/shopbqmodify'
import shopbqshow from '@/components/MrYang/Shoping/shopbqshow'
import Shopdanwadd from '@/components/MrYang/Shoping/Shopdanwadd'
import Shopdanwmodify from '@/components/MrYang/Shoping/Shopdanwmodify'
import shopdanwshow from '@/components/MrYang/Shoping/shopdanwshow'
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
    },
    {
      path: '/LeiBie',
      name: '销售汇总表(按商品)',
      component:LeiBie,
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
    } ,
    {
      path: '/zclassifyadd',
      name: '客户分类添加頁面',
      component:CustomerClass,
    } ,
    {
      path: '/zclassifymodify',
      name: '客户分类修改页面',
      component:CustomerClassModify,
    } ,
    {
      path: '/zlevel',
      name: '客户等級',
      component:ClientgradeShow,
    },
    {
      path:'/zleveladd',
      name:'客户等級添加页面',
      component:Clientgradeadd,
    },
    {
      path:'/zlevelmodify',
      name:'客户等級修改页面',
      component:ClientgradeModify,
    } ,
    {
      path: '/zlabel',
      name: '客户标签',
      component:Custometag,
    },
    {
      path:'/zlabeladd',
      name:'客户标添加页面',
      component:Custometagadd,
    },
    {
      path:'/zlabelmodify',
      name:'客户标签修改页面',
      component:Custometagmodify,
    },
    {
      path:'/zsupplier',
      name:'供应商管理',
      component:GongyingshangShow,
    },
    {
      path:'/zsupplieradd',
      name:'供应商管理添加',
      component:Supplieradd,
    },
    {
      path:'/zsuppliermodify',
      name:'供应商管理修改',
      component:Gongyingshangmodify,
    },
    {
      path:'/zsupplierclassifyadd',
      name:'供应商管理修改',
      component:Clationadd,
    },
    {
      path:'/zsupplierclassify',
      name:'供应商管理修改',
      component:Clationshow,
    },
    {
      path:'/zsupplierclassifymodify',
      name:'供应商管理修改',
      component:Clationmodify,
    },
    {
      path:'/zoutlet',
      name:'门店管理',
      component:Mdianshow,
    },
    {
      path:'/zoutletadd',
      name:'门店管理添加',
      component:Mdianadd,
    },
    {
      path:'/zoutletmodify',
      name:'门店管理修改',
      component:Mdianmodify,
    },
    {
      path:'/zwarehouse',
      name:'门店管理修改',
      component:Warehouseshow,
    },
    {
      path:'/zwarehouseadd',
      name:'门店管理修改',
      component:Warehouseadd,
    },
    {
      path:'/zwarehousemodify',
      name:'门店管理修改',
      component:Warehousemodify,
    },
    {
      path:'/zaccount',
      name:'账户管理',
      component:Accountshow,
    },
    {
      path:'/zaccountadd',
      name:'账户管理添加',
      component:Accountadd,
    },
    {
      path:'/zaccountmodify',
      name:'账户管理修改',
      component:Accountmodify,
    },
    {
      path:'/zclass',
      name:'商品分类显示',
      component:Shoptypeshow,
    },
    {
      path:'/zclassifyadd',
      name:'商品分类添加',
      component:Shoptypeadd,
    },
    {
      path:'/zclassifymodify',
      name:'商品分类修改',
      component:Shopmodify,
    },
    {
      path:'/zcommodity',
      name:'商品标签',
      component:shopbqshow,
    },
    {
      path:'/zcommodityadd',
      name:'商品分类修改',
      component:Shopbqadd,
    },
    {
      path:'/zcommoditymodify',
      name:'商品分类修改',
      component:shopbqmodify,
    },
    {
      path:'/zunit',
      name:'单位库显示',
      component:shopdanwshow,
    },
    {
      path:'/zunitadd',
      name:'单位库添加',
      component:Shopdanwadd,
    },
    {
      path:'/zunitmodify',
      name:'单位库修改',
      component:Shopdanwmodify,
    }

  ]
})
