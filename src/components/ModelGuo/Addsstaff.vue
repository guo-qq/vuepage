<template>
  <div>
    <!-- Form -->
    <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>

    <el-dialog title="添加员工" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="usernumber" style="width: 350px">
          <el-input v-model="ruleForm.usernumber"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="userName" style="width: 350px">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="userpwd" style="width: 350px">
          <el-input v-model="ruleForm.userpwd"></el-input>
        </el-form-item>

        <el-divider></el-divider>

      
        <el-form-item label="所属门店" prop="">
          <el-select v-model="ruleForm" placeholder="请选择活动区域">
            <el-option label="王五百货商城" value="shanghai"></el-option>
            <el-option label="上海门店" value="beijing"></el-option>
            <el-option label="江苏门店" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择角色" prop="">
          <el-select v-model="ruleForm" placeholder="请选择活动区域">
            <el-option label="采购员" value="shanghai"></el-option>
            <el-option label="销售员" value="beijing"></el-option>
            <el-option label="财务" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工状态" prop="userstate">
          <el-switch v-model="ruleForm.userstate"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      ruleForm: {
        usernumber: "",
        userpwd: "",
        userName: "",
        userstate: "",
        userTime: "",
        resource: "",
        userphoto: "",
        usershop: "",
      },
      region:[],
      rules: {
        usernumber: [
          { required: true, message: "请输账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入员工姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        userpwd: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        aswName: [
          { required: true, message: "请选择所属门店", trigger: "change" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    staff() {
      this.axios
        .get("http://localhost:50774/api/AddShopWareSelect")
        .then((response) => {         
          this.region = response.data;          
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.staff();
  },
};
</script>