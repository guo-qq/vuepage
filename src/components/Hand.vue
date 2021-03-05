<template>
  <!-- logo和文字 -->
  <div class="header" style="background-color:ffffff">
    <a href="#/" >   <!-- 点击进入首页 -->
    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <span class="company">管理系统</span>
    </a>   
  <!-- logo和文字结束 -->
  <div class="el-dropdown">
    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete"></i>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
  </div>
 
  <!--  下拉菜单-->
<el-dropdown @command="handleCommand"><!--  绑定指令,在methods里定义-->
    
    <span class="el-dropdown-link">
      您好
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
        <!-- icon是修改图标 ，command是点击后传给方法的值-->
      <el-dropdown-item icon="el-icon-edit" command="edit">>修改密码</el-dropdown-item>

      <el-dropdown-item icon="el-icon-s-operation" >
        <router-link to="/registerindex">退出登录</router-link>
      </el-dropdown-item>
      
    </el-dropdown-menu>
</el-dropdown>
  <!--  下拉菜单结束-->


  </div>

</template>
<script>
export default {
name: 'borrow',
  data () {
    return {
    // 图片路径
      bookImg: require('@/assets/952da559ccbf6c81263b627ab13eb13532fa4040.jpg'),
      
    }
  },
   methods: {
      handleCommand(command){
        this.$message(`点击了${command}`)
      }
    }
}
</script>
 <style>
 .logo {
  vertical-align: middle; /* 居中 */
  padding: 0px 10px 0px 40px; /* 上右下左 */
}
/* 文字 */
.company {
  position: absolute;
  color:  rgb(53, 182, 21);
}
/* 下拉菜单 */
.el-dropdown{
    float: right; /* 浮动在右边 */
    margin-right: 40px; /* 靠右40px */
}
 /* 系统管理 */
.el-dropdown-link{
    color:  rgb(53, 182, 21);
    cursor: pointer; /* 鼠标放上去是手的形状 */
}
 
</style>
