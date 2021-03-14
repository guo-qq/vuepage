<template>
  <div>
    <!-- 添加 -->
    <div>
      <el-button type="primary" plain>新增</el-button>
    </div>
    <br>
    <!-- 收支类型 -->
    <div style="float: left">
      <span>收支类型</span>
      <el-radio v-model="radio" label="1">其他收入</el-radio>
      <el-radio v-model="radio" label="2">其他收支</el-radio>
    </div>
    
    <!-- 创建时间 -->
    <div style="float: left">
      <div class="block">
        <span class="demonstration">&nbsp; &nbsp; &nbsp;默认</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
    </div>
    
    <!-- 搜索框 -->
    <div style="float: left"> 
      <el-input placeholder="请输入费用单号" v-model="input" clearable> </el-input>
    </div>
    <!-- 表单 -->
    <div>
      <el-table :data="tabledatas" border>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <el-input
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.opcreateDate"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.opcreateDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="费用单号">
          <template slot-scope="scope">
            <el-input
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.opbills"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.opbills }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收支类型" width="130px">
          <template slot-scope="scope">
            <el-select
              size="mini"
              v-model="scope.row.opbudget1"
              @change="display"
              :disabled="!scope.row.show"
            >
              <el-option
                v-for="item in displayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="金额(元)">
          <template slot-scope="scope">
            <el-input
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.opmoney"
            >
            
            </el-input>
            <span
              v-show="!scope.row.show"
              v-if="scope.row.opbudget1 == '其他收入'"
              style="color: green"
              >+{{ scope.row.opmoney}}</span
            >
            <span
              v-show="!scope.row.show"
              v-if="scope.row.opbudget1 == '其他收支'"
              style="color: red"
              >-{{ scope.row.opmoney }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="收支方式" width="130px">
          <template slot-scope="scope">
            <el-select
              size="mini"
              v-model="scope.row.opmode"
              @change="display"
              :disabled="!scope.row.show"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-input
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.opremark"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.opremark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="270px">
          <template slot-scope="scope">
            <el-button @click="scope.row.show = true">编辑</el-button>
            <el-button
              @click="
                Baocun(scope.row);
                scope.row.show = false;
              "
              >保存</el-button
            >
            <el-button    @click.native.prevent="deleteRow(scope.$index, tabledatas)">删除</el-button>
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
      radio: "1",
      value1: "",
      tabledatas: [],

      value: "",
      tableLoading: false,

      //是否显示(可以由后台返回)
      displayOptions: [
        {
          value: "1",
          label: "其他收入",
        },
        {
          value: "2",
          label: "其他收支",
        },
      ],
      options: [
        {
          value: "现金",
          label: "现金",
        },
        {
          value: "支付宝",
          label: "支付宝",
        },
        {
          value: "微信",
          label: "微信",
        },
        {
          value: "建设银行",
          label: "建设银行",
        },
        {
          value: "工商银行",
          label: "工商银行",
        },
      ],
    };
  },
  created() {},
  methods: {
    //是否显示选中的值
    display(value, i) {
      alert(value);
      alert(i);
    },
    Show() {
      this.axios
        .get(this.$api+"/api/otherPayments")
        .then((response) => {
          this.tabledatas = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    Baocun(val) {
      this.axios({
        method: "post",
        url: this.$api+"/api/uptotherPayments",
        data: {
          Opid: Number(val.opid),
          OpcreateDate: val.opcreateDate,
          Opbills: val.opbills,
          OpcostType: val.opcostType,
          Opmoney: Number(val.opmoney),
          Opremark: val.opremark,
          Opbudget: Number(val.opbudget),
          Opmode: val.opmode,
          OpreceiptDate: val.opreceiptDate,
        },
      }).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      });
    },
    Delete(val) {     
      this.axios.get(this.$api+"/api/DeltotherPayments?id="+val)
      .then((val1) => {
    
          this.$message({
            message: "删除成功",
            type: "success",
          });
   
       
      })
      .catch(function(error){
        console.log(error);
      });
      
    },
     deleteRow(index, rows) {
        this.$confirm('是否删除该文件', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            rows.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
      }
  },
  mounted() {
    this.Show();
  },
};
</script>
<style>
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
.el-table th {
  background-color: #f4f4f4;
  color: #555;
}
</style>