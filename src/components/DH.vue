<template>
  <!-- el-menu：菜单栏的根组件 router: 设置路由可以跳转 -->
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
        <template v-if="item1.children.length!=0">
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
              <span>{{item2.title}}</span>
            </el-menu-item>
          </el-submenu>
        </template>
        <!-- // -->
        <!-- 如果是最后一级 -->
        <template v-else>
          <el-menu-item :key="index1" :index=" item1.murl">
            <i class="el-icon-s-grid"></i>
            <span>{{ item1.title }}</span>
          </el-menu-item>
        </template>
        <!-- // -->
      </template>
    </el-submenu>
  </el-menu>
</template> 


 

<script>
  export default {
  data() {
      return {        
        isCollapse: true, 
        items:[]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }     
    },
    mounted () {
    this.axios.get('http://localhost:50774/api/Carte')
      .then(response => {
        this.items = response.data
        console.log('ok')
      })
      .catch(function (error) {
        console.log(error)
      })
  },   
   computed: {
			onRoutes() {
				return this.$route.path.replace('/', '');
			}
   },
  }
  
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

 
	.sidebar>ul {
		height: 100%;
	}
</style>