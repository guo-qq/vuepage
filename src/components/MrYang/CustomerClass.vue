<template>
    <div>
        <el-dialog
  title="新增分类"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">
  <el-form-item label="客户代码">
            <el-input v-model="ruleForm.clientSnumber"></el-input>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
</el-form-item>
</el-dialog>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>