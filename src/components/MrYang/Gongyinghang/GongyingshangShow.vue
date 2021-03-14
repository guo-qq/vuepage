<template>
    <div>
        <div>
            <table style="marginLeft:1%;margintop:20%">
              <tr>
                <td>
                  <el-row>
                <router-link to="/zsupplieradd"><el-button style="marginLeft:1%;margintop:20%" type="primary">添加</el-button></router-link>
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
            <table style="marginLeft:500px;margintop:%">
                <tr>
                  <td>
                    供应商分类
                  </td>
                    <td>
                        <el-select v-model="flid" style="marginLeft:5px" placeholder="请选择">
                        <el-option
                          v-for="item in opn"
                          :key="item.value"
                          :label="item.ccsname"
                          :value="item.ccsid">
                        </el-option>
                        </el-select>
                    </td>
                    <td>
                      <el-input
                      style="marginLeft:10px"
                      placeholder="请输入关键字搜索"
                      prefix-icon="el-icon-search"
                      v-model="gname">
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
      prop="clientSid"
      label="客户编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="clientSnumber"
      label="供应商编号"
      width="150">
    </el-table-column>
     <el-table-column
       prop="clientSname"
      label="供应商名称"
      width="150">
    </el-table-column>
     <el-table-column
      prop="ccsname"
      label="供应商分类"
      width="150">
    </el-table-column>
     <el-table-column
      prop="clientSaddress"
      label="地区"
      width="150">
    </el-table-column>
     <el-table-column
      prop="clientSlinkman"
      label="联系人"
      width="150">
    </el-table-column>
     <el-table-column
      prop="clientSphone"
      label="手机号码"
      width="150">
    </el-table-column>
     <el-table-column
      prop="clientSstate"
      label="状态"
      width="120">
      <template scope="scope">
                <span v-if="scope.row.clientSstate==0" style="color:black;">禁用</span>
                <span v-if="scope.row.clientSstate==1" style="color:green;">启用</span>
            </template>
    </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="upt(scope.row.clientSid)" type="text" size="small">编辑</el-button> 
        <el-button @click="del(scope.row.clientSid)" type="text" size="small">删除</el-button>        
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
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
        flid:'',
        gname:''
      }
    },
    watch:{
       flid(){
      delay(()=>{
        this.fetchData();
      },300);
    },
     gname(){
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
              this.$http.post(this.$api+'/api/ClientSupplierDelt?id='+id)
              aler("删除成功")
              location.reload()
              .catch(res=>{
                console.log("err");
              })
            })
        },
        upt(id){
            this.$router.push('/zsuppliermodify?id='+id);
        },
         fetchData(val) {
        this.axios.get(this.$api+'/api/ClientSupplierShowde',{
        params: {
        flid:Number(this.flid),
        gname:gname,
        lxrname:gname
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
        this.axios.get(this.$api+'/api/ClientSupplierShowde')
          .then(response=>{
            this.tableData=response.data;
            console.log('ok')
          })      
          .catch(function(error){
            console.log(error);
          })
            //供应商分类
        this.axios.get(this.$api+'/api/ClientClassifySelect')
        .then(response=>{
          this.opn=response.data;
            console.log('ok')
        })
    }
  }
</script>