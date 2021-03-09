<template>
    <div>
        <div>
            <table style="marginLeft:1%;margintop:20%">
              <tr>
                <td>
                  <el-row>
                <Mdianadd></Mdianadd>
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
            <table style="marginLeft:360px;margintop:%">
                <tr>
                  <td>
                      <el-form-item label="创建日期" prop="name">
                     <el-date-picker
                        v-model="vlaue"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    </el-form-item>
                  </td>
                    <td>
                      <el-input
                      style="marginLeft:10px"
                      placeholder="请输入关键字搜索"
                      prefix-icon="el-icon-search"
                      v-model="mdname">
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
      prop="aswid"
      label="客户编号"
      width="10">
    </el-table-column>
    <el-table-column
      prop="aswdate"
      label="创建日期"
      width="180">
    </el-table-column>
     <el-table-column
       prop="aswnumber"
      label="门店编号"
      width="80">
    </el-table-column>
     <el-table-column
      prop="aswname"
      label="门店名称"
      width="120">
    </el-table-column>
     <el-table-column
      prop="aswlinkman"
      label="联系人"
      width="80">
    </el-table-column>
     <el-table-column
      prop="aswphone"
      label="手机号码"
      width="130">
    </el-table-column>
    <el-table-column
      prop="aswemail"
      label="邮箱"
      width="200">
    </el-table-column>
    <el-table-column
      prop="aswqq"
      label="QQ"
      width="150">
    </el-table-column>
     <el-table-column
      prop="aswstate"
      label="状态"
      width="80">
      <template scope="scope">
                <span v-if="scope.row.aswstate==0" style="color:black;">禁用</span>
                <span v-if="scope.row.aswstate==1" style="color:green;">启用</span>
            </template>
    </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <Mdianmodify v-bind:id="scope.row.aswid"></Mdianmodify>
        <el-button @click="del(scope.row.aswid)" type="text" size="small">删除</el-button>        
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import Mdianadd from "@/components/MrYang/Mendian/Mdianadd";
import Mdianmodify from "@/components/MrYang/Mendian/Mdianmodify";
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
        mdname:'',
        vlaue:''
      }
    },
    watch:{
       value1(){
      delay(()=>{
        this.fetchData();
      },300);
    },
     mdname(){
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
              this.$http.post('http://localhost:50774/api/AddShopWareDelt?id='+id)
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
        this.axios.get('http://localhost:50774/api/AddShopWareShow',{
        params: {
            stratime:this.vlaue[0],
            endtime:this.vlaue[1],
            mdname:this.mdname,
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
        this.axios.get('http://localhost:50774/api/AddShopWareShow')
          .then(response=>{
            this.tableData=response.data;
            console.log('ok')
          })      
          .catch(function(error){
            console.log(error);
          })
    },
    components: {
    'Mdianadd': Mdianadd,
    'Mdianmodify':Mdianmodify
  },
  }
</script>