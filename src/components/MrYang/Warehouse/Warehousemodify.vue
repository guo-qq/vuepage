<template>
<div>
<el-button type="text" size="small" @click="upt()">编辑</el-button>
<el-dialog title="修改仓库" :modal="false" :visible.sync="dialogFormVisible">
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
        await this.axios.get("http://localhost:50774/api/WarehouseByid?id="+this.di).then((res)=>{
            this.ruleForm.wname=res.data.wname
            this.ruleForm.waddress=res.data.waddress
            this.ruleForm.wlink=res.data.wlink
            this.ruleForm.wiphone=res.data.wiphone
            this.ruleForm.wemail=res.data.wemail
            this.ruleForm.wqq=res.data.wqq
            this.ruleForm.wstate=res.data.wstate
            this.ruleForm.wremark=res.data.wremark
            this.ruleForm.aswid=res.data.aswid
        })
    },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.axios.post("http://localhost:50774/api/WarehouseUpt",{
                wid:di,
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