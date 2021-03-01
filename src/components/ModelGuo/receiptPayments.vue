// 付款单
<template>

  <el-table
    :data="items"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    
    <el-table-column
      prop="rcreateTime"
      label="日期"
      width="180">
    </el-table-column>
     <el-table-column
      prop="danJ"
      label="单据编号"
      width="180">
    </el-table-column>
     <el-table-column
      prop="rppayer"
      label="付款方"
      width="180">
    </el-table-column>
     <el-table-column
      prop="rcreateTime"
      label="结算方式"
      width="180">
    </el-table-column>
     <el-table-column
      prop="rptotalPayment"
      label="收款金额"
      width="180">
    </el-table-column>s
     <el-table-column
      prop="rptotalDiscount"
      label="优惠金额"
      width="180">
    </el-table-column>
     <el-table-column
      prop="rptotalMoney"
      label="实收金额"
      width="180">
    </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>      
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
    data() {
      return {        
        isCollapse: true, 
        items:[]
      };
    }, 
     methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
    mounted () {
    this.axios.get('http://localhost:50774/api/receiptPayments')
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

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>