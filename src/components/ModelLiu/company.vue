<template>
  <div class="div1">
    <div class="div2">
      <h3 class="h">完善企业资料</h3>
      <h6 class="h1">请如实填写资料,方便我们为您提供更完善服务</h6>
      <el-form ref="form" :model="form" label-width="80px" class="fm">
        <el-form-item label="公司:">
          <el-input
            placeholder="请输入公司名称"
            v-model="form.GName"
            class="in"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属行业:">
          <el-select v-model="form.HangYe" placeholder="请选择" class="in">
            <el-option label="请选择" value="请选择"></el-option>
            <el-option label="服装" value="服装"></el-option>
            <el-option label="饮料" value="饮料"></el-option>
            <el-option label="健身" value="健身"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司规模:">
          <el-select v-model="form.GongSi" placeholder="请选择" class="in">
            <el-option label="1000人以上" value="1000人以上"></el-option>
            <el-option label="200-999人" value="200-999人"></el-option>
            <el-option label="10-499人" value="10-499人"></el-option>
            <el-option label="10人一下" value="10人一下"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人:">
          <el-input
            placeholder="联系人:"
            v-model="form.Linkman"
            class="in"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话:">
          <el-input
            placeholder="联系电话"
            v-model="form.LinkPhone"
            class="in"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="bt">开始使用</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        GName: "",
        HangYe: "",
        GongSi: "",
        Linkman: "",
        LinkPhone: "",
      },
    };
  },
  methods: {},
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
.h {
  padding-left: 35%;
  color: blue;
  font-size: 36px;
}
.h1 {
  padding-top: 0px;
  padding-left: 35%;
  color: gray;
  font-size: 12px;
}
.bt {
  width: 300px;
}
.div2 {
  margin-top: 100px;
  margin-left: 550px;
  width: 548px;
  height: 600px;
}
</style>
