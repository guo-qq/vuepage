<template>
  <div>
    <div>
      <table style="marginleft: 1%; margintop: 20%">
        <tr>
          <td>
            <el-row>
                <router-link to="/zcomkuadd"><el-button style="marginLeft:1%;margintop:20%" type="primary">添加</el-button></router-link>
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
      <table style="marginLeft:120px;margintop:%">
        <tr>
          <td>
            商品分类
          </td>
          <td>
              <el-cascader :options="option" v-model="value" clearable></el-cascader>
          </td>
          <td>创建时间</td>
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
            <el-button style="marginleft: 15px" @click="resetForm('ruleForm')"
              >重置</el-button
            >
          </td>
        </tr>
      </table>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column v-if="fales" prop="cgradeId" label="id" width="150">
      </el-table-column>
      <el-table-column
        type="yyyy-dd-mm-ss"
        prop="cargoDate"
        label="创建时间"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="cargoCoding" label="单据编号" width="120">
      </el-table-column>
      <el-table-column prop="cargoName" label="商品名称" width="120">
      </el-table-column>
      <el-table-column prop="className" label="商品分类" width="120">
      </el-table-column>
      <el-table-column prop="propertyName" label="属性规格" width="100">
      </el-table-column>
      <el-table-column prop="unitName" label="库存单位" width="120">
      </el-table-column>
      <el-table-column prop="cpprice" label="销售单价" width="120">
      </el-table-column>
      <el-table-column prop="cargoState" label="状态" width="120">
         <template scope="scope">
                <span v-if="scope.row.cargoState==0" style="color:black;">下架</span>
                <span v-if="scope.row.cargoState==1" style="color:green;">上架</span>
            </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <ClientgradeModify v-bind:id="scope.row.cgradeId"></ClientgradeModify>
          <el-button @click="del(scope.row.cgradeId)" type="text" size="small"
            >删除</el-button
          >
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
  data() {
    return {
      option: [],
      isCollapse: true,
      tableData: [],
      value1: "",
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
    del(id) {
      this.$confirm("确认删除此数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("http://localhost:50774/api/ClientGradeDlet?id="+id);
        aler("删除成功");
        this.$router.go(0)
      });
    },
    upt(id) {
      this.$router.push("/zclientmodify?id=" + id);
    },
    fetchData(val) {
        this.axios.get('http://localhost:50774/api/ClientGradeShow',{
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
  resetForm(formName) {
    this.$refs[formName].resetFields();
  },
  created() {
    const _this = this
    //显示
    this.axios
      .get(this.$api+"/api/ShopShow")
      .then((response) => {
        this.tableData = response.data;
        console.log("ok");
      })
      .catch(function (error) {
        console.log(error);
      });
  },

};
</script>