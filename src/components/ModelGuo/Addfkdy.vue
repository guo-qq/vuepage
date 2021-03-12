<template>
 <div>
     <router-link to="/zpayment"><el-button  round>返回</el-button></router-link>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div style="font-size:30px;margin-left:500px">付款单</div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;           
        <div style="float:right">单据编号:{{sjs}}</div>      
          <div style="margin-top:100px;margin-left:30px">
            <div style="float:left"> 付款方:</div>         
           <div style="width:200px;float:left;margin-left:20px">  <el-input
          placeholder="客户名称/编码"
         v-model="input"
         clearable>
         </el-input>
          </div> 
          <div style="float:left"> 
            &nbsp;&nbsp;总应该收款 (元):
         </div> 
           <div style="width:200px;float:left;margin-left:20px"> 
            <el-input
           placeholder="0.00"
           v-model="input1"
           clearable>
          </el-input>
           </div> 
           <div style="float:left"> 
            &nbsp;&nbsp;经手人:
           </div> 
           <div style="width:200px;float:left;margin-left:20px"> 
            <el-input
            placeholder="姓名/手机"
           v-model="input2"
           clearable>
            </el-input>
            </div> 
           <div style="float:left"> 
            &nbsp;&nbsp;收款日期:
            </div> 
           <div  style="width:200px;float:left;margin-left:20px"> 
             <div class="block">     
         <el-date-picker
         v-model="value1"
         type="date"
          placeholder="选择日期">
          </el-date-picker>
         </div>
          </div>
            
          </div>  
  
           <div style="margin-left:150px;margin-top:200px" id="app">
        <el-table :data="tableData" class="tb-edit" style="width: 100%" highlight-current-row @row-click="handleCurrentChange">
            <el-table-column label="收款金额(元)" width="180">
                <template scope="scope">
                    <el-input size="small" v-model="JE" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> 
                </template>
            </el-table-column>
             <el-table-column label="优惠金额(元)" width="180">
                <template scope="scope">
                    <el-input size="small" v-model="YH" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> 
                </template>
            </el-table-column>      
                <el-table-column label="实付金额(元)" width="180">
                <template scope="scope">
                    <el-input size="small" v-model="SF" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> 
                </template>
            </el-table-column>    
             <el-table-column label="结算方式" width="200">

                <el-select v-model="value" placeholder="请选择">
               <el-option
               v-for="item in options"
               :key="item.value"
              :label="item.label"
               :value="item.value">
                  </el-option>
                 </el-select>
                 </el-table-column> 
                <el-table-column label="备注" width="200">
                <template scope="scope">
                    <el-input size="small" v-model="BZ" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> 
                </template>
            </el-table-column>       
        </el-table>
         </div>
     
      <div style="margin-top:100px;float:right">
         <el-form-item>
         <el-button type="primary" @click="onSubmit()">立即创建</el-button>
         <el-button @click="resetForm('ruleForm')">重置</el-button>
         </el-form-item>
      </div>
   </el-form>
 </div>
</template>
<script>
export default {
  data() {
    return {
     data:this.getProjectNum(),
      input: '',
      input1: '',
      input2: '',
      input3: '',
      value1:'',
      JE:'',
      YH:'',
      SF:'',
      BZ:'',
      tableData: [{
                date: '',
                name: '',
                address: '',
                BZ:''
            }],
      options: [{
          value: '现金',
          label: '现金'
        },
        {
          value: '支付宝',
          label: '支付宝'
        },
        {
          value: '微信',
          label: '微信'
        },
        {
          value: '建设银行',
          label: '建设银行'
        },
        {
          value: '工商银行',
          label: '工商银行'
        }

        ],
        value: '',
        sjs:'KF',
        i:0,
        id:'',
  
    }
  },
  watch:{
    JE(){
      this.reversedMessage();
    },
    YH(){
      this.reversedMessage();
    }
  },
  created () {
  // 调用获取当前日期的方法加四位随机数  赋值表单中的项目编号
  this.sjs += this.getProjectNum() + Math.floor(Math.random() * 10000)  // 如果是6位或者8位随机数，相应的 *1000000或者 *100000000就行了
},
 
  methods: {
          
            // 获取当前日期的方法
         	getProjectNum () {
          const projectTime = new Date() // 当前中国标准时间
          const Year = projectTime.getFullYear() // 获取当前年份 支持IE和火狐浏览器.
          const Month = projectTime.getMonth() + 1 // 获取中国区月份
          const Day = projectTime.getDate() // 获取几号
          var CurrentDate = Year
          if (Month >= 10) { // 判断月份和几号是否大于10或者小于10
          CurrentDate += Month
          } else {
         CurrentDate += '0' + Month
         }
         if (Day >= 10) {
        CurrentDate += Day
         } else {
        CurrentDate += '0' + Day
        }
        return CurrentDate
         },
           resetForm(formName) {
         this.$refs[formName].resetFields();
          },
         async  onSubmit(){
          await  this.axios({
            method:"post",
           url:"http://localhost:50774/api/AddReceiptPayment",
           data:{
               DanJ:this.sjs,
               ASWId:Number(1),
               RPPayer: this.input,
               RPGrossPrice:Number(this.input1),
               RPHandle:this.input2,
               RPTotalPayment:Number(0),
               RPTotalDiscount:Number(0),
               RPTotalMoney:Number(0),
               RcreateTime:this.value1,
               RPQfj:Number(2),
               Rpid:Number(0)

              }
            }).then((res)=>{
                
             
                 
           })
            
           await this.axios.get('http://localhost:50774/api/ChaX?t='+this.sjs)
             .then(response => {
              this.id=response.data
              
               })
           .catch(function (error) {
           console.log(error)
             })

           await  this.axios({
            method:"post",
           url:"http://localhost:50774/api/AddReceiptPaymentMoney",
           data:{
                 RPMId:Number(0),
                 RPMPayment:Number(this.JE),
                 RPMDiscount:Number(this.YH),
                 RPMMoney:Number(this.SF),
                 RPMMode:this.value,
                 RPMRemark:this.BZ,
                 RPId:Number(this.id),
                 ASWId:Number(1),
                 RPQfj:Number(2)

              }
            }).then((res)=>{
                 
                     this.$message({
                  message: '添加成功',
                  type: 'success'
                   });
                            
                 
           })


          }
 
        },
        computed: {
    // 计算属性的 getter
       reversedMessage: function () {
      // `this` 指向 vm 实例
         this.SF=this.JE-this.YH
        
         if (this.YH>this.JE) {
                this.$message({
                 message: '优惠金额过大请重新输入',
                  type: 'warning'
                });
                this.YH=null;
                this.JE=null;
                this.SF=null;
         }
         }
        }
}
</script>

 