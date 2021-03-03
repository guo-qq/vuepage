//收款单
<template>
  <div>
     <div>
        <table>
            <tr>
              <td><el-button size="mini" type="primary">新增</el-button></td>                  
              <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button size="mini" plain>批量操作</el-button></td>
              <!-- <td><el-button size="mini" plain>导入</el-button></td>
              <td><el-button size="mini" plain>导出</el-button></td> -->
            </tr>
            <br>
            <tr>
              <td>供应商:</td>
              <td> 
                <el-autocomplete
               v-model.trim="state"
              :fetch-suggestions="querySearchAsync"
              
               placeholder="客户名称/编号"
               @select="handleSelect"
               ></el-autocomplete>
              </td>
               
              <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;付款日期:</td>
              <td>
              <div class="block">
  
    <el-date-picker
      v-model="value"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"   
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
  </div>

              </td>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;
              <td><el-input
    placeholder="请输入单据编号"
    prefix-icon="el-icon-search"
    v-model="input2">    
  </el-input></td>
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
        isCollapse: true, 
        items:[],
        restaurants: [],
        state: '',
        timeout:  null,
        input2:'',
        currentPage1: 1,       //分页
        currentPage2: 2,
        currentPage3: 3,
        currentPage4: 4,

         
        value:'',
         
      };
     }, 
     watch: {
  //watch title change
    state() {
      delay(() => {
        this.fetchData();
      }, 300);
    },
    input2(){
      delay(()=>{
        this.fetchData();
      },300);
    },
    value(){
      delay(()=>{        
        this.fetchData();
      
      },300)
    }
    },
  
     methods: {   
        loadAll() {
        return [
           this.axios.get('http://localhost:50774/api/ClientSupplier')
           .then(response => {
            
            this.restaurants=response.data;
            })
            .catch(function (error) {
            console.log(error)
                 })
        ]},
         handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
         handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        },
         querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
         clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
       createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
        handleSelect(item) {
        console.log(item);
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
       async fetchData(val) {
      
      const res = await  this.axios.get('http://localhost:50774/api/payment',{
        params: {
        FKF: this.state,
        value: this.value[0],
        value1: this.value[1],
        DJ:this.input2,
      },
      })
        .then(response => {
        this.items = response.data
        
      })       
      }
 
    },
     
    mounted () {
         this.loadAll();
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
