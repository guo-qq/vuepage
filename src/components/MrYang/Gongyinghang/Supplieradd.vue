<template>
    <div>
      <span style="marginLeft:3%;margintop:20%">基础数据</span>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <table>
        <tr>
          <td>
            <el-form-item label="供应商编码">
            <el-input v-model="ruleForm.clientSnumber"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="供应商名称" prop="name">
            <el-input v-model="ruleForm.clientSname"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="默认仓库">
            <el-cascader
              :v-model="ruleForm.aswid"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"></el-cascader>
             </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="供应商分类">
            <el-select v-model="ruleForm.ccsid" placeholder="请选择">
            <el-option
              v-for="item in opn"
              :key="item.value"
              :label="item.ccsname"
              :value="item.ccsid">
            </el-option>
             </el-select>
             </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
              <el-form-item  class="por" label="详细地址">
            <el-input style="width:395%" v-model="ruleForm.clientSaddress"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="邮编">
            <el-input v-model="ruleForm.postcode"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="备注信息">
            <el-input style="width:250%" v-model="ruleForm.clientSremark"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <el-form-item label="客户状态">
          <el-tooltip :content="'Switch value: ' + value" placement="top">
  <el-switch
    v-model="ruleForm.clientSstate"
    active-color="#13ce66"
    active-value="1"
    inactive-color="#ff4949"
    inactive-value="0">
  </el-switch>
</el-tooltip>
          </el-form-item>
        </tr>
      </table>
      <span style="marginLeft:3%;marginTop:20%">联系人信息</span>
      <table>
        <tr>
          <td>
            <el-form-item label="姓名">
            <el-input v-model="ruleForm.clientSlinkman"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="手机号">
            <el-input v-model="ruleForm.clientSphone"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="职位">
            <el-input v-model="ruleForm.clientSpost"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="E-mail">
            <el-input v-model="ruleForm.clientSemail"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
       <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      </el-form>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        options:[],
        opti:[],
        opn:[],
        ruleForm: {
         clientSnumber:'',
          clientSname:'',
          aswid:'',
          ccsid:'',
          clientSaddress:'',
          postcode:'',
          clientSremark:'',
          clientSstate:'1',
          clientSlinkman:'',
          clientSphone:'',
          clientSpost:'',
          clientSemail:'',
        },
        rules: {
          name: [
            { required: false,message:'请输入供应商名称'},
          ]
        }
      };
    },
    mounted(){
        //仓库下拉
        this.axios.get('http://localhost:50774/api/SelectWare')
        .then(response=>{
          this.options=response.data;
            console.log('ok')
        })
        .catch(function(error){
            console.log(error);
          }),
           //供应商分类
        this.axios.get('http://localhost:50774/api/ClientClassifySelect')
        .then(response=>{
          this.opn=response.data;
            console.log('ok')
        })
        .catch(function(error){
            console.log(error);
          })
      },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.axios.post("http://localhost:50774/api/ClientSuppliAdd",{
                clientSnumber:this.ruleForm.clientSnumber,
                clientSname:this.ruleForm.clientSname,
                aswid:Number(this.ruleForm.aswid),
                ccsid:Number(this.ruleForm.ccsid),
                clientSaddress:this.ruleForm.clientSaddress,
                postcode:this.ruleForm.postcode,
                clientSremark:this.ruleForm.clientSremark,
                clientSstate:Number(this.ruleForm.clientSstate),
                clientSlinkman:this.ruleForm.clientSlinkman,
                clientSphone:this.ruleForm.clientSphone,
                clientSpost:this.ruleForm.clientSpost,
                clientSemail:this.ruleForm.clientSemail,
            })
            this.$alert('添加成功','消息',{
                  confirmButtonText:'确定',
                  callback:action=>{
                    this.$router.push('/zsupplier');
                  }
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
      
    }
    
  }
  
</script>