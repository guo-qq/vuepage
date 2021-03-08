<template>
    <div class="demo-input-size">
        <div>
            <table style="width:100%">
                <tr>
                    <td><span>待审核</span></td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td><span>单据编号:</span>{{SsNumber}}</td>
                </tr>
            </table>
        </div>
        <br>
        <div>
            <table>
                <tr>
                    <td>出库仓库:{{SsWarehouse}}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>客户名称:{{SsClient}}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>经手人:{{SsHandle}}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>业务日期:{{SsYwDate}}</td>
                </tr>
            </table>
        </div>
        <br>
        <div>
            <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
                        <el-table-column prop="cargoId" label="序号"  width="50"></el-table-column>
                        <el-table-column prop="cargoCoding" label="商品编号" width="120"></el-table-column>
                        <el-table-column prop="cargoPic" label="商品图片" width="120"></el-table-column>
                        <el-table-column prop="cargoName" label="商品名称" width="120"></el-table-column>
                        <el-table-column prop="sscNumber" label="数量"  width="100"></el-table-column>
                        <el-table-column prop="unitName" label="单位"  width="100"></el-table-column>
                        <el-table-column prop="unitPice" label="销售单价(元)" width="120"></el-table-column>
                        <el-table-column prop="sscSubtotal" label="小计(元)" width="100"></el-table-column>
                        <el-table-column prop="sscRemark" label="备注" width="100"></el-table-column>
            </el-table>
        </div>
        <br>
        <div>
            <table>
                <tr>
                    <td>折扣率%:{{SsDiscount}}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>折扣金额(元):{{SsZkMoney}}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>附加金额(元):{{SsFjMoney}}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>结算方式:{{SsMode}}</td>
                </tr>
            </table>
        </div>
        <br>
        <div>
            <table>
                <tr>
                    <td>单据备注:{{SsRemark}}</td>
                    <td></td>
                </tr>
                <br>
                <tr>
                    <td>制单人:{{SsDrawer}}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>制单时间:{{SsZdDate}}</td>
                </tr>
                <br>
                <tr>
                    <td><router-link to="/sell"><el-button>返回</el-button></router-link></td>
                    <td></td>
                </tr>
            </table>
                   
        </div>
    </div>
</template>

<script>
  export default {
    data() {
        this.axios.get('http://localhost:50774/api/DifSalesSingle?ssid='+this.$route.query.id).then((res)=>{
                this.SsWarehouse=res.data.ssWarehouse,
                this.SsClient=res.data.ssClient,
                this.SsHandle=res.data.ssHandle,
                this.SsYwDate=res.data.ssYwDate,
                this.SsDiscount=res.data.ssDiscount,
                this.SsZkMoney=res.data.ssZkMoney,
                this.SsFjMoney=res.data.ssFjMoney,
                this.SsMode=res.data.ssMode,
                this.SsRemark=res.data.ssRemark,
                this.SsDrawer=res.data.ssDrawer,
                this.SsZdDate=res.data.ssZdDate,
                this.SsNumber=res.data.ssNumber
         }).then((response)=>{
                this.tableData=response.data;
                console.log(tableData);
         })
        return {
                SsWarehouse:'',
                SsClient: '',
                SsHandle: '',
                SsYwDate: '',
                SsDiscount: '',
                SsZkMoney: '',
                SsFjMoney: '',
                SsMode: '',
                SsRemark: '',
                SsDrawer:'',
                SsZdDate:'',
                SsYwDate: '',   //日期
                SsNumber:'',

                tableData:[], //表格数据
                
      }
      

    },
    methods: {
     
    },
   

  }
</script>