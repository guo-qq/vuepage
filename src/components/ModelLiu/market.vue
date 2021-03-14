<template>
<div>
      <div style="float: right">单据编号:{{ datetime }}</div>
    <div>
     
        <el-form :inline="true" :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="100px" class="demo-form-inline">
          <el-form-item label="出货仓库">
                <el-cascader ref="add" v-model="value3" :options="options" :props="{ expandTrigger: 'hover' }" @change="handleChange()"></el-cascader>
          </el-form-item>
          <el-form-item label="客户">
                <el-input v-model="ruleForm.SsClient"  placeholder="客户名称/编码" style="width: 140px"></el-input>
          </el-form-item>
          <el-form-item label="经手人">
                <el-input v-model="ruleForm.SsHandle"  placeholder="姓名/手机号" style="width: 140px"></el-input>
          </el-form-item>
          <el-form-item>
                <div style="float: right">
                  <goods :key="timer" @signStatus="signStatu" v-bind:id="this.m"></goods>   <!--与子页面名一直,否则没有按钮出现-->
                </div>
                <div>
                  <el-table :data="tableData"  border style="width: 100%" @cell-click="tabClick" prop="re">
                        <el-table-column fixed prop="cargoId" label="序号" width="150"></el-table-column>
                        <el-table-column prop="cargoCoding" label="商品编号" width="120"></el-table-column>
                        <el-table-column prop="cargoName" label="商品名称" width="120"> </el-table-column>
                                <el-table-column prop="SscNumber" label="数量">
                        <template slot-scope="scope">
                          <span
                            v-if="
                              scope.row.index === tabClickIndex &&
                              tabClickLabel === '数量'
                            "
                          >
                            <el-input
                              v-model="scope.row.SscNumber"
                              maxlength="300"
                              placeholder="数量"
                              size="mini"
                              @change="inputBlurs(scope.row)"
                            />
                          </span>
                          <span v-else>{{ scope.row.SscNumber }}</span>
                        </template>
                      </el-table-column>
                        <el-table-column prop="unitName" label="单位" width="120"> </el-table-column>
                        <el-table-column prop="cpprice" label="销售单价(元)" width="120"> </el-table-column>
                  </el-table>
                </div>
          </el-form-item>
          <br>
          <el-form-item label="折扣率">
                <el-input v-model="ruleForm.SsDiscount"  placeholder="折扣率" style="width: 140px"></el-input>
          </el-form-item>
          <el-form-item label="折扣金额(元)">
                <el-input v-model="ruleForm.SsZkMoney"  placeholder="折扣金额" style="width: 140px"></el-input>
          </el-form-item>
          <el-form-item label="附加金额(元)">
                <el-input v-model="ruleForm.SsFjMoney"  style="width: 140px" placeholder="附加金额"> </el-input>
          </el-form-item>
          <el-form-item label="结算方式">
                <el-select v-model="ruleForm.SsMode" placeholder="请选择">
                      <el-option label="现金" value="现金"></el-option>
                      <el-option label="支付宝" value="支付宝"></el-option>
                      <el-option label="微信" value="微信"></el-option>
                      <el-option label="建设银行" value="建设银行"></el-option>
                      <el-option label="工商银行" value="工商银行"></el-option>
              </el-select>
          </el-form-item>
          <br>
          <el-form-item label="单据备注">
                <el-input v-model="ruleForm.SsRemark"  placeholder="单据备注"> </el-input>
          </el-form-item>
          <br>
          <el-form-item >
                <router-link to="/sell"><el-button>返回</el-button></router-link>
                <el-button type="primary" @click="tian()">保存审核</el-button>
          </el-form-item>
    </el-form>
    </div>
</div>
</template>

