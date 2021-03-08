<template>
  <div>
    <!-- 新增 -->
    <div style="float: left">
      <el-button type="primary">新增</el-button>
    </div>
    <!-- 查询 -->
    <div style="float: left">
      <el-input v-model="input" placeholder="请输入员工账号"></el-input>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tabledatas" border>
        <el-table-column label="员工ID">
          <template slot-scope="scope">
            <el-input
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.roleid"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.roleid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色姓名">
          <template slot-scope="scope">
            <el-input
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.roleidName"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.roleidName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属部门">
          <template slot-scope="scope">
            <el-input
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.rolesection"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.rolesection }}</span>
          </template>
        </el-table-column>
        <el-table-column label="员工状态">
          <template scope="scope">
            <el-switch
              on-text="是"
              off-text="否"
              on-color="#5B7BFA"
              off-color="#dadde5"
              v-model="scope.row.menusstate"
              @change="change(scope.$index, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>         
        <el-table-column label="时间">
          <template slot-scope="scope">
            <el-input
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.roleTime"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.roleTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button @click="scope.row.show = true">编辑</el-button>
            <el-button @click="scope.row.show = false">保存</el-button>
            <el-button @click="scope.row.show = false">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      options1: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value1: "",
      tabledatas: [
        { tab1: "111", tab2: "2222", show: true, value1: true },
        { tab1: "aaa", tab2: "bbb", show: false, value1: true },
      ],
      value6: true,
      input:'',
    };
  },
  mounted() {
    this.show();
  },
  methods: {
    show() {
      this.axios
        .get("http://localhost:50774/api/roles")
        .then((val) => {
          this.tabledatas = val.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
  <style>
.menusStateTrue {
  background: #5b7bfa;
  color: white;
}
.menusStateTrue:hover {
  background: #5b7bfa;
  color: white;
}
</style>