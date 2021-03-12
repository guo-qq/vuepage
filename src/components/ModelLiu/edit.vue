<!--审核页面-->
<template>
    <div class="demo-input-size">
        <div>
            <table style="width:100%">
                <tr>
                    <td>
                        <span v-if="SsAudit==0">待审核</span>
                        <span v-if="SsAudit==1">已审核</span>
                    </td>
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
             <table>
                <tr>
                    <td>商品序号:{{CargoId}}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>商品编号:{{CargoCoding}}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>商品名称:{{CargoName}}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>商品数量:{{SscNumber}}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>商品单位:{{UnitName}}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>销售单价:{{UnitPice}}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>小计:{{SscSubtotal}}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>商品备注:{{SScRemark}}</td>
                </tr>
            </table>
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
                    <td><router-link to="/sell"><el-button>返回</el-button></router-link></td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td> <el-button type="success" @click="pass()">审核通过</el-button>&nbsp;&nbsp;&nbsp;<el-button type="danger" @click="notpass()">审核不通过</el-button></td>
                </tr>
            </table>
                   
        </div>
    </div>
</template>

<script>
  export default {
    data() {
        this.axios.get('http://localhost:50774/api/DifSalesSingle?ssid='+this.$route.query.id).then((res)=>{
                this.ID=this.$route.query.id,
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
                this.SsNumber=res.data.ssNumber,
                this.CargoId=res.data.cargoId,
                this.CargoCoding=res.data.cargoCoding,
                this.CargoName=res.data.cargoName,
                this.SscNumber=res.data.sscNumber,
                this.UnitName=res.data.unitName,
                this.UnitPice=res.data.unitPice,
                this.SscSubtotal=res.data.sscSubtotal,
                this.SScRemark=res.data.sscRemark,
                this.SsAudit=res.data.ssAudit
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
                CargoId:'',
                CargoCoding:'',
                CargoName:'',
                SscNumber:'',
                UnitName:'',
                UnitPice:'',
                SscSubtotal:'',
                SScRemark:'',
                SsAudit:'',

                yespass:'1',   //通过
                nopass:'0',  //不
                ID:'',
      }
      

    },
    methods: {
        pass(){  //审核成功
            this.axios.post("http://localhost:50774/api/UpdSsAudit/"+this.ID+"/"+this.yespass)
                .then((res)=>{
                    if(res.data>0){
                        alert("修改成功");
                        
                    }else{
                        alert("修改失败");
                    }
                })
        },
        notpass(){
            this.axios.post("http://localhost:50774/api/UpdSsAudit/"+this.ID+"/"+this.nopass)
                .then((res)=>{
                    if(res.data>0){
                        alert("修改成功");
                        this.$.router.push("/sell")
                    }else{
                        alert("修改失败");
                    }
                })
        },
    },
   

  }
</script>