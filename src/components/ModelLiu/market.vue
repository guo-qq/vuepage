
<template>
  <div class="demo-input-size">
    <div>
      <table style="width: 100%">
        <tr>
          <td><h1>销售单</h1></td>
        </tr>
      </table>
    </div>
    <div>
      <el-form
        :inline="true"
        :model="form"
        :rules="rules"
        ref="form"
        class="demo-form-inline"
      >
        <el-form-item label="出库仓库:">
          <el-select v-model="form.SsWarehouse" placeholder="请选择">
            <el-option label="请选择" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户:">
          <el-input
            v-model="form.SsClient"
            placeholder="客户名称/编码"
            style="width: 140px"
          ></el-input>
        </el-form-item>
        <el-form-item label="经手人">
          <el-input
            v-model="form.SsHandle"
            placeholder="姓名/手机号"
            style="width: 140px"
          ></el-input>
        </el-form-item>
        <el-form-item label="业务日期">
          <el-date-picker
            v-model="SsYwDate"
            type="date"
            placeholder="请选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <br />
        <!-- <el-table
                        :data="tableData"
                        border
                        show-summary
                        style="width: 100%">
                        <el-table-column
                        prop="id"
                        label="序号"
                        width="50">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="商品编号"
                            width="120">
                        </el-table-column>
                        <el-table-column
                        prop="amount1"
                        sortable
                        label="商品图片"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="amount2"
                        sortable
                        label="商品名称"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="amount3"
                        sortable
                        label="商品规格"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="id"
                        label="数量"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="id"
                        label="单位"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="id"
                        label="销售单价(元)"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="id"
                        label="小计(元)"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="id"
                        label="备注"
                        width="80">
                        </el-table-column>
                    </el-table>
                    <br> -->
        <el-form-item label="折扣率%">
          <el-input v-model="form.SsDiscount" style="width: 140px"></el-input>
        </el-form-item>
        <el-form-item label="折扣金额(元)">
          <el-input v-model="form.SsZkMoney" style="width: 140px"></el-input>
        </el-form-item>
        <el-form-item label="附加金额(元)">
          <el-input v-model="form.SsFjMoney" style="width: 140px"></el-input>
        </el-form-item>
        <el-form-item label="结算方式">
          <el-select v-model="form.SsMode" placeholder="请选择">
            <el-option label="现金" value="现金"></el-option>
            <el-option label="支付宝" value="支付宝"></el-option>
            <el-option label="微信" value="微信"></el-option>
            <el-option label="建设银行" value="建设银行"></el-option>
            <el-option label="工商银行" value="工商银行"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="单据备注">
          <el-input v-model="form.SsRemark"></el-input>
        </el-form-item>
        <el-form-item label="总计金额￥">
          <el-input v-model="form.SsPrice" style="width: 140px"></el-input>
        </el-form-item>
        <el-form-item label="实收金额￥">
          <el-input v-model="form.SsSjMoney" style="width: 140px"></el-input>
        </el-form-item>
        <br />
        <el-form-item>
          <router-link to="/sell"><el-button>返回</el-button></router-link>
          <el-button @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
let id = 0;
export default {
  data() {
    return {
      form: {
        SsWarehouse: "",
        SsClient: "",
        SsHandle: "",
        SsYwDate: "",
        SsDiscount: "",
        SsZkMoney: "",
        SsFjMoney: "",
        SsMode: "",
        SsRemark: "",
        SsPrice: "",
        SsSjMoney: "",
      },
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 }).map((item) => ({
              value: ++id,
              label: `选项${id}`,
              leaf: level >= 2,
            }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes);
          }, 1000);
        },
      },

      SsYwDate: "", //日期
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post("http://localhost:50774/api/AddSalesSingles", {
              SsWarehouse: this.formInline.SsWarehouse,
              SsClient: this.formInline.SsClient,
              SsHandle: this.formInline.SsHandle,
              SsYwDate: this.formInline.SsYwDate,
              SsDiscount: Number(this.formInline.SsDiscount),
              SsZkMoney: Number(this.formInline.SsZkMoney),
              SsFjMoney: Number(this.formInline.SsFjMoney),
              SsMode: this.formInline.SsMode,
              SsRemark: this.formInline.SsRemark,
              SsPrice: Number(this.formInline.SsPrice),
              SsSjMoney: Number(this.formInline.SsSjMoney),
              QfjCg:Number(1),
              Tui:Number(1)
            })
            .then(function (response) {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>