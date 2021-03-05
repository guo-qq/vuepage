<template>
  <div> 
    <!-- 表单查询 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="状态">
            <el-select v-model="formInline.region" placeholder="请选择">
            </el-select>
        </el-form-item>
        <el-form-item label="业务日期">
            <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item >
            <el-input v-model="formInline.user" prefix-icon="el-icon-search" placeholder="请输入关键词搜索"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button  @click="onSubmit" type="danger">重置</el-button>
            <router-link to="/Addpurchaseretun"><el-button type="primary" plain>新增</el-button></router-link>
        </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table
        :data="items"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        v-if="fales"
        prop="ssId"
        label="主键ID"
        width="100">
        </el-table-column>
        <el-table-column
        prop="ssZdDate"
        label="提交时间"
        width="200">
        </el-table-column>
        <el-table-column
        prop="ssNumber"
        label="单据编号"
        width="180">
        </el-table-column>
        <el-table-column
        prop="ssClient"
        label="客户名称"
        width="150">
        </el-table-column>
        <el-table-column
        prop="ssSjMoney"
        label="实收金额(元)"
        width="150">
        </el-table-column>
        <el-table-column
        prop="aswname"
        label="门店"
        width="150">
        </el-table-column>s
        <el-table-column
        prop="ssWarehouse"
        label="仓库"
        width="100">
        </el-table-column>
        <el-table-column
        prop="ssAudit"
        label="状态"
        width="100">
        <template scope="scope">
                <span v-if="scope.row.ssAudit==0" style="color:green;">未审核</span>
                <span v-if="scope.row.ssAudit==1" style="color:black;">已审核</span>
            </template>
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">审核</el-button>          
            <el-button @click="editData(scope.row.ssId)" type="text" size="small">详情</el-button>   
            <el-button @click="removeData(scope.row.ssId)" type="text" size="small">删除</el-button>      
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
        formInline:{    //表单
            user: '',
           region: ''
        },
        value1: ''     //时间
      };
    }, 
     methods: {
      onSubmit() {
        console.log('submit!');
      },
     removeData(id) {   //删除
        //提示框，判断用户是否操作失误
        this.$confirm("此操作将永久删除此数据, 是否继续?","警告", {
            confirmButtonText: "继续",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            this.$http
                .post("http://localhost:50774/api/DelSalesSingles?id="+id)
                .then(response => {
                    this.$message({
                    type:"warning",
                    message:"请求成功",
                    })
                })
                .catch(() => {
                this.$message({
                    type:"warning",
                    message:"请求失败，请检查网络设置"
                    })
                });
            })
            .catch(() => {
            this.$message({
                type: "info",
                message: "已取消删除"
                });
            });
        },
        editData(id){
            this.$router.push({path:'/details',query:{Id:id}});
        },


    },
    mounted () {    //表格显示
    this.axios.get('http://localhost:50774/api/PurchaseReturn')
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


