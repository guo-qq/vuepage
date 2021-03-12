<template>
  <div>
    <div style="float: lift; font-size: 30px">库存调拨</div>
    <div style="float: right">单据编号:{{ datetime }}</div>
    <div style="float: left">
      <span class="demonstration">出库仓库</span>
      <el-cascader
        v-model="value3"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange()"
      ></el-cascader>
      &nbsp;&nbsp;&nbsp;
    </div>

    <div>
      <div style="float: left">
        <span class="demonstration">入库仓库</span>
        <el-cascader
          v-model="value4"
          :options="optionsa"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        ></el-cascader>
        &nbsp;&nbsp;&nbsp;
      </div>
    </div>

    <div style="float: left">
      <el-input v-model="inputs" placeholder="经手人"></el-input>
      &nbsp;&nbsp;&nbsp;
    </div>

    <div class="block">
      <span class="demonstration">业务日期</span>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期">
      </el-date-picker>
    </div>
    <div style="float: right">
      <choiceshoop
       :key="timer"
        @signStatus="signStatu"
        v-bind:id="this.m"
      ></choiceshoop>
    </div>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @cell-click="tabClick"
        prop="re"
      >
        <el-table-column fixed prop="cargoId" label="序号" width="150">
        </el-table-column>
        <el-table-column prop="cargoCoding" label="商品编号" width="120">
        </el-table-column>
        <el-table-column prop="cargoName" label="商品名称" width="120">
        </el-table-column>
        <el-table-column prop="cargoCount" label="账面库存" width="120">
        </el-table-column>
        <el-table-column prop="aCCount" label="调拨数量">
          <template slot-scope="scope">
            <span
              v-if="
                scope.row.index === tabClickIndex &&
                tabClickLabel === '调拨数量'
              "
            >
              <el-input
                v-model="scope.row.aCCount"
                maxlength="300"
                placeholder="请输入调拨数量"
                size="mini"
                @change="inputBlurs(scope.row)"
              />
            </span>
            <span v-else>{{ scope.row.aCCount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sheng" label="剩余库存"> </el-table-column>
        <el-table-column prop="sTCRemark" label="备注">
          <template slot-scope="scope">
            <span
              v-if="
                scope.row.index === tabClickIndex && tabClickLabel === '备注'
              "
            >
              <el-input
                v-model="scope.row.sTCRemark"
                maxlength="300"
                placeholder="请输入备注"
                size="mini"
                @blur="inputBlur"
              />
            </span>
            <span v-else>{{ scope.row.sTCRemark }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="width: 500px">
      备注
      <el-input v-model="input" placeholder="备注"></el-input>
      &nbsp;&nbsp;&nbsp;
    </div>
    <div style="float: right">
      <el-button type="primary" @click="wan()">提交</el-button>
    </div>
  </div>
</template>
<script>
import choiceshoop from "@/components/Inventory/choiceshoop";
export default {
  components: {
    choiceshoop: choiceshoop,
  },
  data() {
    return {
      inputs: "",
      value1: "",
      options: [],
      input: "",
      m: "",
      value3: "",
      value4: "",
      datetime: "",
      aCCount: "",
      tableData: [],
      tabClickIndex: null, // 点击的单元格
      tabClickLabel: "", // 当前点击的列名
      sheng: "",
      y: [],
      sTCRemark: "",
    };
  },
  mounted() {
    this.Xia();
    this.GetNowtime();
  },
  methods: {
    handleChange() {
      this.timer = new Date().getTime();
      this.m = this.value3[1];
    },
    async wan() {
      var result = true;
      var zong = 0;
      var o = {
        CargoId: "",
        ACCount: "",
        ACRemark: "",
        sheng: "",
      };
      console.log(this.tableData);
      this.tableData.forEach((items, index) => {
        o.CargoId = Number(items.cargoId);
        let no = index + 1;
        o.ACCount = Number(items.aCCount);
        o.ACRemark = items.sTCRemark;
        o.sheng = Number(items.sheng);
        zong = zong + items.aCCount;
        this.y.push(o);
        if (items.aCCount == "" || items.aCCount == null) {
          result = false;
          alert("调拨数量不能为空");
        }
      });
      if (result) {
        console.log(this.y);
        this.axios({
          method: "post",
          url: "http://localhost:50774/api/AddAllot",
          data: {
            RTDcWarehouse: Number(this.value3[1]),
            RTDrWarehouse: Number(this.value4[1]),
            RTHandle: this.inputs,
            RTYwDate: this.value1,
            RTCount: Number(zong),
            ReRemark: this.input,
            ReStat: Number(0),
            ReSerial: this.datetime,
          },
        }).then((res) => {
          this.axios({
            method: "post",
            url: "http://localhost:50774/api/addDuoAllot",
            data: this.y,
          }).then((res) => {
            this.y = [];
            if (res.status == 200) {
              alert("添加成功");
              location.href = "/CheckShow#/TiaoBo";
            }
          });
        });
      }
    },
    GetNowtime() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      this.datetime =
        "RT" + year + month + day + Math.floor(Math.random() * 10000);
    },
    inputBlurs(row) {
      row.sheng = row.cargoCount - row.aCCount;
      this.tabClickIndex = null;
      this.tabClickLabel = "";
    },
    signStatu(item) {
      this.tableData = item;
      console.log(item);
    },
    tabClick(row, column, cell, event) {
      switch (column.label) {
        case "调拨数量":
          this.tabClickIndex = row.index;
          this.tabClickLabel = column.label;
          break;
        case "备注":
          this.tabClickIndex = row.index;
          this.tabClickLabel = column.label;
          break;
        default:
          return;
      }
    },
    inputBlur(row) {
      this.tabClickIndex = null;
      this.tabClickLabel = "";
    },
    Xia() {
      this.axios
        .get("http://localhost:50774/api/SelectWare")
        .then((response) => {
          this.options = response.data;
          this.optionsa = response.data;
          console.log("ok");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>