
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
    <el-button type="primary" @click="$router.push('/SLeiBie')">类别</el-button
    >&nbsp;&nbsp;&nbsp;
    <el-button type="primary" @click="$router.push('/SKeHu')">客户</el-button
    >&nbsp;&nbsp;&nbsp;
    <el-button type="primary" @click="$router.push('/bcollect')">利润</el-button
    >&nbsp;&nbsp;&nbsp;
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    <div class="sys">
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>销售数量合计:</span>
      <label>{{ sums }}</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>销售金额合计:</span>
      <label>{{ ssPrice }}</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>销售毛利合计:</span>
      <label>{{ xsMaoLi }}</label>
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
      <el-table-column prop="cargoCoding" label="商品编码" width="180">
      </el-table-column>
      <el-table-column prop="cargoName" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="unitName" label="单位" width="180">
      </el-table-column>
      <el-table-column prop="sscNumber" label="数量"> </el-table-column>
      <el-table-column prop="cpPrice" label="单价(元)"> </el-table-column>
      <el-table-column prop="ssPrice" label="销售金额(元)"> </el-table-column>
      <el-table-column prop="xsMaoLi" label="销售利润(元)"> </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 50]"
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
      state: "",
      isCollapse: true,
      items: [],
      sscNumber: "",
      ssPrice: "",
      xsMaoLi: "",
      currentPage1: 1, //分页
      currentPage2: 50,
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
    exportData() {
		this.excelData = this.items;  //将你要导出的数组数据（historyList）赋值给excelDate
		this.export2Excel(); //调用export2Excel函数，填写表头（clomns里的type）和对应字段(historyList里的属性名)
	},
	//表格数据写入excel
    export2Excel() {
      var that = this;
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("@/assets/excel/Export2Excel");  
        //这里使用绝对路径( @表示src文件夹 )，使用@/+存放export2Excel的路径【也可以写成相对于你当前"xxx.vue"文件的相对路径，例如我的页面放在assets文件夹同级下的views文件夹下的“home.vue”里，那这里路径也可以写成"../assets/excel/Export2Excel"】
        const tHeader = ["商品编码", "商品名称", "单位", "数量","单价(元)","销售金额(元)","销售利润(元)"]; // 导出的excel表头名信息
            const filterVal = [
              "cargoCoding",
              "cargoName",
              "unitName",
              "sscNumber",
              "cpPrice",
              "ssPrice",
              "xsMaoLi"
            ]; // 导出的excel表头字段名，需要导出表格字段名
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);

        export_json_to_excel(tHeader, data, "采购商品表"); // 导出的表格名称，根据需要自己命名
      });
    },
    //格式转换，直接复制即可,不需要修改什么
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    loadAll() {
      return [
        this.axios
          .get("http://localhost:50774/api/SellShop")
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
        .get("http://localhost:50774/api/SellShop", {
          params: {
            cargoName: this.state,
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
          column.property === "sscNumber" ||
          column.property === "ssPrice" ||
          column.property === "xsMaoLi"
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
      this.sscNumber = sums[3];
      this.ssPrice = sums[5];
      this.xsMaoLi = sums[6];
      return sums;
    },
  },

  mounted() {
    this.loadAll();
    this.axios
      .get("http://localhost:50774/api/SellShop")
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

