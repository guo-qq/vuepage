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
      <tanAddAllot @signStatuadd="signStatuadds"></tanAddAllot>
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
        <el-table-column prop="cargoPic" label="商品图片" width="120">
        </el-table-column>
        <el-table-column prop="cargoName" label="商品名称" width="120">
        </el-table-column>
        <el-table-column prop="cargoCount" label="账面库存" width="120">
        </el-table-column>
        <el-table-column prop="sTCPractical" label="调拨数量">
          <template slot-scope="scope">
            <span
              v-if="
                scope.row.index === tabClickIndex &&
                tabClickLabel === '调拨数量'
              "
            >
              <el-input
                v-model="scope.row.sTCPractical"
                maxlength="300"
                placeholder="请输入调拨数量"
                size="mini"
                @change="inputBlurs(scope.row)"
              />
            </span>
            <span v-else>{{ scope.row.sTCPractical }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stcYkNum" label="入库剩余"> </el-table-column>
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
import tanAddAllot from "@/components/Inventory/tanAddAllot";
export default {
    components: {
        tanAddAllot: tanAddAllot,
    },
  data() {
    return {
        inputs:'',
        value1:'',
        datetime: '',
        tableData:[],
    };
  },
  mounted() {
      this.Xia();
      this.GetNowtime();
  },
  methods: {
    GetNowtime() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      this.datetime =
        "DC" + year + month + day + Math.floor(Math.random() * 10000);
    },
    Xia() {
      this.axios
        .get("http://localhost:50774/api/SelectWare")
        .then((response) => {
          this.options = response.data;
          this.optionsa=response.data;
          console.log("ok");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>