<template>
<div>
<el-button type="primary" @click="dialogVisible = true">新增分类</el-button>
<el-dialog
  title="新增分类"
  :visible.sync="dialogVisible"
  :close-on-click-modal='true'
  width="35%"
  :before-close="handleClose">
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
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
  </span>
</el-dialog>
</div>
 
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        reload: this.reload,
       ruleForm:{
          ccsname:''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.axios.post("http://localhost:50774/api/ClientifySuppAdd",{
                ccsname:this.ruleForm.ccsname,
            })
            this.$message({
                    message: '添加成功',
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