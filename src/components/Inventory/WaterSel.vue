<template>
  <div>
    <div id="app">
      <!--单据类型-->
      <div style="float: left">
        <span class="demonstration">单据类型</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
        >&nbsp;&nbsp;&nbsp;&nbsp;
      </div>

      <!--创建日期-->
      <div class="block" style="float: left">
        <span class="demonstration">创建日期</span>
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        &nbsp;&nbsp;&nbsp;
      </div>
      <!--关键字搜索-->
      <div style="width: 200px; float: left">
        <el-input v-model="input" placeholder="请输入关键字"></el-input>
      </div>
      <div style="float: left">
        &nbsp;&nbsp;&nbsp;
        <el-button @click="sel()" type="primary">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" max-height="250">
      <el-table-column fixed prop="sdateTime" label="创建时间">
      </el-table-column>
      <el-table-column prop="shopBian" label="商品编码"> </el-table-column>
      <el-table-column prop="receiptsB" label="单据编号"> </el-table-column>
      <el-table-column prop="relevanceRec" label="关联业务单号">
      </el-table-column>
      <el-table-column prop="receType" label="单据类型"> </el-table-column>
      <el-table-column prop="storeName" label="门店"> </el-table-column>
      <el-table-column prop="warehouseName" label="仓库"> </el-table-column>
      <el-table-column prop="contact" label="来往单位"> </el-table-column>
      <el-table-column prop="stockC" label="出库量"> </el-table-column>
      <el-table-column prop="storage" label="入库量"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "销售出库",
          label: "销售出库",
        },
        {
          value: "销售退货入库",
          label: "销售退货入库",
        },
        {
          value: "采购入库",
          label: "采购入库",
        },
        {
          value: "采购退货出库",
          label: "采购退货出库",
        },
        {
          value: "调拨出库",
          label: "调拨出库",
        },
        {
          value: "调拨入库",
          label: "调拨入库",
        },
        {
          value: "盘盈入库",
          label: "盘盈入库",
        },
        {
          value: "盘亏出库",
          label: "盘亏出库",
        },
      ],
      tableData: [],
      //日期
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value: "",
      value1: "",
      value2: "",
      input: "",
      gridData: [],
      dialogTableVisible: false,
    };
  },
  methods: {
    sel: function (event) {
      this.axios
        .get( this.$api+"/api/stockTaking", {
          params: {
            
            TypeName: this.value,
            q: this.value2[0],
            h: this.value2[1],
            ShopBian: this.input,
          },
        })
        .then((response) => {
          this.tableData = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    //显示
    this.axios
      .get( this.$api+"/api/stockTaking")
      .then((response) => {
        this.tableData = response.data;
        console.log("ok");
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
