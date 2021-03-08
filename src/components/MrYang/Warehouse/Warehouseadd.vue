<template>
<div>
<el-button type="primary" @click="dialogVisible = true">新增仓库</el-button>
<el-dialog
  title="新增仓库"
  :visible.sync="dialogVisible"
  :close-on-click-modal='true'
  width="55%"
  :before-close="handleClose">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <table style="marginLeft:5%">
    <tr>
      <td>
          <el-form-item label="仓库名称" prop="name">
            <el-input v-model="ruleForm.wname"></el-input>
        </el-form-item>
      </td>
       <td>
              <el-form-item label="所属门店">
            <el-select v-model="ruleForm.aswid" placeholder="请选择">
            <el-option
              v-for="item in options"
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
            <el-form-item label="仓库地址" prop="name">
            <el-input v-model="ruleForm.waddress"></el-input>
        </el-form-item>
        </td>
    </tr>
    <tr>
        <td>
            <el-form-item label="联系人姓名" prop="name">
            <el-input v-model="ruleForm.wlink"></el-input>
        </el-form-item>
        </td>
        <td>
            <el-form-item label="手机号码" prop="name">
            <el-input v-model="ruleForm.wiphone"></el-input>
        </el-form-item>
        </td>
    </tr>
    <tr>
        <td>
            <el-form-item label="E-mail" prop="name">
            <el-input v-model="ruleForm.wemail"></el-input>
        </el-form-item>
        </td>
        <td>
            <el-form-item label="QQ" prop="name">
            <el-input v-model="ruleForm.wqq"></el-input>
        </el-form-item>
        </td>
    </tr>
    <tr>
        <td>
        <el-form-item label="门店状态">
          <el-tooltip :content="'Switch value: ' + value" placement="top">
                <el-switch
                v-model="ruleForm.wstate"
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
            <el-input type="textarea" v-model="ruleForm.wremark"></el-input>
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
        options:[],
       ruleForm:{
          wname:'',
          waddress:'',
          wlink:'',
          wiphone:'',
          wemail:'',
          wqq:'',
          wstate:'0',
          wremark:'',
          aswid:''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.axios.post("http://localhost:50774/api/WarehouseAdd",{
                wname:this.ruleForm.wname,
                waddress:this.ruleForm.waddress,
                wlink:this.ruleForm.wlink,
                wiphone:this.ruleForm.wiphone,
                wemail:this.ruleForm.wemail,
                wqq:this.ruleForm.wqq,
                wstate:Number(this.ruleForm.wstate),
                wremark:this.ruleForm.wremark,
                aswid:this.ruleForm.aswid
            })
            this.$message({
                    message: '添加成功',
                   type: 'success',
                })
            this.axios.post("http://localhost:50774/api/Swarehoues",{
                aswid:Number(this.ruleForm.aswid)
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
         //仓库下拉
        this.axios.get('http://localhost:50774/api/AddShopWareSelect')
        .then(response=>{
          this.options=response.data;
            console.log('ok')
        })
        .catch(function(error){
            console.log(error);
          })
    }
  };
</script>