<script>
      import goods from "@/components/ModelLiu/goods";   //不用再index里面引用/父组件使用子组件
      export default {
        components: {
          goods: goods,
        },
        data() {
          return {
            tabClickIndex: null, // 点击的单元格
            tabClickLabel: "", // 当前点击的列名
              ruleForm: {
                SsClient: '',      //客户
                SsHandle: '',      //经手人
                SsDiscount: '',    //折扣率
                SsZkMoney: '',     //折扣金额
                SsFjMoney: '',     //附加金额
                SsMode: '',        //付款方式
                SsRemark:'',      //单据备注

              },
                SsPrice:'',       //总计金额
                SsSjMoney:'',     //实收金额
                datetime: "",    //销售编号日期
                timer: "",
                m:'',
                SsCount:'',
                 CargoId: "",
                  SscNumber: "",
                  SscRemark: "",
                  SscSubtotal: "",
                  UnitPice: "",
                  options: [],  //存放下拉数据
                  sss: [],
                  tableData: [],
                  y: [],
          };
        },
        methods: {
                //下拉框该变函数
              handleChange() {
                  this.timer = new Date().getTime();
                  this.m=this.value3[1]
              },
             async tian() {
               var data1 = JSON.parse(localStorage.getItem('hou'));
               var name=data1.UserName;
                var oo = 0;
                var o = {
                  CargoId: "",
                  SscNumber: "",
                  SscRemark: "",
                  SscSubtotal: "",
                  UnitPice: "",
                  QfjCgH:''
                };
                this.tableData.forEach((items, index) => {
                  this.SsCount=this.SsCount+=Number(items.SscNumber);   //总数量=数量+数量
                  this.SscSubtotal=this.SscSubtotal+= Number(items.sscNumber*items.cpprice) ;  //小计
                  this.SsPrice=Number(items.SscNumber*items.cpprice) ;  //总价格
                  this.SsSjMoney=Number(items.SscNumber*items.cpprice-this.ruleForm.SsZkMoney);
                  this.sss = items;
                  let no = index + 1;
                  o.CargoId = Number(items.cargoId);
                  o.SscNumber=Number(items.SscNumber) ;
                  o.SscRemark=items.SscRemark;
                  o.SscSubtotal = Number(items.SscNumber*items.cpprice);
                  o.UnitPice=Number(items.unitPice);
                  o.QfjCgH=Number(1)
                  this.y.push(o);
                   oo = oo + 1;
                });
                console.log(this.y);
              console.log(this.tableData);
              this.axios.post(this.$api+"/api/AddSalesSingles",{
                    //给销售表数据添加
                    SsNumber:this.datetime,   //单据编号
                    SsCount:Number(this.SsCount),     //商品总数量
                    SsPrice: Number(this.SsPrice), //总价格
                    SsSjMoney: Number(this.SsSjMoney), //实收金额
                    SsRemark:this.ruleForm.SsRemark,   //总备注
                    SsWarehouse: String(this.$refs["add"].getCheckedNodes()[0].pathLabels[1]),   //仓库
                    SsClient:this.ruleForm.SsClient,    //客户
                    SsHandle:this.ruleForm.SsHandle,   //经手人
                    SsDrawer:name,    //制单人
                    SsMode:this.ruleForm.SsMode,   //结算方式
                    SsFjMoney:Number(this.ruleForm.SsFjMoney),  //附加金额
                    SsZkMoney:Number(this.ruleForm.SsZkMoney),   //折扣金额
                    SsDiscount:Number(this.ruleForm.SsDiscount),   //折扣率
                    ASWId:Number(1),    //店面外键
                    SsAudit:Number(0),   //审核状态
                    QfjCg:Number(1),     //区分键
                    Tui:Number(1),       //增/退区分键
              }).then((res) => {
                if(this.y==null){
                    alert("未选择商品");
                }
                 this.axios({
                  method: "post",
                  url: this.$api+"/api/AddSalesSingleCargo",
                  data:this.y,
                }).then((res) => {
                  this.y = [];
                  if (res.data > 0) {
                    this.$notify({
                        title:'温馨提示:',
                        message:'添加成功',
                    })
                    this.$router.push('/sell');
                  }else{
                     this.$notify({
                        title:'温馨提示:',
                        message:'添加失败',
                    })
                  }
                });
              });
          },
          tableRowClassName({ row, rowIndex }) {
            // 把每一行的索引放进row
            row.index = rowIndex;
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
              "PO" + year + month + day + Math.floor(Math.random() * 10000);
          },
            tabClick(row, column, cell, event) {
      switch (column.label) {
        case "数量":
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
        mounted() {
          this.GetNowtime();
          //仓库下拉
          this.axios
            .get(this.$api+"/api/SelectWare")
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