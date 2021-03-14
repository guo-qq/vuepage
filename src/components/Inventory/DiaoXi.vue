<template>
  <div>
    <div style="float: lift; font-size: 30px">库存调拨单</div>

    <span style="float: right">单据编号：{{ this.danju }}</span>

    <div>
      <br />
      <br />
      <br />
      <div>
        调出仓库：{{ cangku }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 调入仓库：{{
          rucangku
        }}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 盘点标题：{{
          biaoti
        }}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 业务日期：{{
          riqi
        }}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 经手人：{{ jingshou }}
      </div>
      <br />
      <br />
      <div>
        <el-table :data="tableData" border style="width: 100%" prop="re">
          <el-table-column fixed prop="cid" label="序号" width="150">
          </el-table-column>
          <el-table-column prop="cbian" label="商品编号" width="120">
          </el-table-column>
          <el-table-column prop="cname" label="商品名称" width="120">
          </el-table-column>
          <el-table-column prop="kucun" label="可用库存"></el-table-column>
          <el-table-column prop="diaocun" label="调拨数量"> </el-table-column>
          <el-table-column prop="sheng" label="剩余库存"></el-table-column>
          <el-table-column prop="bei" label="备注"></el-table-column>
        </el-table>
      </div>
      <br />
      <br />
      <div>
        备注：{{ beizhu }} <br /><br /><br />
        制单日期：{{ this.zhiriqi }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rucangku: "",
      jingshou: "",
      danju: "",
      cangku: "",
      biaoti: "",
      riqi: "",
      tableData: [],
      beizhu: "",
      zhiriqi: "",
    };
  },
  methods: {
    ZShow() {
      this.axios
        .get(this.$api + "/api/RepXiang", {
          params: { id: this.$route.query.id },
        })
        .then((res) => {
          console.log(res);
          (this.danju = res.data.reSerial),
            (this.cangku = res.data.cangkuc),
            (this.rucangku = res.data.cangkur),
            (this.jingshou = res.data.rthandle),
            (this.riqi = res.data.rtywDate),
            (this.beizhu = res.data.reRemark),
            (this.zhiriqi = res.data.rtywDate);
        });
    },

    Xiang() {
      this.axios
        .get(this.$api + "/api/Duoxian?id=" + this.$route.query.id)
        .then((res) => {
          console.log(res);
          this.tableData = res.data;
        });
    },
  },
  created() {
    this.ZShow();
    this.Xiang();
  },
};
</script>