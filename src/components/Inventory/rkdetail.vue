<template>
  <div>
    <div style="float: left">
      入库类型
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div style="float: left" class="block">
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span class="demonstration">业务日期</span>
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div>
    <div style="float: left">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
    <div style="float: left">
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" @click="sel()">搜索</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="tTime" label="提交时间"> </el-table-column>
        <el-table-column prop="danju" label="单据编号"> </el-table-column>
        <el-table-column prop="name" label="客户名称"> </el-table-column>
        <el-table-column prop="cType" label="入库类型">
          <template scope="scope">
            <span v-if="scope.row.cType == 1">采购入库</span>
            <span v-if="scope.row.cType == 2">销售退货入库</span>
            <span v-if="scope.row.cType == 3">调拨入库</span>
          </template>
        </el-table-column>
        <el-table-column prop="cKu" label="入库仓库"> </el-table-column>
        <el-table-column prop="number" label="实际入库"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >详情</el-button
            >
            <el-button type="text" size="small" @click="Del(scope.row)"
              >删除</el-button
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
      value1: "",
      input: "",
      tableData: [],
    };
  },
  methods: {
    handleClick(row)
    {
       this.$router.push({path:'/rXiang',query:{id:row.cId}});
    },
    Del(row) {
      this.axios
        .post( this.$api+"/api/Del?id="+row.cId)
        .then((res) => {
          location.reload();
        });
    },
    sel() {
      this.axios
        .get( this.$api+"/api/XiangSelBr", {
          params: {
            n: this.input,
            ctype: Number(this.value),
            q: this.value1[0],
            h: this.value1[1],
          },
        })
        .then((res) => {
          this.tableData = res.data;
        });
    },
    Show() {
      this.axios
        .get( this.$api+"/api/XiangSelBr", {
          params: {
            n: this.input,
            ctype: Number(1),
            q: this.value1[0],
            h: this.value1[1],
          },
        })
        .then((res) => {
          this.tableData = res.data;
        });
    },
  },
  mounted() {
    this.Show();
  },
};
</script>