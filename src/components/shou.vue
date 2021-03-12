<template>
  <div>
    <div class="div1">
          <div class="d1">
                <el-card shadow="always" style="height:90px;background-color:rgb(196, 196, 243);">
                    <span class="ss1">销售总金额</span>
                    <br>
                    <span class="ss1">￥{{this.TotalSum}}</span>
                </el-card>
          </div>
          <div class="d1">
              <el-card shadow="always" style="height:90px;background-color: rgb(228, 99, 99);">
                  <span class="ss1">销售笔数</span>
                   <br>
                  <span class="ss1">{{this.SellSum}}</span>
              </el-card>
          </div>
          <div class="d1">
              <el-card shadow="always" style="height:90px;background-color:rgb(235, 200, 113);">
                  <span class="ss1">销售利润</span>
                   <br>
                   <span class="ss1">{{this.SellIngprofit}}</span>
              </el-card>
          </div>
          <div class="d1">
              <el-card shadow="always" style="height:90px;background-color:rgb(202, 167, 91);">
                  <span class="ss1">收款笔数</span>
                   <br>
                  <span class="ss1">{{this.ReceiPtsum}}</span>
              </el-card>
          </div>
    </div>
    <div class="div2">
          <el-card shadow="always" style="height:500px">
              <div id="myChart" :style="{ height: '500px'}"></div>
          </el-card>
    </div>
    <div class="div3">
            <el-card shadow="always" style="height:500px">
              <div id="myChart2" style="width:100%;height:450px;float:left;"></div>
            </el-card>
    </div>
    <div class="div4">
              <el-card shadow="always" style="height:150px">
              </el-card>
    </div>
  </div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/bar');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    export default {
        name: "DataCount",
        data(){
            return{
                TotalSum:0,   //总额
                SellSum:0,    //销售笔数
                SellIngprofit:0, //销售利润
                ReceiPtsum:0,  //收款笔数
                msg: 'Welcome to Your Vue.js App',
                 myChart: '',
                opinionData2: [
                    { value: 10, name: '箱包', itemStyle: 'red' },
                    { value: 50, name: '日用百货', itemStyle: '#1FC48D' },
                    { value: 30, name: '服装', itemStyle: '#6DC8EC' },
                    { value: 10, name: '食品', itemStyle: '#3F8FFF' }
                ]
            }
        },
        mounted(){
            this.drawLine();
			 this.drawLine2()
                this.GetTotalSum();  //总金额
                this.GetReceiPtsum();  //收款笔数
                this.GetSellIngprofit();  //收款笔数
        },
        methods:{
            //获取已审核销售单的总价格
            GetTotalSum(){
                this.axios.get("http://localhost:50774/api/GetSsSjMoney").then((res)=>{
                        res.data.forEach(element => {
                           
                            this.TotalSum=this.TotalSum+ Number(element.ssSjMoney);
                            this.SellSum++;
                        });
                })
            },
            //获取收款单的单数
            GetReceiPtsum(){
                 this.axios.get("http://localhost:50774/api/receiptPayments").then((res)=>{
                        res.data.forEach(element => {
                        
                            this.ReceiPtsum++;
                        });
                })
            },
            //获取销售利润
            GetSellIngprofit(){
                this.axios.get("http://localhost:50774/api/SalesSingleShow").then((res)=>{
                        res.data.forEach(element => {
                          
                           this.SellIngprofit=this.SellIngprofit+Number(element.maoLi)
                        });
                })
            },
            //折线图
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'));
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '近7天销售额走势（单位：元）',
						   x: 'left' , 	
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1','2','3','4','5','6','7']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    series: [
                        {
                            type:'line',
                            data:[5, 8, 15, 13, 12, 13, 10],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                    ]
                });
            },
            drawLine2 () {
      this.myChart = this.$echarts.init(document.getElementById('myChart2'))
      this.myChart.setOption({
        title: {
          text: '各品类销售额占比', // 主标题
          subtext: '', // 副标题
          x: 'left' // x轴方向对齐方式
        },
        grid: { containLabel: true },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },
        // color: ['#1FC48D', '#F5A60A', '#6DC8EC', '#3F8FFF'],
        color: ['red', '#1FC48D', '#6DC8EC', '#3F8FFF'],
        // backgroundColor: '#ffffff',
        legend: {
          orient: 'vertical',
          icon: 'circle',
          align: 'left',
          x: 'right',
          y: 'bottom',
          data: ['箱包', '日用百货', '服装', '食品']
        },
        series: [
          {
            name: '课堂行为',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            center: ['40%', '50%'],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              color: function (params) {
                // 自定义颜色
                var colorList = ['red', '#1FC48D', '#6DC8EC', '#3F8FFF']
                return colorList[params.dataIndex]
              }
            },
            data: this.opinionData2
          }
        ]
      })
    }

        }
    }
</script>

<style scoped>
.pie-wrap {
  width: 100%;
  height: 126px;
}
.div1 {
  width: 100%;
  height: 100px;
  background-size: cover;
}
.div2 {
  width: 59%;
  height: 500px;
  background-size: cover;
  float: left;
  margin-top: 10px;
  margin-right: 10px;
}
.div3 {
  width: 40%;
  height: 500px;
  background-size: cover;
  float: left;
  margin-top: 10px;
  margin-bottom:10px;
}
.div4 {
  width: 100%;
  height: 150px;
  background-size: cover;
  clear: both;
}
.d1{
  height: 90px;
  width: 24%;
  margin-left: 13px;
  float: left;
}
.ss1{
    color: white;
    font-size: 25px;
}

</style>
