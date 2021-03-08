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
import SalesSingleShow from '@/components/ModelHan/SalesSingleShow'
import SellCollect from '@/components/ModelHan/SellCollect'
import inven from '@/components/Inventory/InventorySels'
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

import App from '@/App'
import One from '@/One'

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

      ],
    },
  ]
})
