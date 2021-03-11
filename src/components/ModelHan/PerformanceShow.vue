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
    <el-input class="sty" placeholder="请输入内容" v-model="states">
      <template #prefix>
        <i class="el-input__icon el-icon-search"></i>
      </template>
    </el-input>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    <div class="sys">
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>销售额(元):</span>
      <label>{{ ssPrice }}</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>销售笔数(元):</span>
      <label>{{ sscNumber }}</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>销售利润(元):</span>
      <label>{{ maoLi }}</label>
    </div>
    <br />
    <el-table
      :data="items"
      border
      style="width: 100%"
      show-summary
      :summary-method="getTotal"
      row-class-name="tableRowClassName"
    >
      <el-table-column prop="ssZdDate" label="制单时间" width="180">
      </el-table-column>
      <el-table-column prop="ssNumber" label="单据编号" width="180">
      </el-table-column>
      <el-table-column prop="aswId" label="所属分店"> </el-table-column>
      <el-table-column prop="ssPrice" label="销售金额(元)">
      </el-table-column>
      <el-table-column prop="sscNumber" label="销售笔数">
      </el-table-column>
      <el-table-column prop="maoLi" label="销售利润(元)"> </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10,20, 30, 50]"
        :page-size="50"
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
    return {
      input2: "", //查询输入框
      value: "",
      states: "",
      isCollapse: true,
      items: [],
      sscNumber: "",
      ssPrice: "",
      maoLi: "",
      currentPage1: 1, //分页
      currentPage2: 50,
    };
  },
  watch: {
    //watch title change
    states() {
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
          .get("http://localhost:50774/api/PerformanceShow")
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
        .get("http://localhost:50774/api/PerformanceShow", {
          params: {
            aswname: this.states,
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
    getTotal(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (
          column.property === "ssPrice" ||
          column.property === "sscNumber" ||
          column.property === "maoLi"
        ) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index]+="";
        } else {
          sums[index] = "--";
        }
      });

      this.ssPrice = sums[3];
      this.sscNumber = sums[4];
      this.maoLi = sums[5];
      return sums;
    },
  },

  mounted() {
    this.loadAll();
    this.axios
      .get("http://localhost:50774/api/PerformanceShow")
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

