<template>
  <div>
    <div style="float: lift; font-size: 30px">库存盘点单</div>

    <span style="float: right">单据编号：{{ this.danju }}</span>

    <div>
      <br />
      <br />
      <br />
      <div>
        盘点仓库：{{ cangku }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 盘点标题：{{
          biaoti
        }}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 业务日期：{{ riqi }}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <br />
      <br />
      <div>
        <el-table :data="tableData" border style="width: 100%" prop="re">
          <el-table-column fixed prop="cargoId" label="序号" width="150">
          </el-table-column>
          <el-table-column prop="cargoCoding" label="商品编号" width="120">
          </el-table-column>
          <el-table-column prop="cargoName" label="商品名称" width="120">
          </el-table-column>
          <el-table-column
            prop="stcpractical"
            label="实际库存"
          ></el-table-column>
          <el-table-column prop="stcYkNum" label="盈亏数量"> </el-table-column>
          <el-table-column prop="stcYkPrice" label="盈亏金额"></el-table-column>
          <el-table-column prop="sTCRemark" label="备注"></el-table-column>
        </el-table>
      </div>
      <br />
      <br />
      <div>
        备注：{{ beizhu }} <br /><br /><br />
         制单日期：{{zhiriqi}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    (danju = ""),
      (cangku = ""),
      (biaoti =""),
      (riqi = ""),
      (tableData = []),
      (beizhu = ""),
      (zhiriqi = "");
  },
  methods: {
    ZShow() {
      this.axios.get("http://localhost:50774/api/MxPan?id="+this.$route.query.id)
      .then((res)=>{
          console.log(res)
          this.danju = res.data.stnumber,
          this.cangku=res.data.stwarehouse,
          this.biaoti=res.data.sttitle,
          this.riqi=res.data.stdate,
          this.beizhu=res.data.stremark,
          this.zhiriqi=res.data.stzdDate
      })
    },

    Xiang(){
        this.axios.get("http://localhost:50774/api/HuPan?id="+this.$route.query.id)
        .then((res)=>{
          this.tableData=res.data
      })
    }
  },
  created() {
      this.ZShow();
      this.Xiang();
  },
};
</script>