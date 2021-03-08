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
        @change="handleChange"
      ></el-cascader>
      &nbsp;&nbsp;&nbsp;
    </div>
    <div style="float: left">
      <el-select v-model="value" placeholder="请选择客户">
        <el-option
          v-for="item in optiones"
          :key="item.clientSid"
          :label="item.clientSname"
          :value="item.clientSid"
        >
        </el-option>
      </el-select>
    </div>
    <div style="float: left">
      <el-input v-model="input" placeholder="请输入经手人"></el-input>
    </div>
    <div style="float: left">
      <span class="demonstration">业务时间</span>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期">
      </el-date-picker>
    </div>
    <br />
    <div style="float: right">
      <choiceshoop @signStatus="signStatu"></choiceshoop>
    </div>
    <div style="float: left">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @cell-click="tabClick"
        prop="re"
      >
        <el-table-column prop="cargoId" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="cargoCoding" label="商品编号" width="180">
        </el-table-column>
        <el-table-column prop="cargoName" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="cargoCount" label="可用库存数量" width="180">
        </el-table-column>
        <el-table-column prop="cLBNumber" label="借出数量" width="180">
          <template slot-scope="scope">
            <span
              v-if="
                scope.row.index === tabClickIndex &&
                tabClickLabel === '借出数量'
              "
            >
              <el-input
                v-model="scope.row.cLBNumber"
                maxlength="300"
                placeholder="请输入借出数量"
                size="mini"
                @change="inputBlur"
              />
            </span>
            <span v-else>{{ scope.row.cLBNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cLBRemark" label="备注" width="180">
          <template slot-scope="scope">
            <span
              v-if="
                scope.row.index === tabClickIndex && tabClickLabel === '备注'
              "
            >
              <el-input
                v-model="scope.row.cLBRemark"
                maxlength="300"
                placeholder="请输入备注"
                size="mini"
                @blur="inputBlur"
              />
            </span>
            <span v-else>{{ scope.row.cLBRemark }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />
    <div style="width: 500px; float: left">
      <span class="demonstration">预计归还时间</span>
      <el-date-picker v-model="value6" type="date" placeholder="选择日期">
      </el-date-picker>
      &nbsp;&nbsp;&nbsp;
    </div>
    <div style="width: 500px; float: left">
      <el-input v-model="inputs" placeholder="备注"></el-input>
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
      tabClickIndex: null, // 点击的单元格
      tabClickLabel: "", // 当前点击的列名
      datetime: "",
      options: [],
      optiones: [],
      value: "",
      value3:'',
      input: "",
      tableData: [],
      value6: "",
      inputs: "",
      value1: "",
      zlist: [],
    };
  },
  tableRowClassName({ row, rowIndex }) {
    // 把每一行的索引放进row
    row.index = rowIndex;
  },
  signStatu(item) {
    this.tableData = item;

    console.log(item);
  },
  methods: {
    inputBlur(row) {
      this.tabClickIndex = null;
      this.tabClickLabel = "";
    },
    wan() {
      var list = {
        CLBNumber: "",
        CargoId: "",
        CLBRemark: "",
      };
      this.tableData.forEach((items, index) => {
        list.CLBNumber =Number(items.cLBNumber);
        list.CargoId = Number(items.cargoId);
        list.CLBRemark = items.cLBRemark;
        this.zlist.push(list);
      }),
        this.axios({
          methods: "post",
          URL: "http://localhost:50774/api/AddKu",
          data: {
            Lbwarehouse: this.value3,
            Lbclient: this.value,
            Lbhandle: this.input,
            LbywDate: this.value1,
            LbghDate: this.value6,
            Lbremark: this.inputs,
            Lbnumber: this.datetime,
            Lbstate: 0,
          },
        }).then((res) => {
          this.axios({
            methods: "post",
            URL: "http://localhost:50774/api/AddKu",
            data: this.zlist,
          }).then((res) => {
            if (res.data > 0) {
              alert("添加成功");
              location.reload();
            }
          });
        });
    },
    GetKeHu() {
      this.axios
        .get("http://localhost:50774/api/clientShow")
        .then((res) => {
          this.optiones = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
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
    GetNowtime() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      this.datetime =
        "JC" + year + month + day + Math.floor(Math.random() * 10000);
    },
    Xia() {
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
  },
  mounted() {
    this.Xia();
    this.GetNowtime();
    this.GetKeHu();
  },
};
</script>