<template>
  <div class="stype">
    <div style="width: 100%">
      <el-select
        v-model="value1"
        clearable
        placeholder="请选择"
        style="margin-left: 20px"
      >
        <el-option label="销售出库" value="1"></el-option>
        <el-option label="调拨出库" value="3"></el-option>
        <el-option label="采购退货出库" value="2"></el-option>
      </el-select>
      <el-input
        placeholder="请输入调拨单号 不区分大小写"
        v-model="input3"
        style="width: 300px; margin-left: 20px"
      >
      </el-input>
    </div>
    <el-table
      :data="
        tableData
          .filter((data) =>
            data.d_OddNumber.toLowerCase().includes('ck'.toLowerCase())
          )
          .filter(
            (data) =>
              !input3 ||
              data.d_OddNumber.toLowerCase().includes(input3.toLowerCase())
          )
          .filter((data) => !value1 || data.d_OutWarehouseType == value1)
          .filter((data) => !value || data.d_CheckState == value)
          .slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      border
      style="width: 100%; height: 100%; margin-top: 20px"
    >
      <el-table-column fixed prop="tTime" label="提交时间"> </el-table-column>
      <el-table-column prop="danju" label="单据编号"> </el-table-column>
      <el-table-column prop="name" label="客户名称"> </el-table-column>
      <el-table-column prop="cType" label="出库类型"> </el-table-column>
      <el-table-column prop="cKu" label="出库仓库"> </el-table-column>
      <el-table-column prop="number" label="出库数量"> </el-table-column>
      <el-table-column prop="state" label="出库状态"> 
        <template scope="scope">
            <span v-if="scope.row.state == 0">待出库</span>
            <span v-if="scope.row.state == 1">已出库</span>
          </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="170">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.state == '0'"
            type="text"
            size="small"
          >
            审核
          </el-button>
          <el-button
            @click="handleClickDetails(scope.row)"
            type="text"
            size="small"
            >查看</el-button
          >
          <el-button
            @click="handleClickUpdate(scope.row)"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button
            @click="handleClickDelet(scope.row)"
            type="text"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="
        tableData
          .filter(
            (data) =>
              !input3 ||
              data.d_OddNumber.toLowerCase().includes(input3.toLowerCase())
          )
          .filter((data) => !value1 || data.d_MoveInOutState == value1)
          .filter((data) => !value || data.state == value).length
      "
      style="text-align: center"
    >
    </el-pagination>
  </div>
</template>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.stype {
  margin-top: 50px;
  margin-left: 50px;
  width: 723%;
}
</style>>

<script>
export default {
  name: "ShowDatal",
  data() {
    var _this = this;
    this.$http
      .get(
        "http://localhost:50774/api/SelCB"
      )
      .then(function (data) {
        _this.tableData = data.data.result.items;
        console.log(data.data.result.items);
      });
    return {
      tableData: [],
      value: "",
      value1: "",
      input3: "",
      fontcolor: "",
      currentPage: 1, //初始页
      pagesize: 10, //每页的数据
      userList: [],
    };
  },
  methods: {
    handleSizeChange(size) {
      this.pagesize = size;
      console.log(`每页 ${size} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    CheckStateToChinese(row, column) {
      if (row.state == 0) {
        return "待审核";
      }
      if (row.state == 1) {
        return "审核失败";
      }
      if (row.state == 2) {
        return "审核成功";
      }
    },
    //真删除
    handleClickDelet(row) {
      this.$http
        .delete(
          "http://localhost:21021/api/services/app/InventoryBusinessDictionaryService/DeleteAsycn",
          { params: { Id: row.id } }
        )
        .then(function (data) {
          if (data.status == 200) {
            alert("删除成功");
          }
        });
    },
    handleClickDetails(row) {
      this.$router.push({
        path: "/OutWarehouseDetails",
        query: { id: row.id, oddnum: row.d_OddNumber },
      });
    },

  },
};
</script>