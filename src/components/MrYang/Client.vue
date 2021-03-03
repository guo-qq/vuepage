<template>
    <div>
      <span style="marginLeft:3%;margintop:20%">基础数据</span>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <table>
        <tr>
          <td>
            <el-form-item label="客户代码">
            <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="客户名称" prop="name">
            <el-input v-model="ruleForm.name2"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="默认仓库">
            <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
             </el-select>
             </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="客户级别">
            <el-select v-model="value" placeholder="请选择">
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
            <el-form-item label="客户标签">
            <el-select v-model="value" placeholder="请选择">
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
            <el-form-item label="客户分类">
            <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
             </el-select>
             </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
              <el-form-item  class="por" label="详细地址">
            <el-input style="width:395%" v-model="ruleForm.name3"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="邮编">
            <el-input v-model="ruleForm.name4"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="备注信息">
            <el-input style="width:250%" v-model="ruleForm.name5"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <el-form-item label="客户状态">
          <el-tooltip :content="'Switch value: ' + value" placement="top">
  <el-switch
    v-model="valuee"
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
            <el-input v-model="ruleForm.name6"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="手机号">
            <el-input v-model="ruleForm.name7"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="部门">
            <el-input v-model="ruleForm.name8"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="职位">
            <el-input v-model="ruleForm.name9"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="E-mail">
            <el-input v-model="ruleForm.name111"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="QQ">
            <el-input v-model="ruleForm.name333"></el-input>
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
        valuee: '1',
        options:[],
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          
        },
        rules: {
          name: [
            { required: true, message: '请输入客户名称', trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      Bind(op){
        this.axios.get("http://localhost:50774/api/WarehouseSelect")
        
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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
<style>
    
</style>