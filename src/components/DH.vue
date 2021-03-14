<template>
  <!-- el-menu：菜单栏的根组件 router: 设置路由可以跳转 -->

  <div>
    <el-menu
      :router="true"
      :unique-opened="true"
      class="mymenu el-menu-vertical-demo"
    >
      <!-- submenu：菜单栏中的一项 index: 它的标识（唯一）-->
      <el-submenu
        v-for="(item, index) in items"
        :key="index"
        :index="item.murl"
      >
        <!-- 这一项的图标&文字信息 -->
        <template slot="title">
          <i class="el-icon-toilet-paper"></i>
          <span>{{ item.title }}</span>
        </template>
        <!-- 判断是否最后一级子元素 -->
        <template v-for="(item1, index1) in item.children">
          <!-- 如果不是最后一级 -->
          <template v-if="item1.children.length != 0">
            <el-submenu :key="index1" :index="index1">
              <template slot="title">
                <i class="el-icon-milk-tea"></i>
                <span>{{ item1.title }}</span>
              </template>
              <el-menu-item
                v-for="(item2, index2) in item1.children"
                :key="index2"
                :index="item2.murl"
              >
                <i class="el-icon-s-grid"></i>
                <span>{{ item2.title }}</span>
              </el-menu-item>
            </el-submenu>
          </template>
          <!-- // -->
          <!-- 如果是最后一级 -->
          <template v-else>
            <el-menu-item :key="index1" :index="item1.murl">
              <i class="el-icon-s-grid"></i>
              <span>{{ item1.title }}</span>
            </el-menu-item>
          </template>
          <!-- // -->
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template> 
 
<script>
import eventBus from "@/eventBus";
export default {
  data() {
    return {
      isCollapse: true,
      items: [],
      name:'',
      pwd:'',
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    DL(name,pwd)
    {
      this.axios.get(this.$api+'/api/Carte?name='+localStorage.getItem('name')+'&pwd='+JSON.parse(localStorage.getItem('pwd')))
      .then(response => {
        this.items = response.data
        
        console.log('ok')
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
   created(){
      eventBus.$on("userDefinedEvent", function (sev) {      
         localStorage.setItem('name',sev.data[0].usernumber);
         localStorage.setItem('pwd',sev.data[0].userpwd);     
    
     });    
   },
  mounted() {         
       
      this.DL();    
  },
  computed: {
    onRoutes() {
      return items[0];
    },
  },
};
</script>
 
<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar > ul {
  height: 100%;
}
</style>