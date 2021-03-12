<template>
  <div>
    <!-- 新增 -->
    <div style="float: left">
      <Addsrole></Addsrole>
    </div>
    <!-- 查询 -->
    <div style="float: left">
      <el-input v-model="input9" placeholder="请输入角色名称"></el-input>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="FilterBooke" border>
        <el-table-column label="角色ID">
          <template slot-scope="scope">
            <el-input
              disabled
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
        <el-table-column label="角色描述">
          <template slot-scope="scope">
            <el-input
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.roleiddescribe"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.roleiddescribe }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色状态">
          <template scope="scope">
            <el-switch
              :disabled="!scope.row.show"
              on-color="#5B7BFA"
              off-color="#dadde5"
              active-value="1"
              inactive-value="0"
              v-model="scope.row.rolestate1"
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
        <el-table-column label="操作" width="400px">
          <template slot-scope="scope">
            <el-button @click="scope.row.show =true">编辑</el-button>
            <el-button @click="BC(scope.row), (scope.row.show = false)"
              >保存</el-button
            >
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tabledatas)"
              >删除</el-button
            >
            <el-button              
              ><FPQX v-bind:id=scope.row.roleid></FPQX></el-button
            >
           
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import FPQX from '@/components/ModelGuo/FPQX'
import Addsrole from '@/components/ModelGuo/Addsrole'
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
      tabledatas: [],
      value6: true,
      input9: "",
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
    BC(val) {
      this.axios({
        method: "post",
        url: "http://localhost:50774/api/uptRole",
        data: {
          Roleid: Number(val.roleid),
          RoleidName: val.roleidName,
          Roleiddescribe: val.roleiddescribe,
          Rolestate: Number(val.rolestate1),
          RoleTime: val.roleTime,
          Rolesection: val.rolesection,
        },
      }).then((res) => {
        console.log(res);
        if (res.data > 0) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "修改失败",
            type: "success",
          });
        }
      });
    },
    deleteRow(index, rows) {
      this.$confirm("是否保存其他数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          rows.splice(index, 1);
          this.$message({
            message: "删除成功",
            type: "success",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
  },
  computed: {
    FilterBooke() {
      const { tabledatas, input9 } = this;
      let filterArr = new Array();
      filterArr = tabledatas.filter((p) => p.roleidName.indexOf(input9) !== -1);
      return filterArr;
    },
  },
  components:{
    "FPQX":FPQX,
    "Addsrole":Addsrole
  }
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