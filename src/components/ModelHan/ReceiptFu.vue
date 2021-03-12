<template>
  <div>
    <el-row>
      <el-button type="primary"  @click="exportData">导出</el-button>
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
    <br />
    <br />
    <el-table
      :data="items"
      border
      style="width: 100%"
      row-class-name="tableRowClassName"
    >
      <el-table-column prop="rCreateTime" label="制单时间" width="180">
      </el-table-column>
      <el-table-column prop="danJ" label="单据编号" width="180">
      </el-table-column>
      <el-table-column prop="rpPayer" label="供应商" width="180">
      </el-table-column>
      <el-table-column prop="rpHandle" label="联系人" width="180">
      </el-table-column>
      <el-table-column prop="rpmPayment" label="销售金额(元)" width="180">
      </el-table-column>
      <el-table-column prop="rpmDiscount" label="优惠金额(元)"> </el-table-column>
      <el-table-column prop="rpmPaymentSum" label="应收金额(元)"> </el-table-column>
      <el-table-column prop="rpmMoney" label="已收金额(元)"> </el-table-column>
      <el-table-column prop="rpTotalMoney" label="应付款金额(元)"> </el-table-column>
       <el-table-column prop="rpmRemark" label="备注"> </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
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
      state: "",
      isCollapse: true,
      items: [],
      currentPage1: 1, //分页
      currentPage2: 10,
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
          .get("http://localhost:50774/api/ReceiptFu")
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
        .get("http://localhost:50774/api/ReceiptFu", {
          params: {
            RPPayername: this.state,
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
      .get("http://localhost:50774/api/ReceiptFu")
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

