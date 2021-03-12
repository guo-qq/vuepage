<template>
  <div>
    <div>
      <table style="marginleft: 1%; margintop: 20%">
        <tr>
          <td>
            <el-row>
              <Clationadd></Clationadd>
            </el-row>
          </td>
          <td>
            <el-row>
              <el-button style="marginleft: 1%; margintop: 20%"
                >批量操作</el-button
              >
            </el-row>
          </td>
        </tr>
      </table>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div style="marginLeft:400px;margintop:%">
          <table>
        <tr>
          <td>创建日期</td>
          <td>
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </td>
          <td>
            <el-input
              style="marginleft: 10px"
              placeholder="请输入关键字搜索"
              prefix-icon="el-icon-search"
              v-model="flname"
            >
            </el-input>
          </td>
          <td>
            <el-button style="marginleft: 15px" @click="resetForm('ruleForm')">重置</el-button>
          </td>
        </tr>
      </table>
      </div>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column v-if="fales" prop="ccsid" label="id" width="150">
      </el-table-column>
      <el-table-column
        type="yyyy-MM-dd-ss"
        prop="ccsdate"
        label="创建时间"
        width="200"
      >
      </el-table-column>
      <el-table-column prop="ccsname" label="分类名称" width="180">
      </el-table-column>
      <el-table-column prop="ccsstate" label="状态" width="600">
        <template scope="scope">
          <span v-if="scope.row.ccsstate == 0" style="color: black">禁用</span>
          <span v-if="scope.row.ccsstate == 1" style="color: green">启用</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <Clationmodify v-bind:id="scope.row.ccsid"></Clationmodify>
          <span v-if="scope.row.ccsstate == 0"
            ><el-button @click="ztai(scope.row.ccsid)" type="text" size="small"
              >启用</el-button
            ></span
          >
          <span v-if="scope.row.ccsstate == 1"
            ><el-button @click="zt(scope.row.ccsid)" type="text" size="small"
              >禁用</el-button
            ></span
          >
          <el-button @click="del(scope.row.ccsid)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Clationadd from "@/components/MrYang/Gongyinghang/Clationadd";
import Clationmodify from "@/components/MrYang/Gongyinghang/Clationmodify";
// 节流函数
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback,ms);
  };
})();
export default {
  data() {
    return {
      opn: [],
      isCollapse: true,
      tableData: [],
      value1:'',
      flname:''
    };
  },
   watch:{
     flname(){
      delay(()=>{
        this.fetchData();
      },300);
    },
    value1(){
      delay(()=>{
        this.fetchData();
      },300);
    },
    },
  methods: {
    ztai(id){
        this.axios.post("http://localhost:50774/api/ClientClassifyZtai?id="+id +"&ztai="+1)
        this.$message({
                  message: '启用成功',
                   type: 'success',
                })
                this.$router.go(0)
    },
    zt(id){
        this.axios.post("http://localhost:50774/api/ClientClassifyZtai?id="+id +"&ztai="+0)
        this.$message({
                  message: '禁用成功',
                   type: 'success',
                })
               this.$router.go(0)
    },
    del(id) {
      this.$confirm("确认删除此数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("http://localhost:50774/api/ClientClassifyDelt?id=" + id);
        aler("删除成功");
        location.reload()
      });
    },
    upt(id) {
      this.$router.push("/zclientmodify?id=" + id);
    },
    resetForm(formName) {
    this.$refs[formName].resetFields();
  },
    fetchData(val) {
        this.axios.get('http://localhost:50774/api/ClientClassifyShow',{
        params: {
        flname:this.flname,
        stratime:this.value1[0],
        endtime:this.value1[1],
      },
      })
        .then(response => {
        this.tableData = response.data
        
      })       
      }
  },
  created() {
    //显示
    this.axios
      .get("http://localhost:50774/api/ClientClassifyShow")
      .then((response) => {
        this.tableData = response.data;
        console.log("ok");
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  
  components: {
    'Clationadd': Clationadd,
    'Clationmodify':Clationmodify
  },
  
};
</script>