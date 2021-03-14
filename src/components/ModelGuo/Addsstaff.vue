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
        <el-form-item label="账号" prop="zhanghao" style="width: 350px">
          <el-input v-model="ruleForm.zhanghao"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="xingming" style="width: 350px">
          <el-input v-model="ruleForm.xingming"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="mima" style="width: 350px">
          <el-input v-model="ruleForm.mima"></el-input>
        </el-form-item>

        <el-divider></el-divider>

        <el-form-item label="所属门店" prop="">
          <el-select v-model="mendian" placeholder="请选择活动区域">
            <el-option
              v-for="item in region"
              :key="item.aswid"
              :label="item.aswname"
              :value="item.aswid"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择角色" prop="">
          <el-select v-model="jiaose" placeholder="请选择活动区域">
            <el-option
              v-for="item in region1"
              :key="item.roleid"
              :label="item.roleidName"
              :value="item.roleid"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工状态" prop="userstate">
          <el-switch v-model="zhuangtai"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即创建</el-button>
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
        zhanghao: "",
        xingming: "",
        mima: "",
      },
      region: [],
      region1: [],
      rules: {
        zhanghao: [
          { required: true, message: "请输账号", trigger: "blur" },
          { min: 3, max: 25, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        xingming: [
          { required: true, message: "请输入员工姓名", trigger: "blur" },
          { min: 3, max: 25, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        mima: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 3, max: 25, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",

      mendian: "",
      jiaose: "",
      zhuangtai: "",
      Data: this.getProjectNum(),
    };
  },
  methods: {
    // 获取当前日期的方法
    getProjectNum() {
      const projectTime = new Date(); // 当前中国标准时间
      const Year = projectTime.getFullYear(); // 获取当前年份 支持IE和火狐浏览器.
      const Month = projectTime.getMonth() + 1; // 获取中国区月份
      const Day = projectTime.getDate(); // 获取几号
      var CurrentDate = Year;
      if (Month >= 10) {
        // 判断月份和几号是否大于10或者小于10
        CurrentDate += Month;
      } else {
        CurrentDate += "0" + Month;
      }
      if (Day >= 10) {
        CurrentDate += Day;
      } else {
        CurrentDate += "0" + Day;
      }
      return CurrentDate;
    },
    submitForm() {
     
      this.axios({
        method: "post",
        url: this.$api + "/api/AddUser",
        data: {
          Usernumber: this.ruleForm.zhanghao,
          Userpwd: this.ruleForm.mima,
          UserName: this.ruleForm.xingming,
          Usershop: Number(this.mendian),
          Userstate: Number(this.zhuangtai),
          UserTime :this.Data,
          Roleid:Number(this.jiaose),
        },
      }).then((res) => {
        alert(this.jiaose);
        this.axios({
          method: "post",
          url: this.$api + "/api/AddUserRole",
          data: {
           Roleid:Number(this.jiaose)
          },
        }).then((res) => {
          this.$message({
            message: "添加成功",
            type: "success",
          });
        });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    staff() {
      this.axios
        .get(this.$api + "/api/AddShopWareSelect")
        .then((response) => {
          this.region = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    roles() {
      this.axios
        .get(this.$api + "/api/roles")
        .then((response) => {
          this.region1 = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.staff();
    this.roles();
  },
};
</script>