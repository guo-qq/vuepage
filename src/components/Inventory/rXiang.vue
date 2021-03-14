<template>
  <div>
    <div style="float: lift; font-size: 30px">出库单</div>

    <span style="float: right">单据编号：{{ this.danju }}</span>

    <div>
      <br />
      <br />
      <br />
      <div>
        调出仓库：{{ cangku }} 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 客户：{{
          kehu
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
          <el-table-column fixed prop="cargoId" label="序号" >
          </el-table-column>
          <el-table-column prop="cargoCoding" label="商品编号" >
          </el-table-column>
          <el-table-column prop="cargoName" label="商品名称" >
          </el-table-column>
          <el-table-column prop="cukus" label="出库数量"></el-table-column>
          <el-table-column prop="beizhu" label="备注"></el-table-column>
        </el-table>
      </div>
      <br />
      <br />
      <div>
        备注：{{ this.beizhu }} <br /><br /><br />
        制单日期：{{ this.zhiriqi }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return{
      rucangku : "",
      jingshou : "",
      danju : "",
      cangku : "",
      biaoti : "",
      kehu:'',
      riqi : "",
      tableData : [],
      beizhu : "",
      zhiriqi : ""
    }
  },
  methods: {
    UptC(){
        this.axios
        .post( this.$api+"/api/UpGai?id=" + this.$route.query.id)
        .then((res) => {
          if(res.data>0)
          {
            this.$router.go(-1);
          }
        });
    },
    fan()
    {
      this.$router.go(-1);
    },
    ZShow() {
      this.axios
        .get( this.$api+"/api/GetDanmo",{params:{"id":this.$route.query.id}})
        .then((res) => {
          console.log(res);
          (this.danju = res.data.danh),
           this.cangku=res.data.cname,
           this.jingshou=res.data.jname,
           this.riqi=res.data.rtywDate,
           this.beizhu=res.data.bei,
           this.zhiriqi=res.data.ydate,
           this.kehu=res.data.kname
        });
    },
    Xiang() {
      this.axios
        .get( this.$api+"/api/GetCuhws?id=" + this.$route.query.id)
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