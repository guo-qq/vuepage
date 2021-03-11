<template>
<div>
<el-button type="text" size="small" @click="upt()">编辑</el-button>
<el-dialog title="收货地址" :modal="false" :visible.sync="dialogFormVisible">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <table style="marginLeft:5%">
    <tr>
      <td>
          <el-form-item label="门店名称" prop="name">
            <el-input v-model="ruleForm.aswname"></el-input>
        </el-form-item>
      </td>
       <td>
             <el-form-item label="门店编号" prop="name">
            <el-input v-model="ruleForm.aswnumber"></el-input>
        </el-form-item>
       </td>
    </tr>
    <tr>
        <td>
            <el-form-item label="门店地址" prop="name">
            <el-input v-model="ruleForm.aswaddress"></el-input>
        </el-form-item>
        </td>
    </tr>
    <tr>
        <td>
            <el-form-item label="联系人姓名" prop="name">
            <el-input v-model="ruleForm.aswlinkman"></el-input>
        </el-form-item>
        </td>
        <td>
            <el-form-item label="手机号码" prop="name">
            <el-input v-model="ruleForm.aswphone"></el-input>
        </el-form-item>
        </td>
    </tr>
    <tr>
        <td>
            <el-form-item label="E-mail" prop="name">
            <el-input v-model="ruleForm.aswemail"></el-input>
        </el-form-item>
        </td>
        <td>
            <el-form-item label="QQ" prop="name">
            <el-input v-model="ruleForm.aswqq"></el-input>
        </el-form-item>
        </td>
    </tr>
    <tr>
        <td>
        <el-form-item label="门店状态">
          <el-tooltip :content="'Switch value: ' + value" placement="top">
                <el-switch
                v-model="ruleForm.aswstate"
                active-color="#13ce66"
                active-value="1"
                inactive-color="#ff4949"
                inactive-value="0">
            </el-switch>
            </el-tooltip>
          </el-form-item>
        </td>
    </tr>
    <tr>
        <td>
            <el-form-item label="备注" prop="desc">
            <el-input type="textarea" v-model="ruleForm.aswremark"></el-input>
            </el-form-item>
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
          aswname:'',
          aswnumber:'',
          aswaddress:'',
          aswlinkman:'',
          aswphone:'',
          aswemail:'',
          aswqq:'',
          aswstate:'0',
          aswremark:''
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
        await this.axios.get("http://localhost:50774/api/AddShopWareByid?id="+this.di).then((res)=>{
            this.ruleForm.aswname=res.data.aswname
            this.ruleForm.aswnumber=res.data.aswnumber
            this.ruleForm.aswlinkman=res.data.aswlinkman
            this.ruleForm.aswphone=res.data.aswphone
            this.ruleForm.aswemail=res.data.aswemail
            this.ruleForm.aswqq=res.data.aswqq
            this.ruleForm.aswstate=res.data.aswstate
            this.ruleForm.aswremark=res.data.aswremark
            this.ruleForm.aswaddress=res.data.aswaddress
        })
    },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.axios.post("http://localhost:50774/api/AddShopWareUpt",{
                aswid:this.di,
                aswname:this.ruleForm.aswname,
                aswnumber:this.ruleForm.aswnumber,
                aswaddress:this.ruleForm.aswaddress,
                aswlinkman:this.ruleForm.aswlinkman,
                aswphone:this.ruleForm.aswphone,
                aswemail:this.ruleForm.aswemail,
                aswqq:this.ruleForm.aswqq,
                aswstate:Number(this.ruleForm.aswstate),
                aswremark:this.ruleForm.aswremark
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