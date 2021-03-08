<template>
  <div class="div1">
    <div class="div4">
      <div class="div3">
        <span class="ss">欢迎来到ERP进销存系统</span>
      </div>
      <div class="div2">
        <h3 class="h">注册账号</h3>
        <el-form ref="form" :model="form" label-width="80px" class="fm">
          <el-form-item label="手机号" >
            <el-input placeholder="请输入手机号" v-model="form.Usernumber" class="in"></el-input>
          </el-form-item>
          <el-form-item label="验证码" >
            <el-input placeholder="验证码" v-model="form.YanZhen" class="in1"></el-input>
            <el-button type="primary" @click="Login">获取验证码</el-button>
          </el-form-item>
          <el-form-item label="密码">
            <el-input placeholder="请输入密码" v-model="form.Userpwd" show-password class="in"></el-input>
          </el-form-item>
          <el-form-item>
            <router-link to="/company"><el-button type="primary" class="bt">快速开通</el-button></router-link>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked">注册即表示你同意遵守《服务协议》</el-checkbox>
          </el-form-item>
        </el-form>
         <router-link to="/" class="li1">已有账号,现在去登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        Usernumber: "",
        YanZhen:"",
        Userpwd: "",
        checked:true,
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style scoped>
.li1{
    padding-left: 40%;
}
.fm{
    padding-left: 100px;
}
.in{
    width: 300px;
}
.in1{
    width: 180px;
}
.ss {
  font-size: 50px;
  color: blanchedalmond;
}
.h {
    padding-left: 45%;
  color: blue;
  font-size: 36px;
}
.bt {
  width: 300px;
}
.div4 {
  margin-top: 100px;
  margin-left: 300px;
  width: 1100px;
  height: 600px;
}
.div3 {
  float: left;
  background: blue;
  width: 550px;
  height: 600px;
  opacity: 0.3;
}
.div2 {
  float: left;
  width: 548px;
  height: 600px;
}
</style>
