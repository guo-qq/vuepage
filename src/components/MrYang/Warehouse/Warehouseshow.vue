<template>
    <div>
        <div>
            <table style="marginLeft:1%;margintop:20%">
              <tr>
                <td>
                  <el-row>
                <Warehouseadd></Warehouseadd>
            </el-row>
                </td>
                <td>
                  <el-row>
              <el-button style="marginLeft:1%;margintop:20%">批量操作</el-button>
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
                      v-model="ckname">
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
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column 
      v-if="fales"
      prop="wid"
      label="仓库编号"
      width="10">
    </el-table-column>
     <el-table-column
       prop="wnumber"
      label="仓库编号"
      width="80">
    </el-table-column>
     <el-table-column
      prop="wname"
      label="仓库名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="aswname"
      label="所属门店"
      width="120">
    </el-table-column>
     <el-table-column
      prop="wlink"
      label="联系人"
      width="80">
    </el-table-column>
     <el-table-column
      prop="wiphone"
      label="手机号码"
      width="130">
    </el-table-column>
    <el-table-column
      prop="wemail"
      label="邮箱"
      width="200">
    </el-table-column>
    <el-table-column
      prop="wqq"
      label="QQ"
      width="150">
    </el-table-column>
     <el-table-column
      prop="wstate"
      label="状态"
      width="80">
      <template scope="scope">
                <span v-if="scope.row.wstate==0" style="color:black;">禁用</span>
                <span v-if="scope.row.wstate==1" style="color:green;">启用</span>
            </template>
    </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="upt(scope.row.wid)" type="text" size="small">编辑</el-button> 
        <el-button @click="del(scope.row.wid)" type="text" size="small">删除</el-button>        
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import Warehouseadd from "@/components/MrYang/Warehouse/Warehouseadd";
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
        ckname:'',
        phone:'',
        lxrname:''
      }
    },
    watch:{
       phone(){
      delay(()=>{
        this.fetchData();
      },300);
    },
    lxrname(){
      delay(()=>{
        this.fetchData();
      },300);
    },
     ckname(){
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
            this.$route.push('/zclientmodify?id='+id);
        },
         fetchData(val) {
        this.axios.get('http://localhost:50774/api/WarehouseShow',{
        params: {
            phone:this.ckname[0],
            lxrname:this.ckname[1],
            ckname:this.ckname,
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
        this.axios.get('http://localhost:50774/api/WarehouseShow')
          .then(response=>{
            this.tableData=response.data;
            console.log('ok')
          })      
          .catch(function(error){
            console.log(error);
          })
    },
    components: {
    'Warehouseadd': Warehouseadd,
  },
  }
</script>