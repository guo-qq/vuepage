<template>
  <div >
    
    <!-- Form -->
    <el-button  type="text"   @click="Allout()">详情</el-button>
     
    <el-dialog title="收款单"    :visible.sync="dialogFormVisible" width="80%" :modal-append-to-body="false" >
      <el-divider></el-divider>
 
      <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
     <el-table-column
      prop="danJ"
      label="订单编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="rppayer"
      label="付款方"
      width="180">
    </el-table-column>
    <el-table-column
      prop="rpgrossPrice"
      label="总应收款(元)"
      width="180">
    </el-table-column>
    <el-table-column
      prop="rphandle"
      label="经手人">
    </el-table-column>
      <el-table-column
      prop="rcreateTime"
      label="收款日期">
    </el-table-column>
  
  </el-table>                         
        <br />
        <br /><br />
        <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="rpmpayment"
      label="收款金额元"
      width="180">
    </el-table-column>
    <el-table-column
      prop="rpmdiscount"
      label="优惠金额(元)"
      width="180">
    </el-table-column>
    <el-table-column
      prop="rpmmoney"
      label="实收金额">
    </el-table-column>
      <el-table-column
      prop="rpmmode"
      label="结算方式">
    </el-table-column>
      <el-table-column
      prop="rpmremark"
      label="备注">
    </el-table-column>
  </el-table>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      item:[],
      formLabelWidth: "120px",
      wocap:this.id,
      tableData:[],
   
    };
  },
  methods: {
   tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
    
   async  Allout(val){
      this.dialogFormVisible=true
      
      await this.axios
      .get(this.$api+"/api/CCCC?id="+this.wocap)
      .then((response) => {
        this.item = response.data;       
        this.tableData=response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    }    
  },   
  props:{
    id:{
      type:Number,
      Request:true
    }
  }  
};
</script>
<style>
    .mask{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background: #000;
        z-index:2000;
    }
    .content{
        z-index:20001;
    }
</style>