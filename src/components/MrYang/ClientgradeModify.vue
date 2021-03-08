<template>
<div>
<el-button type="text" @click="dialogVisible = true">编辑</el-button>
<el-dialog
  title="新增等级"
  :visible.sync="dialogVisible"
  :close-on-click-modal='true'
  width="35%"
  :before-close="handleClose">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <table style="marginLeft:5%">
    <tr>
      <td><span>等级名称</span></td>
      <td>
        <el-input v-model="ruleForm.cgradeName" placeholder="请输入名称"></el-input>
      </td>
    </tr>
    <tr>
        <td><span>折扣率%</span></td>
      <td>
        <el-input v-model="ruleForm.cgradeDiscount" placeholder="请输入内容"></el-input>
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
          cgradeName:'',
          cgradeDiscount:''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.axios.post("http://localhost:50774/api/ClientGradeAdd",{
                cgradeName:this.ruleForm.cgradeName,
                cgradeDiscount:Number(this.ruleForm.cgradeDiscount)
            })
            this.$message({
                    message: '添加成功',
                   type: 'success',
                })
            this.reload()
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