//收款单
<template>
  <div>
     <div>
        <table>
            <tr>
              <td>新增</td>
               <td>批量删除</td>
                <td>导入</td>
                 <td>导出</td>
            </tr>
            <tr>
              <td>供应商</td>
              <td>供应商查询框</td>
              <td>付款日期</td>
              <td>日期选择框</td>
            </tr>
        </table>
     </div>
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
  </div>
  
</template>
<script>
export default {
    data() {
      return {        
        isCollapse: true, 
        items:[],
        TT:[]
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
      },
      handleClick(row)
      {
         this.TT=row;
      }
    },
    mounted () {
    this.axios.get('http://localhost:50774/api/payment')
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