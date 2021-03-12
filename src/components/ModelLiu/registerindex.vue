<template>
  <div class="div1">
    <div class="div4">
      <div class="div3">
        <span class="ss">欢迎来到ERP进销存系统</span>
      </div>
      <div class="div2">
        <el-card shadow="always" style="height:600px">
              <h3 class="h">欢迎登录</h3>
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="fm">
              <el-form-item label="账号" prop="Usernumber">
                <el-input
                  placeholder="请输入账号"
                  v-model="form.Usernumber"
                  class="in"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="Userpwd">
                <el-input
                  placeholder="请输入密码"
                  v-model="form.Userpwd"
                  show-password
                  class="in"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="Login()" class="bt">登录</el-button>
              </el-form-item>
            </el-form>
       </el-card>
      </div>
    </div>
  </div>
</template>

<script>
 import eventBus from '@/eventBus'
export default { 
  data() {
    return {
      form: {
        Usernumber: "",
        Userpwd: "",
      },
      rules:{
        Usernumber :[{required: true, message: '请输入账号', trigger: 'blur'}],
        Userpwd :[{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      enen:[],
    };
  },
  methods: {
    Login() {
        this.axios.get("http://localhost:50774/api/Carte?name="+this.form.Usernumber+"&&pwd="+this.form.Userpwd).then((res)=>{
           
            if(res.data.length>0){               
                  this.send(res);
                 alert("登录成功"); 
                   
                  this.$router.push("/Home");
                 
                  
            }else{
                alert("登录失败");
            }
        })
    },
    send(res)
    {
        eventBus.$emit("userDefinedEvent",res)
    }
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
  opacity: 0.9;
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
  width: 550px;
  height: 600px;
  opacity: 0.5;
  background-image: url(../../components/Img/31.jpg);
}
.div2 {
  float: left;
  width: 548px;
  height: 600px;
}
</style>
