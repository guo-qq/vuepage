<template>
  <div id="app"> 
  <Hand id="Hand"></Hand>  
 
  <DH id="DH"   style="float:left;width:15%;height:100%"></DH>
  <MBX style="float:left;height:50px;width:80%"></MBX>
  <router-view  style="float:left;height:100%;width:80%"/>
  <!-- <WB id="WB"  class="footer" style="clear: both"></WB> -->
  </div>
</template>

<script>
import Hand from './components/Hand'
import DH from './components/DH'
import WB from './components/WB'
import MBX from './components/views/MBX'
 
export default {
  name: 'App',
  data(){
    return{
      Hand:"Hand"   
    }
  },
  components:{
    "Hand":Hand,
    "DH":DH,
    "WB":WB,
    "MBX":MBX
 
  }  
}
</script>
<style >   
  .main{padding-bottom:100px;background-color: #ffffff;width:85%}/* main的padding-bottom值要等于或大于footer的height值 */
  .footer{position:absolute;bottom:0;width:100%;height:100px;background-color: #ffffff;}
</style>

 