<template>
<div>
<el-button type="text" size="small" @click="dd()">编辑</el-button>
<el-dialog title="修改等级" :modal="false" :visible.sync="dialogFormVisible">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <table style="marginLeft:5%">
    <tr>
      
      <td>
        <el-form-item  label="等级名称"
        prop="cgradeName"
        :rules="[
      { required: true, message: '请输入等级名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]"
        >
        <el-input v-model="ruleForm.cgradeName" placeholder="请输入名称"></el-input>
        </el-form-item>
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
          cgradeName:'',
          cgradeDiscount:''
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
      async dd(ss)
    {
        this.dialogFormVisible =true,
        await this.axios.get(this.$api+"/api/ClientGradeByid?id="+this.di).then((res)=>{
            this.ruleForm.cgradeName=res.data.cgradeName,
            this.ruleForm.cgradeDiscount=res.data.cgradeDiscount
        })
    },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.axios.post(this.$api+"/api/ClientGradeUpt",{
                cgradeId:this.di,
                cgradeName:this.ruleForm.cgradeName,
                cgradeDiscount:Number(this.ruleForm.cgradeDiscount)
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