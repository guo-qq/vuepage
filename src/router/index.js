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
import Addfkd from '@/components/ModelGuo/Addfkd'
import Addfkdy from '@/components/ModelGuo/Addfkdy'
import senterprise from '@/components/ModelGuo/senterprise'
import sstaff from '@/components/ModelGuo/sstaff'
import srole from '@/components/ModelGuo/srole'
import slog from '@/components/ModelGuo/slog'
//其他收支
import ZLS from '@/components/ModelGuo/ZLS'
import payment from '@/components/ModelGuo/payment'

//报表
import SalesSingleShow from '@/components/ModelHan/SalesSingleShow'
import SellCollect from '@/components/ModelHan/SellCollect'
import SLeiBie from '@/components/ModelHan/SLeiBie'
import SShangPin from '@/components/ModelHan/SShangPin'
import SKeHu from '@/components/ModelHan/SKeHu'
import BSalesSingleShow from '@/components/ModelHan/BSalesSingleShow'
import BuyerCollect from '@/components/ModelHan/BuyerCollect'
import BShangPin from '@/components/ModelHan/BShangPin'
import BSupplier from '@/components/ModelHan/BSupplier'
import RepertoryFirst from '@/components/ModelHan/RepertoryFirst'
import RepertoryTwo from '@/components/ModelHan/RepertoryTwo'
import RepertoryMax from '@/components/ModelHan/RepertoryMax'
import RepertoryMin from '@/components/ModelHan/RepertoryMin'
import Profile from '@/components/ModelHan/Profile'
import ReceiptShou from '@/components/ModelHan/ReceiptShou'
import ReceiptFu from '@/components/ModelHan/ReceiptFu'
import PerformanceShow from '@/components/ModelHan/PerformanceShow'


import inven from '@/components/Inventory/InventorySels'
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
import ckdetail from '@/components/Inventory/ckdetail'

