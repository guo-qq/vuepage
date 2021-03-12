<template>
  <div>
    <div style="float: lift; font-size: 30px">库存借出</div>
    <div style="float: right">单据编号:{{ datetime }}</div>
    <br />
    <div style="float: left">
      <span class="demonstration">出库仓库</span>
      <el-cascader
        ref="qqq"
        v-model="value3"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange()"
      ></el-cascader>
      &nbsp;&nbsp;&nbsp;
    </div>
    <div style="float: left">
      <el-select v-model="value" placeholder="请选择" @change="changeLocationValue">
        <el-option
          v-for="item in optiones"
          :key="item.clientSid"
          ref="selection"
          :label="item.clientSname"
          :value="item.clientSid"
        >
        </el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;
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
      <choiceshoop :key="timer" v-bind:id="this.m" @signStatus="signStatu"></choiceshoop>
    </div>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @cell-click="tabClick"
        prop="re"
      >
        <el-table-column fixed prop="cargoId" label="序号"> </el-table-column>
        <el-table-column prop="cargoCoding" label="商品编号"> </el-table-column>
        <el-table-column prop="cargoName" label="商品名称"> </el-table-column>
        <el-table-column prop="cargoCount" label="可用库存数">
        </el-table-column>
        <el-table-column prop="clbNumber" label="借出数量">
          <template slot-scope="scope">
            <span
              v-if="
                scope.row.index === tabClickIndex &&
                tabClickLabel === '借出数量'
              "
            >
              <el-input
                v-model="scope.row.clbNumber"
                maxlength="300"
                placeholder="请输入借出数量"
                size="mini"
                @change="inputBlurs(scope.row)"
              />
            </span>
            <span v-else>{{ scope.row.clbNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="clbRemark" label="备注">
          <template slot-scope="scope">
            <span
              v-if="
                scope.row.index === tabClickIndex && tabClickLabel === '备注'
              "
            >
              <el-input
                v-model="scope.row.clbRemark"
                maxlength="300"
                placeholder="请输入备注"
                size="mini"
                @blur="inputBlur"
              />
            </span>
            <span v-else>{{ scope.row.clbRemark }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />
    <br />
    <div class="block" style="float: left">
      <span class="demonstration">归还日期</span>
      <el-date-picker v-model="value2" type="date" placeholder="选择日期">
      </el-date-picker>
      &nbsp;&nbsp;&nbsp;
    </div>
    <div style="width: 500px; float: left">
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
      value3: "",
      tabClickIndex: null, // 点击的单元格
      tabClickLabel: "", // 当前点击的列名
      datetime: "",
      inputs: "",
      value1: "",
      value2: "",
      m:'',
      value: "",
      optiones: [],
      options: [],
      tableData: [],
      input: "",
      y: [],
      ss:''
    };
  },
  mounted() {
    this.Xia();
    this.GetNowtime();
    this.GetKeHu();
  },
  methods: {
    handleChange() {
      this.timer = new Date().getTime();
      this.m = this.value3[1];
    },
    GetKeHu() {
      this.axios
        .get( this.$api+"/api/clientShow")
        .then((res) => {
          this.optiones = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    signStatu(item) {
      this.tableData = item;
      console.log(item);
    },
    changeLocationValue(val)
    {
      let obj={};
      obj=this.optiones.find((item)=>{
        return item.clientSid===val;
      })
      this.ss=obj.clientSname;
    },
    async wan() {
      var result = true;
      var o = {
        CargoId: "",
        CLBNumber: "",
        CLBRemark: "",
        CLBQfj:'',
      };
      this.tableData.forEach((items, index) => {
        o.CargoId = Number(items.cargoId);
        o.CLBNumber = Number(items.clbNumber);
        o.CLBRemark = items.clbRemark;
        o.CLBQfj=Number(1);
        this.y.push(o);
        if (items.clbNumber == "" || items.clbNumber == null) {
          console.log(items.clbNumber);
          result = false;
          alert("借出数量不能为空");
        }
        if(items.clbNumber>items.cargoCount){
            result = false;
          alert("借出数量超过库存数");
        }
      });



      if (result) {
        this.axios({
          method: "post",
          url:  this.$api+"/api/AddKu",
          data: {
            LBWarehouse: String(
              this.$refs["qqq"].getCheckedNodes()[0].pathLabels[1]
            ),
            
            LBClient: this.ss,
            LBHandle: this.inputs,
            LBYwDate: this.value1,
            LBGhDate: this.value2,
            LBRemark: this.input,
            LBNumber: this.datetime,
            LBQfj:Number(1)
          },
        }).then((res) => {
          this.axios({
            method: "post",
            url:  this.$api+"/api/AddCbl",
            data: this.y,
          }).then((res) => {
            this.y = [];
            if (res.status == 200) {
              alert("添加成功");
              location.href = "/CheckShow#/lend";
            }
          });
        });
      }
    },
    Xia() {
      this.axios
        .get( this.$api+"/api/SelectWare")
        .then((response) => {
          this.options = response.data;
          this.optionsa = response.data;
          console.log("ok");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    GetNowtime() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      this.datetime =
        "JC" + year + month + day + Math.floor(Math.random() * 10000);
    },
    inputBlurs(row) {
      this.tabClickIndex = null;
      this.tabClickLabel = "";
    },
    tabClick(row, column, cell, event) {
      switch (column.label) {
        case "借出数量":
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
  },
};
</script>