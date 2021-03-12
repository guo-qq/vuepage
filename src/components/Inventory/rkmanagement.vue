<template>
  <div>
    <div>
      <div style="float: left">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div style="float: left">
        <el-input placeholder="请输入内容" v-model="input" style="width: 400px">
        </el-input
        >&nbsp;&nbsp;&nbsp;&nbsp;
      </div>

      <div style="float: left">
        <el-button type="primary" @click="Show()">查询</el-button>
      </div>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="tTime" label="日期"> </el-table-column>
        <el-table-column prop="danju" label="单据"> </el-table-column>
        <el-table-column prop="name" label="客户"> </el-table-column>
        <el-table-column prop="cKu" label="仓库"> </el-table-column>
        <el-table-column prop="number" label="出库量"> </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state == 0">待出库</span>
            <span v-if="scope.row.state == 1">已出库</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)" v-if="scope.row.state == 0"
              >审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "1",
          label: "采购入库",
        },
        {
          value: "2",
          label: "销售退货入库",
        },
        {
          value: "3",
          label: "调拨入库",
        },
      ],
      value: "",
      input: "",
      tableData: [],
    };
  },
  methods: {
    handleClick(row){
        this.$router.push({path:'/XiangC',query:{id:row.cId}});
    },
    Show() {
      this.axios
        .get(
          "http://localhost:50774/api/SelCB?n=" +
            this.input +
            "&ctype=" +
            Number(this.value)
        )
        .then((res) => {
          console.log(res);
          this.tableData = res.data;
        });
    },
  },
  mounted() {
    this.axios
      .get(
        "http://localhost:50774/api/SelCB?n=" +
          this.input +
          "&ctype=" +
          Number(1)
      )
      .then((res) => {
        console.log(res);
        this.tableData = res.data;
      });
  },
};
</script>