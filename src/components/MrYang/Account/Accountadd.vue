<template>
<div>
<el-button type="primary" @click="dialogVisible = true">新增账户</el-button>
<el-dialog
  title="新增账户"
  :visible.sync="dialogVisible"
  :close-on-click-modal='true'
  width="55%"
  :before-close="handleClose">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <table style="marginLeft:5%">
    <tr>
      <td>
          <el-form-item label="账户编号" prop="accountNumber">
            <el-input v-model="ruleForm.accountNumber"></el-input>
        </el-form-item>
      </td>
       <td>
         <el-form-item
                label="账户名称"
                prop="accountName"
                :rules="[
                  {
                    required: true,
                    message: '请输入账户名称',
                    trigger: 'blur',
                  },
                  {
                    min: 3,
                    max: 5,
                    message: '长度在 3 到 5 个字符',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model="ruleForm.accountNumber"
                  placeholder="请输入名称"
                ></el-input>
              </el-form-item>
       </td>
    </tr>
    <tr>
        <td>
            <el-form-item label="账户类型" prop="name">
            <el-select v-model="ruleForm.accountType" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
        </td>
        <td>
            <el-form-item label="初期余额" prop="name">
            <el-input v-model="ruleForm.accountBalance"></el-input>
        </el-form-item>
        </td>
    </tr>
    <tr>
        <td>
            <el-form-item label="建账日期" prop="name">
            <el-date-picker
      v-model="ruleForm.accountDate"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
        </el-form-item>
        </td>
        <td>
            <el-form-item label="所属门店">
            <el-select v-model="ruleForm.aswid" placeholder="请选择">
            <el-option
              v-for="item in opn"
              :key="item.value"
              :label="item.aswname"
              :value="item.aswid">
            </el-option>
             </el-select>
             </el-form-item>
        </td>
    </tr>
    <tr>
        <td>
            <el-form-item label="收款备注" prop="name">
            <el-input v-model="ruleForm.accountRemark"></el-input>
        </el-form-item>
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
        opn:[],
         options: [{
          value: '0',
          label: '现金'
        }, {
          value: '1',
          label: '支付宝'
        }, {
          value: '2',
          label: '微信'
        }, {
          value: '3',
          label: '银行账户'
        }],
        
       ruleForm:{
         accountType:'',
          accountDate:'',
          accountNumber:'',
          accountType:'',
          accountRemark:'',
          accountName:'',
          accountBalance:'',
          aswid:'',
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.axios.post(this.$api+"/api/AccountAdd",{
                accountDate:this.ruleForm.accountDate,
                accountNumber:this.ruleForm.accountNumber,
                accountType:Number(this.ruleForm.accountType),
                accountRemark:this.ruleForm.accountRemark,
                accountName:this.ruleForm.accountName,
                accountBalance:Number(this.ruleForm.accountBalance),
                aswid:Number(this.ruleForm.aswid),
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
    },
    mounted(){
         //门店下拉
        this.axios.get(this.$api+'/api/AddShopWareSelect')
        .then(response=>{
          this.opn=response.data;
            console.log('ok')
        })
        .catch(function(error){
            console.log(error);
          })
    }
  };
</script>