<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">新增门店</el-button>
    <el-dialog
      title="新增门店"
      :visible.sync="dialogVisible"
      :close-on-click-modal="true"
      width="55%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <table style="marginleft: 5%">
          <tr>
            <td>
              <el-form-item
                label="门店名称"
                prop="aswname"
                :rules="[
                  {
                    required: true,
                    message: '请输入门店名称',
                    trigger: 'blur',
                  },
                  {
                    min: 3,
                    max: 5,
                    message: '长度在 3 到 5 个字符',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model="ruleForm.aswname"
                  placeholder="请输入名称"
                ></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="门店编号" prop="name">
                <el-input v-model="ruleForm.aswnumber"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="门店地址" prop="name">
                <el-input v-model="ruleForm.aswaddress"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item
                label="联系人名称"
                prop="aswlinkman"
                :rules="[
                  {
                    required: true,
                    message: '请输入联系人名称',
                    trigger: 'blur',
                  },
                  {
                    min: 3,
                    max: 5,
                    message: '长度在 3 到 5 个字符',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model="ruleForm.aswlinkman"
                  placeholder="请输入名称"
                ></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="手机号码" prop="aswphone">
                <el-input v-model="ruleForm.aswphone"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item
                label="E-mail"
                prop="aswemail"
                :rules="[
                  {
                    required: true,
                    message: '请输入邮箱地址',
                    trigger: 'blur',
                  },
                  {
                    type: 'email',
                    message: '请输入正确的邮箱地址',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <el-input v-model="ruleForm.aswemail"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="QQ" prop="name">
                <el-input v-model="ruleForm.aswqq"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="门店状态">
                <el-tooltip :content="'Switch value: ' + value" placement="top">
                  <el-switch
                    v-model="ruleForm.aswstate"
                    active-color="#13ce66"
                    active-value="1"
                    inactive-color="#ff4949"
                    inactive-value="0"
                  >
                  </el-switch>
                </el-tooltip>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="备注" prop="desc">
                <el-input
                  type="textarea"
                  v-model="ruleForm.aswremark"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var checkphone = (rule, value, callback) => {
      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      if (value == "") {
        callback(new Error("请输入手机号"));
      } else if (!this.isCellPhone(value)) {
        //引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      reload: this.reload,
      ruleForm: {
        aswname: "",
        aswnumber: "",
        aswaddress: "",
        aswlinkman: "",
        aswphone: "",
        aswemail: "",
        aswqq: "",
        aswstate: "0",
        aswremark: "",
      },
      rules: {
        aswphone: [{ required: true, validator: checkphone, trigger: "blur" }], //validator: checkphone是验证手机的引入checkphone函数
      },
    };
  },
  methods: {
    //检查手机号
    isCellPhone(val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post(this.$api + "/api/AddShopWareAdd", {
            aswname: this.ruleForm.aswname,
            aswnumber: this.ruleForm.aswnumber,
            aswaddress: this.ruleForm.aswaddress,
            aswlinkman: this.ruleForm.aswlinkman,
            aswphone: this.ruleForm.aswphone,
            aswemail: this.ruleForm.aswemail,
            aswqq: this.ruleForm.aswqq,
            aswstate: Number(this.ruleForm.aswstate),
            aswremark: this.ruleForm.aswremark,
          });
          this.$message({
            message: "添加成功",
            type: "success",
          });
          (this.dialogVisible = false), location.reload();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>