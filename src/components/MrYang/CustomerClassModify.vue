<template>
<div>
<el-button type="text" size="small" @click="upt()">编辑</el-button>
    <el-dialog title="修改分类"  :modal="false" :visible.sync="dialogFormVisible">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <table style="marginLeft:5%">
    <tr>
      <td><span>分类名称</span></td>
      <td>
        <el-input v-model="ruleForm.ccsname" placeholder="请输入名称"></el-input>
      </td>
    </tr>
  </table>
   </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
  </div>
        </el-dialog>
</div>
 
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        reload: this.reload,
        dialogTableVisible: false,
        dialogFormVisible: false,
        di:this.id,
       ruleForm:{
          ccsname:''
        }
      };
    },
    props:{
        id:{
            type:Number,
            Request:true
        }
    },
    methods: {
    async upt(ss)
    {
        this.dialogFormVisible =true,
        await this.axios.get("http://localhost:50774/api/ClientClassifySuppid?id="+this.di).then((res)=>{
            this.ruleForm.ccsname=res.data.ccsname
        })
    },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.axios.post("http://localhost:50774/api/ClientClassifySuppUpt",{
                ccsname:this.ruleForm.ccsname,
                ccsid:this.di,
            })
            this.$message({
                    message: '修改成功',
                   type: 'success',
                })
           this.dialogVisible =false,
            location.reload()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      
    }
  };
</script>