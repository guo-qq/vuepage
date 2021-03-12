<template>
  <div>
    <div style="float: lift; font-size: 30px">库存盘点单</div>
    <div style="float: right">单据编号:{{ datetime }}</div>
    <br />
    <div>
      <div style="float: left">
        <span class="demonstration">盘点仓库</span>
        <el-cascader
          ref="add"
          v-model="value3"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange()"
        ></el-cascader>
        &nbsp;&nbsp;&nbsp;
      </div>
      <div style="float: left">
        <el-input v-model="inputs" placeholder="盘点标题"></el-input>
        &nbsp;&nbsp;&nbsp;
      </div>
      <div class="block">
        <span class="demonstration">盘点日期</span>
        <el-date-picker v-model="value1" type="date" placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>
    <br />
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
        <el-table-column prop="sTCPractical" label="实际库存">
          <template slot-scope="scope">
            <span
              v-if="
                scope.row.index === tabClickIndex &&
                tabClickLabel === '实际库存'
              "
            >
              <el-input
                v-model="scope.row.sTCPractical"
                maxlength="300"
                placeholder="请输入实际库存"
                size="mini"
                @change="inputBlurs(scope.row)"
              />
            </span>
            <span v-else>{{ scope.row.sTCPractical }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stcYkNum" label="盈亏数量"> </el-table-column>
        <el-table-column prop="stcYkPrice" label="盈亏金额"> </el-table-column>
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
    <br />
    <div style="width: 500px">
      备注
      <el-input v-model="input" placeholder="备注"></el-input>
      &nbsp;&nbsp;&nbsp;
    </div>
    <div style="float: right">
      <el-button type="primary" @click="wan()">盘点完成</el-button>
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
      timer: "",
      tabClickIndex: null, // 点击的单元格
      tabClickLabel: "", // 当前点击的列名
      datetime: "",
      options: [],
      sss: [],
      value1: "",
      input: "",
      m:'',
      tableData: [],
      sTCRemark: "",
      cargoCount: "",
      y: [],
      sTCYkNum: "",
      sTCYkPrice: "",
      inputs: "",
    };
  },

  methods: {
    handleChange() {
      this.timer = new Date().getTime();
      this.m=this.value3[1]
    },
    async wan() {
      var shu = 0;
      var jin = 0;
      var result = true;
      var oo = 0;
      var o = {
        CargoId: "",
        STCPractical: "",
        STCYkNum: "",
        STCYkPrice: "",
        STCRemark: "",
      };
      this.tableData.forEach((items, index) => {
        shu = shu + items.stcYkNum;
        jin = jin + items.stcYkPrice;
        this.sss = items;
        let no = index + 1;
        o.CargoId = items.cargoId;
        o.STCPractical = Number(items.sTCPractical);
        o.STCYkNum = Number(items.stcYkNum);
        o.STCYkPrice = Number(items.stcYkPrice);
        o.STCRemark = items.sTCRemark;
        this.y.push(o);
        oo = oo + 1;
        if (items.sTCPractical == "" || items.sTCPractical == null) {
          console.log(items.sTCPractical);
          result = false;
          alert("实际库存不能为空");
        }
      });
      if (result) {
        console.log(this.y);
        this.axios({
          method: "post",
          url: "http://localhost:50774/api/AddWareCheck",
          data: {
            Sttype: Number(1),
            Stnumber: this.datetime,
            Stwarehouse: String(
              this.$refs["add"].getCheckedNodes()[0].pathLabels[1]
            ),
            Sttitle: this.inputs,
            Stdate: new Date(),
            Stremark: this.input,
            Styknum: Number(shu),
            Stykprice: Number(jin),
            Sttime: new Date(),
            StzdDate: new Date(),
          },
        }).then((res) => {
          this.axios({
            method: "post",
            url: "http://localhost:50774/api/DuoWare",
            data: this.y,
          }).then((res) => {
            this.y = [];
            if (res.status == 200) {
              alert("添加成功");
              location.href = "/CheckShow#/point";
            }
          });
        });
      }
    },

    tabClick(row, column, cell, event) {
      switch (column.label) {
        case "备注":
          this.tabClickIndex = row.index;
          this.tabClickLabel = column.label;
          break;
        case "实际库存":
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

    inputBlurs(row) {
      row.stcYkNum = row.cargoCount - row.sTCPractical;
      row.stcYkPrice = (
        row.sTCPractical * row.cpPrice -
        row.cargoCount * row.unitPice
      ).toFixed(2);
      console.log(row.stcYkNum);
      console.log(row.stcYkPrice);
      this.tabClickIndex = null;
      this.tabClickLabel = "";
    },
    signStatu(item) {
      this.tableData = item;
      console.log(item);
    },
    GetNowtime() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      this.datetime =
        "DB" + year + month + day + Math.floor(Math.random() * 10000);
    },
  },
  mounted() {
    this.GetNowtime();
    //仓库下拉
    this.axios
      .get("http://localhost:50774/api/SelectWare")
      .then((response) => {
        this.options = response.data;
        console.log("ok");
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>