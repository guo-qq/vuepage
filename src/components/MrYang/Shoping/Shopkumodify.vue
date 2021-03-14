<template>
    <div>
      <span style="marginLeft:3%;margintop:20%">基础数据</span>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <table>
        <tr>
          <td>
            <el-form-item label="商品编码">
            <el-input v-model="ruleForm.cargoCoding"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item  label="商品名称"
        prop="cargoName"
        :rules="[
      { required: true, message: '请输入商品名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]"
        >
        <el-input v-model="ruleForm.cargoName" placeholder="请输入商品名称"></el-input>
         </el-form-item>
          </td>
          <td>
            <el-form-item label="商品分类">
              <el-cascader :options="option" v-model="ruleForm.value" clearable></el-cascader>
             </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="上架日期">
            <el-date-picker
            v-model="ruleForm.cargoDate"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="商品标签">
            <el-select v-model="ruleForm.lcid" placeholder="请选择">
            <el-option
              v-for="item in optio"
              :key="item.value"
              :label="item.lclientName"
              :value="item.lclientId">
            </el-option>
             </el-select>
             </el-form-item>
          </td>
          <td>
            <el-form-item label="计量单位">
            <el-select v-model="ruleForm.unitId" placeholder="请选择">
            <el-option
              v-for="item in opti"
              :key="item.value"
              :label="item.unitName"
              :value="item.unitId">
            </el-option>
             </el-select>
             </el-form-item>
          </td>
        </tr>
        <tr>
            <td>
                <el-form-item label="商品状态">
          <el-tooltip :content="'Switch value: ' + value" placement="top">
        <el-switch
        v-model="ruleForm.cargoState"
        active-color="#13ce66"
        active-value="1"
        inactive-color="#ff4949"
        inactive-value="0">
        </el-switch>
        </el-tooltip>
          </el-form-item>
            </td>
        </tr>
      </table>
       <span style="marginLeft:3%;marginTop:20%">规格信息</span>
      <table>
          <tr>
              <td>
               
            <el-form-item label="选择属性">
            <el-cascader :options="op" v-model="ruleForm.value1" clearable></el-cascader>
             </el-form-item>
              </td>
          </tr>
          <tr>
              <td>
                  <el-form-item label="规格编码" prop="fff">
                <el-input v-model="ruleForm.cpggCoding"></el-input>
                </el-form-item>
              </td>
              <td>
                  <el-form-item label="零售价" prop="fff">
                <el-input v-model="ruleForm.cpprice"></el-input>
                </el-form-item>
              </td>
          </tr>
          <tr>
              <td>
                  <el-form-item label="最高库存量" prop="fff">
                <el-input v-model="ruleForm.cpmaxNumber"></el-input>
                </el-form-item>
              </td>
              <td>
                  <el-form-item label="最低库存量" prop="fff">
                <el-input v-model="ruleForm.cpminNumber"></el-input>
                </el-form-item>
              </td>
          </tr>
          <tr>
              <td>
                  <el-form-item label="商品详情" prop="fff">
                <el-input type="textarea" v-model="ruleForm.cargoDetails"></el-input>
                </el-form-item>
              </td>
          </tr>
      </table>
      <el-form-item>
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
        dialogVisible: false,
        reload: this.reload,
        option:[],
        optio:[],
        opti:[],
        op:[],
       ruleForm:{
          value:'',
          cargoCoding:'',
          cargoName:'',
          cargoDate:'',
          lcid:'',
          unitId:'',
          cargoState:'',
          value1:'',
          cpggCoding:'',
          cpprice:'',
          cpmaxNumber:'',
          cpminNumber:'',
          cargoDetails:'',
        }
      };
    },
     mounted(){
         this.axios.get(this.$api+'/api/Cargo_PropertyShow?id='+this.$route.query.id).then((res)=>{
            this.ruleForm.cargoCoding=res.data.cargoCoding
            this.ruleForm.value=res.data.classId
            this.ruleForm.cargoName=res.data.cargoName
            this.ruleForm.cargoDate=res.data.cargoDate
            this.ruleForm.lcid=res.data.lcid
            this.ruleForm.unitId=res.data.unitId
            this.ruleForm.cargoState=res.data.cargoState
            this.ruleForm.value1=res.data.propertyId
            this.ruleForm.cpggCoding=res.data.cpggCoding
            this.ruleForm.clientSstate=res.data.clientSstate
            this.ruleForm.cpprice=res.data.cpprice
            this.ruleForm.cpmaxNumber=res.data.cpmaxNumber
            this.ruleForm.cpminNumber=res.data.cpminNumber
            this.ruleForm.cargoDetails=res.data.cargoDetails
          })
        //商品分类下拉
        this.axios.get(this.$api+'/api/ShopTypeSelectAll')
        .then(response=>{
            this.option=response.data;
            console.log('ok')
        })
        .catch(function(error){
            console.log(error);
          })
          //商品标签
        this.axios.get(this.$api+'/api/LableClientSelect')
        .then(response=>{
          this.optio=response.data;
            console.log('ok')
        })
        .catch(function(error){
            console.log(error);
          })
           //商品单位
        this.axios.get(this.$api+'/api/UnitSelect')
        .then(response=>{
          this.opti=response.data;
            console.log('ok')
        })
        .catch(function(error){
            console.log(error);
          })
            //商品属性
        this.axios.get(this.$api+'/api/Shopshuxing')
        .then(response=>{
          this.op=response.data;
            console.log('ok')
        })
        .catch(function(error){
            console.log(error);
          })
    },
    methods: {
      submitForm(formName) {
        console.log(this.op)
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.axios.post(this.$api+"/api/ShopAdd",{
                 cargoCoding:this.ruleForm.cargoCoding,
                 cargoName:this.ruleForm.cargoName,
                 classId:Number(this.ruleForm.value[1]),
                 cargoDate:this.ruleForm.cargoDate,
                 lcid:Number(this.ruleForm.lcid),
                 unitId:Number(this.ruleForm.unitId),
                 cargoState:Number(this.ruleForm.cargoState),
                 cargoDetails:this.ruleForm.cargoDetails,
            })
            this.axios.post(this.$api+"/api/CargoPropertyAdd",{
                 propertyId:Number(this.ruleForm.value1[1]),
                 cpggCoding:this.ruleForm.cpggCoding,
                 cpprice:Number(this.ruleForm.cpprice),
                 cpmaxNumber:Number(this.ruleForm.cpmaxNumber),
                 cpminNumber:Number(this.ruleForm.cpminNumber)
            })
            this.$message({
                    message: '修改成功',
                   type: 'success',
                   callback:action=>{
                    this.$router.push('/zcomku');
                  }
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      
    }
  };
</script>