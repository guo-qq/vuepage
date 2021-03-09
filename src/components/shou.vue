<template>
  <div>
    <div class="div1">
          <div class="d1"></div>
          <div class="d1"></div>
          <div class="d1"></div>
          <div class="d1"></div>
    </div>
    <div class="div2">
       <div :class="className" :id="id" :style="{height:height,width:width}"></div>
    </div>
    <div class="div3"></div>
    <div class="div4"></div>
    <div class="div5">
      <div><span class="sp1">待处理的订单</span></div>
      <div class="div00"><span class="sp2">待审销售单</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sp3">0</span></div>
      <div class="div00"><span class="sp2">待审采购单</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sp3">0</span></div>
      <div class="div00"><span class="sp2">待入库单</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sp3">0</span></div>
      <div class="div00"><span class="sp2">待出库单</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sp3">0</span></div>
    </div>
    <div class="div6">
      <div><span class="sp1">商品概况</span></div>
      <div class="div00"><span class="sp2">全部商品</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sp4">0</span><span>件</span></div>
      <div class="div00"><span class="sp2">滞销商品</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sp4">0</span><span>件</span></div>
      <div class="div00"><span class="sp2">库存不足</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sp4">0</span><span>件</span></div>
      <div class="div00"><span class="sp2">库存超储</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sp4">0</span><span>件</span></div>
    </div>
  </div>
</template>


<style scoped>
.div1 {
  width: 100%;
  height: 100px;
  background-size: cover;
}
.div2 {
  width: 59%;
  height: 400px;
  border: gray 1px solid;
  background-size: cover;
  float: left;
  margin-top: 10px;
  margin-right: 10px;
}
.div3 {
  width: 40%;
  height: 400px;
  border: gray 1px solid;
  background-size: cover;
  float: left;
  margin-top: 10px;
  margin-bottom:10px;
}
.div4 {
  width: 100%;
  height: 150px;
  border: gray 1px solid;
  background-size: cover;
  clear: both;
}
.div5 {
  width: 49%;
  height: 150px;
  border: gray 1px solid;
  background-size: cover;
  margin-top: 10px;
  float: left;
  margin-right: 10px;
}
.div6 {
  width: 50%;
  height: 150px;
  border: gray 1px solid;
  background-size: cover;
  margin-top: 10px;
  float: left;
}
.d1{
  height: 90px;
  width: 24%;
  margin-left: 13px;
  border: gray 1px solid;
  float: left;
}
.div00{
  float: left;
  margin-left: 80px;
  margin-top: 20px;
}
.sp1{
  color: gray;
  padding-left: 10px;
}
.sp2{
  font-size: 16px;
}
.sp3{
  font-size: 26px;
  color: green;
}
.sp4{
  font-size: 26px;
  color: orange;
}
</style>
