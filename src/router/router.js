/**
 * 路由表
 * @type {import("vue-router").RoutrRecordRaw[]}
 */
 
export default new Router({
    routes: [
      {
        path: '/',
        name: 'shou',
        component: shou
      },
      {
        path: '/XX',
        name: 'XX',
        component:XX,
      },
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
        path: '/SalesSingleShow',
        name: 'SalesSingleShow',
        component:SalesSingleShow,
      }      
        
      
      
    ]
  })
  