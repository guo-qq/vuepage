<template>
  <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <table width="1000">
        <tr>
            <td>
                <el-form-item  label="属性信息">
                </el-form-item>
            </td>
        </tr>
      <tr>
        <td>
            <el-form-item  label="属性名称">
            <el-input placeholder="请输入内容" v-model="property"  style="width:300px" type="text"></el-input>
            </el-form-item>
        </td>
        <td>
            <div style="position:relative;top:5%;marginLeft:-580px">
            <button type="button" plain @click="addEl">添加</button>
            </div>
        </td>
      </tr>
      <tr>
          <td>
              <el-form-item style="marginLeft:1%" label="属性值列表">
                </el-form-item>
          </td>
      </tr>
      <tr>
        <td>
          <el-table :data="tabledatas" border>
            <el-table-column  label="属性值">
              <el-table-column prop="propertyName">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入内容"
                  v-show="scope.row.show"
                  v-model="scope.row.propertyName"
                ></el-input>
                <span v-show="!scope.row.show">{{ scope.row.propertyName }}</span>
              </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="加价">
              <el-table-column prop="ppAddPrice">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入内容"
                  v-show="scope.row.show"
                  v-model="scope.row.ppAddPrice"
                ></el-input>
                <span v-show="!scope.row.show">{{ scope.row.ppAddPrice }}</span>
              </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="scope.row.show = true">开启</el-button>
                <el-button @click="scope.row.show = false">关闭</el-button>
              </template>
            </el-table-column>
          </el-table>
        </td>
      </tr>
    </table>
      <el-form-item style="marginLeft:47%">
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
        
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabledatas: [{ propertyName: "", ppAddPrice: "", show: true }],
      list:{
          propertyName:'',
          propertyState:'',
          ppAddPrice:'',
          ppRecursion:'',
          propertyUseNum:'',
          aswid:''
      }
    };
  },
  methods: {
    addEl: function () {
    let cope = {
    propertyName: " ",
    ppAddPrice: " ",
    show: true 
  }
  this.tabledatas.push(cope);
},
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            list
           this.axios.post("http://localhost:50774/api/PropertyAdd",{
                propertyName:this.tabledatas.propertyName,
                propertyState:Number(1),
                ppAddPrice:Number(this.tabledatas.ppAddPrice),
                ppRecursion:Number(0),
                propertyUseNum:Number(0),
                aswid:Number(1),
            })
            this.$alert('添加成功','消息',{
                  confirmButtonText:'确定',
                  callback:action=>{
                    this.$router.push();
                  }
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
      
    }
};
</script>