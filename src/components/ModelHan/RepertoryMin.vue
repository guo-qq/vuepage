
<template>
  <div>
    <el-row>
      <!-- <el-button type="primary">导出</el-button> -->
    </el-row>
    <br />
    &nbsp;&nbsp;<span>业务日期</span>&nbsp;&nbsp;&nbsp;&nbsp;
    <el-date-picker
      v-model="value"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']"
    >
    </el-date-picker>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <el-input class="sty" placeholder="请输入内容" v-model="state">
      <template #prefix>
        <i class="el-input__icon el-icon-search"></i>
      </template>
    </el-input>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    <el-button type="primary" @click="$router.push('/bwarning')">销售预警</el-button>
    <el-button type="primary" @click="$router.push('/RepertoryMax')">高于库存上限</el-button>
    <br />
    <br />
    <el-table 
      :data="items"
      border
      style="width: 100%"
      row-class-name="tableRowClassName"
    >
      <el-table-column prop="cargoCoding" label="商品编码" width="180">
      </el-table-column>
      <el-table-column prop="className" label="商品类别" width="180">
      </el-table-column>
      <el-table-column prop="cargoName" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="unitName" label="单位" width="180">
      </el-table-column>
      <el-table-column prop="wname" label="仓库"> </el-table-column>
      <el-table-column prop="wsize" label="可存储数量"> </el-table-column>
      <el-table-column prop="cpMaxNumber" label="库存上限"> </el-table-column>
      <el-table-column prop="cpMinNumber" label="库存下限"> </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10"
      >
      </el-pagination>
    </div>
  </div>
</template>
<style scoped>
.sty {
  width: 200px;
}
</style>
<script>
// 节流函数
const delay = (function () {
  let timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
export default {
  data() {
    //this.isShow=true;
    return {
      input2: "", //查询输入框
      value: "",
      state: "",
      isCollapse: true,
      items: [],
      currentPage1: 1, //分页
      currentPage2: 3,
    };
  },
  watch: {
    //watch title change
    state() {
      delay(() => {
        this.fetchData();
      }, 300);
    },
    value() {
      delay(() => {
        this.fetchData();
      }, 300);
    },
    currentPage1() {
      this.fetchData();
    },
    currentPage2() {
      this.fetchData();
    },
  },
  methods: {
    loadAll() {
      return [

        this.axios
          .get("http://localhost:50774/api/Repertorymin")
          .then((response) => {
            this.restaurants = response.data;
          })
          .catch(function (error) {
            console.log(error);
          }),
      ];
    },
    handleSizeChange(val) {
      this.currentPage1 = val;
    },
    handleCurrentChange(val) {
      this.currentPage2 = val;
    },
    async fetchData(val) {
      const res = await this.axios
        .get("http://localhost:50774/api/Repertorymin", {
          params: {
            wname: this.state,
            start: this.value[0],
            end: this.value[1],
            pageSize: this.currentPage1,
            pageIndex: this.currentPage2,
          },
        })
        .then((response) => {
          this.items = response.data;
        });
    },

  },
  mounted() {
    this.loadAll();
    this.axios
      .get("http://localhost:50774/api/Repertorymin")
      .then((response) => {
        this.items = response.data;
        console.log("ok");
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

