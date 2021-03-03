<template>
<div>
  <div id="app">
    <!--仓库选择-->
    <div style="float:left">    
        <span class="demonstration">仓库</span>
    <el-cascader
      v-model="value3"
      :options="options"
      :props="{ expandTrigger: 'hover' }"
      @change="handleChange" value="0">请选择</el-cascader>
 
  &nbsp;&nbsp;&nbsp;</div>

  <!--创建日期-->
  <div class="block" style="float:left"> 
    <span class="demonstration">创建日期</span>
    <el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
  &nbsp;&nbsp;&nbsp;</div>
  <!--关键字搜索-->
  <div style="width:200px;float:left">
    <el-input v-model="input" placeholder="请输入关键字"></el-input>
  </div>
  <div  style="float:left">&nbsp;&nbsp;&nbsp;
    <el-button @click="sel()" type="primary">搜索</el-button>
  </div>
  </div>
    <el-table
    :data="tableData"
    style="width: 100%"
    max-height="250">
    <el-table-column
      fixed
      prop="date"
      label="创建时间"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="商品编码"
      >
    </el-table-column>
    <el-table-column
      prop="province"
      label="商品名称"
      >
    </el-table-column>
    <el-table-column
      prop="city"
      label="商品图片"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="实物库存"
      >
    </el-table-column>
    <el-table-column
      prop="zip"
      label="占用库存"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="可用库存"
      >
    </el-table-column>
    <el-table-column
      fixed="rightr"
      label="库存成本（元）"
      >
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="120">
    <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text">库存分布</el-button>
        <el-button type="text" >库存流水</el-button>
      </template>
    </el-table-column>
      
   
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {  
        tableData:[],
        options:[],
        //日期
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: '',
        input: '',
        value3:'0',
      }
    },
    methods: {
      handleChange(e,form,thsAreaCode){
          thsAreaCode=this.value3
      },
      sel:function(event){
        this.axios.get('http://localhost:50774/api/InventorySels',{
          params:{
            WId:this.value3,
            q:this.value1,
            h:this.value2,
            bian:this.input
          }
        })
        .then(response=>{
          this.tableData=response.data;
        })
        .catch(function(error){
            console.log(error);
        })
      },
      handleClick(row) {
        console.log(row);
      }
    }, 
    mounted(){
        //显示       
        this.axios.get('http://localhost:50774/api/InventorySels')
          .then(response=>{
            this.tableData=response.data;
            console.log('ok')
          })      
          .catch(function(error){
            console.log(error);
          }) ,
        //仓库下拉
        this.axios.get('http://localhost:50774/api/SelectWare')
        .then(response=>{
          this.options=response.data;
            console.log('ok')
        })
        .catch(function(error){
            console.log(error);
          })
      }
  }
</script>
