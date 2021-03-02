<template>
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
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
      
   
  </el-table>
</template>

<script>
  export default {
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },
    data() {
      return {
        tableData: [{
        
        }]
      }
    }
  }
</script>