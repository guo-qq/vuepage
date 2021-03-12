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
              <div id="main" style="width:900px ;height:300px;"></div>
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
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted(){
            this.drawLine();
			 this.$nextTick(function() {
				this.getPie()
			 });
                this.GetTotalSum();  //总金额
                this.GetReceiPtsum();  //收款笔数
                this.GetSellIngprofit();  //收款笔数
        },
        methods:{
            //获取已审核销售单的总价格
            GetTotalSum(){
                this.axios.get("http://localhost:50774/api/GetSsSjMoney").then((res)=>{
                        res.data.forEach(element => {
                            console.log(element);
                            this.TotalSum=this.TotalSum+ Number(element.ssSjMoney);
                            this.SellSum++;
                        });
                })
            },
            //获取收款单的单数
            GetReceiPtsum(){
                 this.axios.get("http://localhost:50774/api/receiptPayments").then((res)=>{
                        res.data.forEach(element => {
                            console.log(element);
                            this.ReceiPtsum++;
                        });
                })
            },
            //获取销售利润
            GetSellIngprofit(){
                this.axios.get("http://localhost:50774/api/SalesSingleShow").then((res)=>{
                        res.data.forEach(element => {
                            console.log(element);
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
                    legend: {
                        data:['最高','最低']
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
                        data: ['2019-02-25','2019-03-04','2019-03-18','2019-03-26','2019-04-16','2019-04-26','2019-05-04']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    series: [
                        {
                            name:'最高',
                            type:'line',
                            data:[11, 11, 15, 13, 12, 13, 10],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'最低',
                            type:'line',
                            data:[1, -2, 2, 5, 3, 2, 0],
                            markPoint: {
                                data: [
                                    {name: '周最低', value: 2, xAxis: 1, yAxis: 1.5}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    [{
                                        symbol: 'none',
                                        x: '90%',
                                        yAxis: 'max'
                                    }, {
                                        symbol: 'circle',
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '最大值'
                                            }
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }]
                                ]
                            }
                        }
                    ]
                });
            },
            //饼图
			getPie() {
				// 绘制图表
				var myChart = echarts.init(document.getElementById('main'))
				// 指定图表的配置项和数据
				var option = {
				//标题
				title: {
					text: '各品类销售额占比',
					x: 'left' ,              //标题位置
					// textStyle: { //标题内容的样式
					//   color: '#000',
					//   fontStyle: 'normal',
					//   fontWeight: 100,
					//   fontSize: 16 //主题文字字体大小，默认为18px
					// },
				},
				// stillShowZeroSum: true,
				//鼠标划过时饼状图上显示的数据
				tooltip: {
					trigger: 'item',
					formatter: '{a}<br/>{b}:{c} ({d}%)'
				},
				//图例
				legend: {//图例  标注各种颜色代表的模块
					// orient: 'vertical',//图例的显示方式  默认横向显示
					bottom: 0,//控制图例出现的距离  默认左上角
					left: 'center',//控制图例的位置
					 // 水平安放位置，默认为左侧，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
					//x: 'center',
					// 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
					//y: 'bottom',
					// itemWidth: 16,//图例颜色块的宽度和高度
					// itemHeight: 12,
					textStyle: {//图例中文字的样式
					color: '#000',
					fontSize: 16
					},
					data: ['未领取', '处理中', '已完成']//图例上显示的饼图各模块上的名字
				},
				//饼图中各模块的颜色
				color: ['#32dadd', '#b6a2de', '#5ab1ef'],
				// 饼图数据
				series: {
					// name: 'bug分布',
					type: 'pie',             //echarts图的类型   pie代表饼图
					radius: '70%',           //饼图中饼状部分的大小所占整个父元素的百分比
					center: ['50%', '50%'],  //整个饼图在整个父元素中的位置
					// data:''               //饼图数据
					data: [                  //每个模块的名字和值
					{ name: '未领取', value: 10 },
					{ name: '处理中', value: 30},
					{ name: '已完成', value: 50 }
					],
					itemStyle: {
					normal: {
						label: {
						show: true,//饼图上是否出现标注文字 标注各模块代表什么  默认是true
						// position: 'inner',//控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
						},
						labelLine: {
						show: true//官网demo里外部标注上的小细线的显示隐藏    默认显示
						}
					}
					},
				}

				}
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option)
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
