<template>
  <div>
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
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <br />
    <span><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销售趋势:</span>
    <br />
    <div class="sys">
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>销售金额(元):</span>
      <label>{{ ssPrices }}</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>销售笔数:</span>
      <label>{{ sscNumbers }}</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>销售利润(元):</span>
      <label>{{ maoLis }}</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
    <br />
    <div>
    <div class="mains">
        <span>商品退款排行</span>
    <el-table
      :data="itemss"
      border
      style="width: 100%"
      show-summary
      :summary-method="getTotals"
      row-class-name="tableRowName"
    >
      <el-table-column prop="cargoCoding" label="商品编号" width="180">
      </el-table-column>
      <el-table-column prop="cargoName" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="ssPrices" label="销售总额(元)" width="180">
      </el-table-column>
      <el-table-column prop="maoLis" label="销售利润(元)"> </el-table-column>
      <el-table-column prop="sscNumbers" label="销售笔数" width="180">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChanges"
        @current-change="handleCurrentChanges"
        :current-page="currentPage4"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10"
      >
      </el-pagination>
    </div>
    </div>
    </div>
  </div>
</template>
<style scoped>
.sty {
  width: 200px;
}
.mains{
    float: left;
    margin-left: 20px;
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
      isCollapse: true,
      itemss: [],
      ssPrices: "",
      sscNumbers: "",
      maoLis: "",
      currentPage1s: 1, //分页
      currentPage2s: 1,
    };
  },
  watch: {
    //watch title change
    value() {
      delay(() => {
        this.fetchData();
      }, 300);
    },
    currentPage1s() {
      this.fetchData();
    },
    currentPage2s() {
      this.fetchData();
    },
  },
  methods: {
    loadAlls() {
      return [
        this.axios
          .get("http://localhost:50774/api/ProfileTK")
          .then((response) => {
            this.restaurants = response.data;
          })
          .catch(function (error) {
            console.log(error);
          }),
      ];
    },
    handleSizeChanges(val) {
      this.currentPage1s = val;
    },
    handleCurrentChanges(val) {
      this.currentPage2s = val;
    },
    async fetchData(val) {
      const res = await this.axios
        .get("http://localhost:50774/api/ProfileTK", {
          params: {
            start: this.value[0],
            end: this.value[1],
            pageSize: this.currentPage1,
            pageIndex: this.currentPage2,
          },
        })
        .then((response) => {
          this.itemss = response.data;
        });
    },
    getTotals(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (
          column.property === "ssPrices" ||
          column.property === "sscNumbers" ||
          column.property === "maoLis" 
        ) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index];
        } else {
          sums[index] = "--";
        }
      });
      this.ssPrices = sums[2];
      this.sscNumbers = sums[4];
      this.maoLis = sums[3];
      return sums;
    },
  },
  mounted() {
    this.loadAlls();
    this.axios
      .get("http://localhost:50774/api/ProfileTK")
      .then((response) => {
        this.itemss = response.data;
        console.log("ok");
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  
};
</script>
