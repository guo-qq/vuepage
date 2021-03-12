<template>
  <div>
    <!-- 企业信息 -->
    <div>企业信息</div>
    <!-- 表单 -->
    <div>      
      <el-form               
        label-width="100px"
        class="demo-ruleForm"
        :disabled=enen
      >
        <el-form-item label="企业Logo:" prop="name1">

          <el-upload
            action="F:\vuepage\src\assets\logo.png"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="handleAvatarChange"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="企业名称" prop="name2">
          <el-input v-model="handleRemove.epriseName"></el-input>

        </el-form-item>
        <el-form-item label="企业账户" prop="name3">
          <el-input v-model="handleRemove.epriseAccount"></el-input>
        </el-form-item>
        <el-form-item label="所属行业" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="食品加工" value="shanghai"></el-option>
            <el-option label="纺织业" value="beijing1"></el-option>
            <el-option label="服装业" value="beijing2"></el-option>
            <el-option label="金属制品业" value="beijing3"></el-option>
            <el-option label="交通运输设备制造业" value="beijing4"></el-option>
            <el-option label="教育业" value="beijing5"></el-option>
            <el-option label="其他" value="beijing6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到期时间:" prop="name4">
          <el-input v-model="handleRemove.epriseDqDate"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名:" prop="name5">
          <el-input v-model="handleRemove.linkman"></el-input>
        </el-form-item>
        <el-form-item label="公司地址:" prop="name6">
          <el-input v-model="handleRemove.epriseAddress"></el-input>
        </el-form-item>
        <el-form-item label="备注信息:" prop="name7">
          <el-input v-model="handleRemove.epriseRemark"></el-input>
        </el-form-item>                
      </el-form>
    </div>
    <div>
           <el-button type="primary"  
            ><span v-if="enen==true" @click="enen=false">修改</span>
            <span v-if="enen!==true" @click="update(),enen=true">保存</span>
            </el-button
          >
          <el-button @click="resetForm()">返回</el-button>
 
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      handleRemove:[],
      enen:true,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入Logo", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        name2: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        name3: [
          { required: true, message: "请输入企业账户", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        name4: [
          { required: true, message: "请输入到期时间", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        name5: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        name6: [
          { required: true, message: "请输入公司地址", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        name7: [
          { required: true, message: "请输入备注信息", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择所属行业", trigger: "change" },
        ],
      },
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
       location.reload();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarChange(file, filelist) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    update(){
         this.axios({
            method: "post",
            url: "http://localhost:50774/api/uptenterprises",
            data: {
                EnterpriseId:this.handleRemove.enterpriseId,
                EpriseLogo:this.handleRemove.epriseLogo,
                EpriseName:this.handleRemove.epriseName,
                EpriseAccount:this.handleRemove.epriseAccount,
                EpriseBusiness:this.handleRemove.epriseBusiness,
                EpriseDqDate:this.handleRemove.epriseDqDate,
                Linkman:this.handleRemove.linkman,
                LinkPhone:this.handleRemove.linkPhone,
                EpriseAddress:this.handleRemove.epriseAddress,
                EpriseRemark:this.handleRemove.epriseRemark
            },
          }).then((res) => {
            if (res.status == 200) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
              } else {
                this.$message({
                  message: "修改失败",
                  type: "success",
                });
              }
          });
          
      
    }
  },
  mounted(){
       this.axios
        .get("http://localhost:50774/api/enterprises")
        .then((response) => { 
          this.handleRemove = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  }
};
</script>