import App from '@/App'
import One from '@/One'

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
import Shuxinkuadd from '@/components/MrYang/Shoping/Shuxinkuadd'
import Shuxinkumodify from '@/components/MrYang/Shoping/Shuxinkumodify'
import Shuxinkushow from '@/components/MrYang/Shoping/Shuxinkushow'
import Shoptypetian from '@/components/MrYang/Shoping/Shoptypetian'
import Shopkuadd from '@/components/MrYang/Shoping/Shopkuadd'
import Shopkumodify from '@/components/MrYang/Shoping/Shopkumodify'
import Shopkushow from '@/components/MrYang/Shoping/Shopkushow'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',     
      component: registerindex,   
   
    },
    {
      path: '/enrollindex',
      name: '注册',
      component: enrollindex,
    },
    
    {
      path: '/company',
      name: '完善企业资料',
      component: company,
    },
    {
      path: '/Home', 
      component: One,
      children: [
        {
          path: '/ckdetail',
          name: '出库明细',
          component: ckdetail,
        },
        {
          path: '/AddCheck',
          name: '新增盘点表',
          component: AddCheck
        },
        {
          path: '/running',
          name: '库存流水',
          component: running
        },
        {
          path: '/point',
          name: '库存盘点',
          component: point
        },
        {
          path: '/ckmanagement',
          name: '出库管理',
          component: ckmanagement
        } ,
        {
          path: '/Stock',
          name: '库存',
          component: inven
        },
        {
          path: '/sell',
          name: '销售退货申请单',
          component: sell,
        },
        {
          path: '/sellreturn',
          name: '销售退货申请单',
          component: sellreturn,
        },
        {
          path: '/purchase',
          name: '采购单',
          component: purchase,
        },
        {
          path: '/purchasereturn',
          name: '采购退货申请单',
          component: purchasereturn,
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
          path: '/SLeiBie',
          name: '销售汇总表(按类别)',
          component: SLeiBie,
        }
        ,
        {
          path: '/SShangPin',
          name: '销售汇总表(按商品)',
          component: SShangPin,
        },
        {
          path: '/SKeHu',
          name: '销售汇总表(按客户)',
          component: SKeHu,
        },
        {
          path: '/zclient',
          name: '客户管理',
          component: ClientShow,
        },
        {
          path: '/zclientadd',
          name: '客户管理添加页面',
          component: Client,
        },
        {
          path: '/zclientmodify',
          name: '客户管理修改页面',
          component: ClientModify,
        },
        {
          path: '/zclassify',
          name: '客户分类',
          component: CustomerClassShow,
        },
        {
          path: '/zclient',
          name: '客户管理',
          component: ClientShow,
        },
        {
          path: '/zclientadd',
          name: '客户管理添加页面',
          component: Client,
        },
        {
          path: '/zclientmodify',
          name: '客户管理修改页面',
          component: ClientModify,
        },
        {
          path: '/zclassify',
          name: '客户分类',
          component:CustomerClassShow,
        },
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
          name:'商品分类添加子类',
          component:Shoptypeadd,
        },
        {
          path:'/zclassifymodify',
          name:'商品分类修改',
          component:Shopmodify,
        },
        {
          path:'/zclasaddd',
          name:'商品分类添加',
          component:Shoptypetian,
        },
        {
          path:'/zcommodity',
          name:'商品标签',
          component:shopbqshow,
        },
        {
          path:'/zcommodityadd',
          name:'商品标签添加',
          component:Shopbqadd,
        },
        {
          path:'/zcommoditymodify',
          name:'商品标签修改',
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
        },
        {
          path:'/zprop',
          name:'属性库显示',
          component:Shuxinkushow,
        },
        {
          path:'/zpropadd',
          name:'属性库添加',
          component:Shuxinkuadd,
        },
        {
          path:'/zpropmodify',
          name:'属性库修改',
          component:Shuxinkumodify,
        },
        {
          path:'/zcomku',
          name:'商品库显示',
          component:Shopkushow,
        },
        {
          path:'/zcomkuadd',
          name:'商品库添加',
          component:Shopkuadd,
        },
        {
          path:'/zcomkumodify',
          name:'商品库修改',
          component:Shopkumodify,
        },
        {
          path: '/market',
          name: '新增销售单',
          component: market,
        },
        {
          path: '/AddSellretun',
          name: '新增销售退货单',
          component: AddSellretun,
        },
        {
          path: '/Addpurchase',
          name: '新增采购单',
          component: Addpurchase,
        },
        {
          path: '/Addpurchaseretun',
          name: '新增采购退货单',
          component: Addpurchaseretun,
        },
        {
          path: '/details',
          name: '销售详情页',
          component: details,
        },
        {
          path: '/Home',
          name: '首页',
          component: shou,
        },
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
        },
        {
          path: '/bprocurement',
          name: '采购明细表',
          component:BSalesSingleShow,
        },
        {
          path: '/BuyerCollect',
          name: '采购汇总表',
          component:BuyerCollect,
        },
        {
          path: '/BShangPin',
          name: '采购汇总表(按商品)',
          component:BShangPin,
        },
        {
          path: '/BSupplier',
          name: '销售汇总表(按供应商)',
          component:BSupplier,
        },
        {
          path: '/bwarning',
          name: '库存预警表',
          component:RepertoryFirst,
        },
        {
          path: '/RepertoryMax',
          name: '超过库存上限',
          component:RepertoryMax,
        },
        {
          path: '/RepertoryMin',
          name: '低于库存下限',
          component:RepertoryMin,
        },
        {
          path: '/bbalance',
          name: '库存余额表',
          component:RepertoryTwo,
        },
        {
          path: '/zrests',
          name: '其他收支',
          component: ZLS,
        },
        {
          path: '/senterprise',
          name: '企业信息',
          component: senterprise,
        },
        {
          path: '/sstaff',
          name: '员工管理',
          component: sstaff,
        },
        {
          path: '/srole',
          name: '角色管理',
          component: srole,
        },
        {
          path: '/slog',
          name: '操作日志',
          component: slog,
        },
        {
          path: '/bbill',
          name: '客户对账单',
          component: ReceiptShou,
        },
        {
          path: '/bstatement',
          name: '供应商对账单',
          component: ReceiptFu,
        },
        {
          path: '/bgeneralize',
          name: '财务分析',
          component: Profile,
        },
        {
          path: '/bperformance',
          name: '销售业绩',
          component: PerformanceShow,
        },

      ],
    },
    {
      path: '/AddCheck',
      name: '新增盘点表',
      component: AddCheck
    },
    {
      path: '/running',
      name: '库存流水',
      component: running
    },
    {
      path: '/point',
      name: '库存盘点',
      component: point
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
    },
    {
      path: '/SLeiBie',
      name: '销售汇总表(按类别)',
      component:SLeiBie,
    },
    {
      path: '/SShangPin',
      name: '销售汇总表(按商品)',
      component: SShangPin,
    },
    {
      path: '/SKeHu',
      name: '销售汇总表(按客户)',
      component: SKeHu,
    },
    {
      path: '/bprocurement',
      name: '采购明细表',
      component:BSalesSingleShow,
    },
    {
      path: '/BuyerCollect',
      name: '采购汇总表',
      component:BuyerCollect,
    },
    {
      path: '/BShangPin',
      name: '采购汇总表(按商品)',
      component:BShangPin,
    },
    {
      path: '/BSupplier',
      name: '销售汇总表(按供应商)',
      component:BSupplier,
    },
    {
      path: '/bwarning',
      name: '库存预警表',
      component:RepertoryFirst,
    },
    {
      path: '/RepertoryMax',
      name: '超过库存上限',
      component:RepertoryMax,
    },
    {
      path: '/RepertoryMin',
      name: '低于库存下限',
      component:RepertoryMin,
    },
    {
      path: '/bbalance',
      name: '库存余额表',
      component:RepertoryTwo,
    },
    
    {
      path: '/zrests',
      name: '其他收支',
      component: ZLS,
    },
    {
      path: '/senterprise',
      name: '企业信息',
      component: senterprise,
    },
    {
      path: '/sstaff',
      name: '员工管理',
      component: sstaff,
    },
    {
      path: '/srole',
      name: '角色管理',
      component: srole,
    },
    {
      path: '/slog',
      name: '操作日志',
      component: slog,
    },
  ]
})
