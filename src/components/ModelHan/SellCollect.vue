
<template>
    <div>
        <el-row>
            <el-button type="primary">导出</el-button>
        </el-row>
        <br>
            &nbsp;&nbsp;<span>业务日期</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <el-date-picker
      v-model="value"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"   
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input class="sty"
                placeholder="请输入内容"
                v-model="state">
                <template #prefix>
                <i class="el-input__icon el-icon-search"></i>
                </template>
            </el-input>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <el-button type="primary">查询</el-button>
              <el-button type="primary"  @click="$router.push('/LeiBie')" >类别</el-button>&nbsp;&nbsp;&nbsp;
              <el-button type="primary">商品</el-button>&nbsp;&nbsp;&nbsp;
              <el-button type="primary">客户</el-button>&nbsp;&nbsp;&nbsp;
              <el-button type="primary">利润</el-button>&nbsp;&nbsp;&nbsp;
             <el-button @click="resetForm('ruleForm')">重置</el-button>
        <div class="sys">
        <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>销售数量合计:</span>
            <label>{{sscNumber}}</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>销售金额合计:</span>
            <label>{{sscSubtotal}}</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>销售毛利合计:</span>
            <label>{{maoLi}}</label>
        </div>
        <br>
        <el-table
            :data="items"
            border
            style="width: 100%"
            show-summary
            :summary-method="getTotal"
            row-class-name="tableRowClassName">
            <el-table-column
            prop="ssZdDate" 
            label="制单时间">  
            </el-table-column>
            <el-table-column
            prop="ssNumber"
            label="单据编号"
            width="180">
            </el-table-column>
            <el-table-column
            prop="ssClient"
            label="客户名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="aswName"
            label="门店"
            width="180">
            </el-table-column>
            <el-table-column
            prop="ssWarehouse"
            label="仓库">
            </el-table-column>
            <el-table-column
            prop="ssMode"
            label="结算方式">
            </el-table-column>
            <el-table-column
            prop="cargoCoding"
            label="商品编码">
            </el-table-column>
            <el-table-column
            prop="cargoName"
            label="商品名称">
            </el-table-column>
            <el-table-column
            prop="unitName"
            label="单位">
            </el-table-column>
            <el-table-column
            prop="sscNumber"
            label="数量">
            </el-table-column>
            <el-table-column
            prop="cpPrice"
            label="单价(元)">
            </el-table-column>
            <el-table-column
            prop="sscSubtotal"
            label="销售金额(元)">
            </el-table-column>
            <el-table-column
            prop="maoLi"
            label="销售毛利(元)">
            </el-table-column>
            <el-table-column
            prop="ssHandle"
            label="经办人">
            </el-table-column>
            <el-table-column
            prop="sscRemark"
            label="备注">
            </el-table-column>
        </el-table>
        <div class="block">      
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"       
      :total="10">
    </el-pagination>
  </div>
    </div>     
      
</template>
<style scoped>
.sty{
width: 200px;
};
</style>
<script>
// 节流函数
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
  export default {
    data() {
      return {
        input2: '',  //查询输入框
        value:'',
        state:'',
        isCollapse: true, 
        items:[],
        currentPage1: 1,       //分页
        currentPage2: 2,
        currentPage3: 3,
        currentPage4: 4,
        sscNumber:'',
        sscSubtotal:'',
        maoLi:''
      };
    },
    watch: {
  //watch title change
    state(){
      delay(()=>{        
        this.fetchData();
      
      },300)
    },
    value(){
      delay(()=>{        
        this.fetchData();
      
      },300)
    }
    },
     methods: { 
        async fetchData(val) {

      const res = await  this.axios.get('http://localhost:50774/api/SalesSingleShow',{
        params: {
        clientName: this.state,
        start: this.value[0],
        end: this.value[1],
        
      },
      })
        .then(response => {
        this.items = response.data
        
      }) 
        
      },
        getTotal(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
          if (index === 0) {
          sums[index] = '合计';
          return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (column.property === 'sscNumber' || column.property === 'sscSubtotal' || column.property === 'maoLi') {
          sums[index] = values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
          return prev + curr;
          } else {
          return prev;
          }
          }, 0);
          sums[index];
          } else {
          sums[index] = '--';
          }
          });
          this.sscNumber=sums[9];
          this.sscSubtotal=sums[11];
          this.maoLi=sums[12];
          return sums;
          }
      },
      
    mounted () {
    this.axios.get('http://localhost:50774/api/SalesSingleShow')
      .then(response => {
        this.items = response.data
        console.log('ok')
      })
      .catch(function (error) {
        console.log(error)
    })
  }
}
</script>

