<template>
    <div>
      <div>
            <table style="marginLeft:1%;margintop:20%">
              <tr>
                <td>
                  <el-row>
                <router-link to="/zclientadd"><el-button style="marginLeft:1%;margintop:20%" type="primary">添加</el-button></router-link>
            </el-row>
                </td>
                <td>
                  <el-row>
              <el-button style="marginLeft:1%;margintop:20%">批量操作</el-button>
            </el-row>
                </td>
              </tr>
            </table>
            <table style="marginLeft:570px;margintop:%">
                <tr>
                  <td>
                    客户等级
                  </td>
                    <td>
                        <el-select v-model="valuee" style="marginLeft:5px" placeholder="请选择">
                        <el-option
                          v-for="item in opn"
                          :key="item.value"
                          :label="item.cgradeName"
                          :value="item.cgradeId">
                        </el-option>
                        </el-select>
                    </td>
                    <td>
                      <el-input
                      style="marginLeft:10px"
                      placeholder="请输入关键字搜索"
                      prefix-icon="el-icon-search"
                      v-model="input2">
                      </el-input>
                    </td>
                    <td>
                      <el-button style="marginLeft:15px" @click="resetForm('ruleForm')">重置</el-button>
                    </td>
                </tr>
            </table>
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
      prop="ccsid"
      label="id"
      width="150">
    </el-table-column>
    <el-table-column 
      type="yyyy-dd-mm-ss"
      prop="ccsdate"
      label="创建时间"
      width="180">
    </el-table-column>
     <el-table-column
       prop="ccsname"
      label="分类名称"
      width="180">
    </el-table-column>
     <el-table-column
      prop="ccsstate"
      label="状态"
      width="600">
      <template scope="scope">
                <span v-if="scope.row.ccsstate==0" style="color:black;">禁用</span>
                <span v-if="scope.row.ccsstate==1" style="color:green;">启用</span>
            </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="upt(scope.row.ccsid)" type="text"  size="small">编辑</el-button>
        <span v-if="scope.row.ccsstate==0"><el-button @click="ztai(scope.row.ccsid)"  type="text"  size="small">启用</el-button></span>
        <span v-if="scope.row.ccsstate==1"><el-button @click="ztai(scope.row.ccsid)"  type="text"  size="small">禁用</el-button></span>
        <el-button @click="del(scope.row.ccsid)" type="text"  size="small">删除</el-button>     
      </template>
    </el-table-column>
    </el-table>
    </div>
</template>
<script>
  export default {
    name:"CustomerClassShow",
    data() {
      return {
        opn:[],
        isCollapse: true,
        tableData: [],
        valuee:''
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
            this.$router.push('/zclientmodify?id='+id);
        }

    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    created(){
        //显示       
        this.axios.get('http://localhost:50774/api/ClientClassifySuppShow')
          .then(response=>{
            this.tableData=response.data;
            console.log('ok')
          })      
          .catch(function(error){
            console.log(error);
          })
    }
  }
</script>