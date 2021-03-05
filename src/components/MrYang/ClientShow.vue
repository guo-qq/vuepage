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
      prop="clientSid"
      label="客户编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="clientSnumber"
      label="客户编号"
      width="150">
    </el-table-column>
     <el-table-column
       prop="clientSname"
      label="客户名称"
      width="150">
    </el-table-column>
     <el-table-column
      prop="cgradeName"
      label="商品等级"
      width="150">
    </el-table-column>
     <el-table-column
      prop="lclientName"
      label="标签"
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
  export default {
    name:"ClientShow",
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
        this.axios.get('http://localhost:50774/api/ClientSupplierShowkh')
          .then(response=>{
            this.tableData=response.data;
            console.log('ok')
          })      
          .catch(function(error){
            console.log(error);
          })
            //客户级别
        this.axios.get('http://localhost:50774/api/ClientGradeSelect')
        .then(response=>{
          this.opn=response.data;
            console.log('ok')
        })
    }
  }
</script>