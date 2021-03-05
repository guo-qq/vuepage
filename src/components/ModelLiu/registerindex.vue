<template>
  <div class="div1">
    <div class="div4">
      <div class="div3">
        <span class="ss">欢迎来到ERP进销存系统</span>
      </div>
      <div class="div2">
        <h3 class="h">欢迎登录</h3>
        <el-form ref="form" :model="form" label-width="80px" class="fm">
          <el-form-item label="账号">
            <el-input
              placeholder="请输入账号"
              v-model="form.Usernumber"
              class="in"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              placeholder="请输入密码"
              v-model="form.Userpwd"
              show-password
              class="in"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="Login(form)" class="bt"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
        <router-link to="/enrollindex" class="li1"
          >没有账号,现在去注册</router-link
        >
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
        Userpwd: "",
      },
    };
  },
  methods: {
    Login(form) {
      var gg = {};
      gg.Usernumber = Number(this.form.Usernumber);
      gg.Userpwd = this.form.Userpwd;
      this.axios.get("http://localhost:50774/api/GetEnter", { gg })
        .then(function (res) {
          console.log(res.data);
          if (res != null) {
            alert("登录成功");
            this.$router.push('/shou');
          } else {
            alert("登录失败");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.li1 {
  padding-left: 45%;
}
.fm {
  padding-left: 100px;
}
.in {
  width: 300px;
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
  margin-left: 200px;
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
  border: gray 1px solid;
  float: left;
  width: 548px;
  height: 600px;
}
</style>
