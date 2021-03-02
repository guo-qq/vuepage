<template>
        <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in list" :key="index" :to="{path:item.path}"> 
             {{item.name}} 
        </el-breadcrumb-item>
    </el-breadcrumb>
 
</template>
<script>
export default {
    data() {
        return {
            list:[]
        }
    },
    watch:{
        $route(){
            this.bread();
        }
    },
    methods:{
        bread(){
        
            let matched = this.$route.matched.filter(item=>item.name);
            let first = matched[0];
            
            if(first&&first.name!=='首页'){    // 我在这里是判断的是name，渲染的是name，但是可以使用其他的字段
                matched = [{path:"/shou",name:"首页"}].concat(matched);
            }
            
            this.list = matched;
        }
    },
    created(){
      this.bread();
    }
  };
 
</script>