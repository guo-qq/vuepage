<template>
  <div>
    <div style="margintop: 200px">
      <table>
        <tr>
          <td>属性名称：</td>
          <td>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </td>
          <td>
            <div style="position: relative; top: 5%; marginleft: 400px">
              <el-button type="primary" plain @click="addEl()">添加</el-button>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <el-table style="margintop: 200px" :data="tabledatas" border>
        <el-table-column label="属性值">
          <el-table-column prop="propertyName">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入内容"
                v-show="scope.row.show"
                v-model="scope.row.propertyName"
              ></el-input>
              <span v-show="!scope.row.show">{{ scope.row.propertyName }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="加价">
          <el-table-column prop="ppAddPrice">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入内容"
                v-show="scope.row.show"
                v-model="scope.row.ppAddPrice"
              ></el-input>
              <span v-show="!scope.row.show">{{ scope.row.ppAddPrice }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="scope.row.show = true">开启</el-button>
            <el-button @click="scope.row.show = false">关闭</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="cun()">主要按钮</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabledatas: [],
      tt: [],
      input: "",
      cope: {
        propertyName: " ",
        ppAddPrice: " ",
        PpRecursion: "",
      },
    };
  },
  methods: {
    cun() {
      this.cope.propertyName = this.input;
      this.cope.ppAddPrice =Number("");
      this.cope.PpRecursion = Number(0);
      this.tt.push(this.cope);
      this.cope={
        propertyName: "",
        ppAddPrice:Number(""),
        PpRecursion:Number(""),
      }

      this.tabledatas.forEach((items, index) => {
        (this.cope.propertyName = items.propertyName),
          (this.cope.ppAddPrice = Number(items.ppAddPrice)),
          (this.cope.PpRecursion =Number(""));
        this.tt.push(this.cope);
      });
      console.log(this.tt);
      this.axios.post(this.$api+"/api/PropertyAdd",{po:this.tt});
    },
    addEl: function () {
      var copes = {
        propertyName: " ",
        ppAddPrice: " ",
        PpRecursion: "",
        show: true,
      };
      this.tabledatas.push(copes);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>