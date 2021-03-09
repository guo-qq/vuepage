<template>
<div>
<el-button type="text" size="small" @click="modify()">编辑</el-button>
<el-dialog title="收货地址" :modal="false" :visible.sync="dialogFormVisible">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <table style="marginLeft:5%">
    <tr>
      <td>
          <el-form-item label="账户编号" prop="name">
            <el-input v-model="ruleForm.accountNumber"></el-input>
        </el-form-item>
      </td>
       <td>
             <el-form-item label="账户名称" prop="name">
            <el-input v-model="ruleForm.accountName"></el-input>
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
        dialogFormVisible : false,
        reload: this.reload,
        opn:[],
        di:this.id,
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
    props:{
        id:{
            type:Number,
            Request:true
        }
    },
    methods:{
    async modify(ss)
    {
        this.dialogFormVisible =true,
        await this.axios.get("http://localhost:50774/api/AccountByid?id="+this.di).then((res)=>{
            this.ruleForm.accountDate=res.data.accountDate,
            this.ruleForm.accountNumber=res.data.accountNumber,
            this.ruleForm.accountType=res.data.accountType,
            this.ruleForm.accountRemark=res.data.accountRemark,
            this.ruleForm.accountName=res.data.accountName,
            this.ruleForm.accountBalance=res.data.accountBalance,
            this.ruleForm.aswid=res.data.aswid
        })
    },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.axios.post("http://localhost:50774/api/AccountUpt",{
                accountId:this.di,
                accountDate:this.ruleForm.accountDate,
                accountNumber:this.ruleForm.accountNumber,
                accountType:Number(this.ruleForm.accountType),
                accountRemark:this.ruleForm.accountRemark,
                accountName:this.ruleForm.accountName,
                accountBalance:Number(this.ruleForm.accountBalance),
                aswid:Number(this.ruleForm.aswid),
            })
            this.$message({
                    message: '修改成功',
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
    },
    mounted(){
         //门店下拉
        this.axios.get('http://localhost:50774/api/AddShopWareSelect')
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