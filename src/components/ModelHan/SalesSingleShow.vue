
<template>
    <div>
        <el-row>
            <el-button type="primary">导出</el-button>
        </el-row>
        <br>
            &nbsp;&nbsp;<span>业务日期</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input class="sty"
                placeholder="请输入内容"
                v-model="input4">
                <template #prefix>
                <i class="el-input__icon el-icon-search"></i>
                </template>
            </el-input>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <el-button type="primary">查询</el-button>
             <el-button @click="resetForm('ruleForm')">重置</el-button>
        <div class="sys">
        <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>销售数量合计:</span>
            <label>{{sellsum}}</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>销售金额合计:</span>
            <label>{{sellmoney}}</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>销售毛利合计:</span>
            <label>{{sellmaoli}}</label>
        </div>
        <br>
        <el-table
            :data="items"
            border
            style="width: 100%">
            <el-table-column
            prop="SsZdDate"
            label="制单时间"
            width="180">
            </el-table-column>
            <el-table-column
            prop="SsNumber"
            label="单据编号"
            width="180">
            </el-table-column>
            <el-table-column
            prop="SsClient"
            label="客户名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="AswName"
            label="门店"
            width="180">
            </el-table-column>
            <el-table-column
            prop="SsWarehouse"
            label="仓库">
            </el-table-column>
            <el-table-column
            prop="SsMode"
            label="结算方式">
            </el-table-column>
            <el-table-column
            prop="CargoCoding"
            label="商品编码">
            </el-table-column>
            <el-table-column
            prop="CargoName"
            label="商品名称">
            </el-table-column>
            <el-table-column
            prop="UnitName"
            label="单位">
            </el-table-column>
        </el-table>
    </div>       
</template>
<style scoped>
.sty{
width: 200px;
};
</style>
<script>
  export default {
    data() {
      return {
        input4: '',  //查询输入框
        shortcuts: [{
          text: '最近一周',
          value: (() => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          })(),
        }, {
          text: '最近一个月',
          value: (() => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          })(),
        }, {
          text: '最近三个月',
          value: (() => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          })(),
        }],
        value1: '',
        value2: '',
        isCollapse: true, 
        items:[]
      };
      
    },
    mounted () {
    this.axios.get('http://localhost:50774/api/SalesSingleDisplay')
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

