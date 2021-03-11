<template>
    <div>
        <div>
            <table style="marginLeft:1%;margintop:20%">
              <tr>
                <td>
                  <el-row>
                <Accountadd></Accountadd>
            </el-row>
                </td>
              </tr>
            </table>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <table style="marginLeft:830px">
                <tr>
                    <td>
                      <el-input
                      style="marginLeft:10px"
                      placeholder="请输入关键字搜索"
                      prefix-icon="el-icon-search"
                      v-model="zhname">
                      </el-input>
                    </td>
                    <td>
                      <el-button style="marginLeft:15px" @click="resetForm('ruleForm')">重置</el-button>
                    </td>
                </tr>
            </table>
            </el-form>
        </div>
    <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column 
      v-if="fales"
      prop="accountId"
      label="仓库编号"
      width="10">
    </el-table-column>
     <el-table-column
       prop="accountDate"
      label="创建日期"
      width="250">
    </el-table-column>
     <el-table-column
      prop="accountNumber"
      label="账户编号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="accountName"
      label="账户名称"
      width="200">
    </el-table-column>
     <el-table-column
      prop="accountType"
      label="账户类型"
      width="200">
      <template scope="scope">
                <span v-if="scope.row.accountType==0" style="">现金</span>
                <span v-if="scope.row.accountType==1" style="">支付宝</span>
                <span v-if="scope.row.accountType==2" style="">微信</span>
                <span v-if="scope.row.accountType==3" style="">银行账户</span>
            </template>
    </el-table-column>
     <el-table-column
      prop="accountBalance"
      label="初期余额"
      width="200">
    </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="150">
      <template slot-scope="scope">
        <Accountmodify v-bind:id="scope.row.accountId"></Accountmodify>
        <el-button @click="del(scope.row.accountId)" type="text" size="small">删除</el-button>        
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import Accountadd from "@/components/MrYang/Account/Accountadd";
import Accountmodify from "@/components/MrYang/Account/Accountmodify";
// 节流函数
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback,ms);
  };
})();
  export default {
    name:"GongyingshangShow",
    data() {
      return {
        opn:[],
        isCollapse: true,
        tableData: [],
        zhname:'',
        bh:'',
      }
    },
    watch:{
       zhname(){
      delay(()=>{
        this.fetchData();
      },300);
    },
    bh(){
      delay(()=>{
        this.fetchData();
      },300);
    }
    },
    methods: {
        del(id){
            this.$confirm('确认删除此数据吗？','提示',{
              confirmButtonText:'确定',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              this.$http.post('http://localhost:50774/api/LableCDelt?id='+id)
              aler("删除成功")
              location.reload()
              .catch(res=>{
                console.log("err");
              })
            })
        },
        upt(id){
            this.$route.push('/Accountmodify?id='+id);
        },
         fetchData(val) {
        this.axios.get('http://localhost:50774/api/AccountShow',{
        params: {
            bh:this.bh,
            zhname:this.zhname,
      },
      })
        .then(response => {
        this.tableData = response.data
      })       
      }
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    created(){
        //显示       
        this.axios.get('http://localhost:50774/api/AccountShow')
          .then(response=>{
            this.tableData=response.data;
            console.log('ok')
          })      
          .catch(function(error){
            console.log(error);
          })
    },
    components: {
    'Accountadd': Accountadd,
    'Accountmodify': Accountmodify,
  },
  }
</script>