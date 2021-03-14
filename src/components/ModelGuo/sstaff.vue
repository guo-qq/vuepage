<template>
  <div>
    <!-- 新增 -->
    <div style="float: left">
       <Addsstaff></Addsstaff>
    </div>
    <br /><br /><br />
    <!-- 查询 -->
    <div style="float: left">
      所属角色:
      <el-input v-model="value" placeholder="请输入角色名称"></el-input>
    </div>

    <div style="float: left">
      所属门店:
      <el-input v-model="value1" placeholder="请输入所属门店"></el-input>
    </div>

    <div style="float: left">
      员工账号:
      <el-input v-model="input" placeholder="请输入员工账号"></el-input>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="filterBooks" border>
        <el-table-column label="员工ID">
          <template slot-scope="scope">
            <span>{{ scope.row.userid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="员工账号">
          <template slot-scope="scope">
            <el-input
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.usernumber"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.usernumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="员工密码">
          <template slot-scope="scope">
            <span :hidden="scope.row.show">{{ tt }}</span>
            <el-input
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.userpwd"
            ></el-input>
            <span v-show="!scope.row.show" hidden="!scope.row.show">{{
              scope.row.userpwd
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <el-input
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.userName"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属门店" width="130px">
          <template slot-scope="scope">
            <el-select
              size="mini"
              v-model="scope.row.aswName"
              @change="display(scope.row)"
              :disabled="!scope.row.show"
            >
              <el-option
                v-for="item in displayOptions"
                :key="item.aswid"
                :label="item.label"
                :value="item.aswname"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="所属角色" width="130px">
          <template slot-scope="scope">
            <el-select
              size="mini"
              v-model="scope.row.roleidName"
              @change="display1(scope.row)"
              :disabled="!scope.row.show"
            >
              <el-option
                v-for="item in displayOptions1"
                :key="item.roleid"
                :label="item.roleidName"
                :value="item.roleidName"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="员工状态">
          <template slot-scope="scope">
            <el-switch
              :disabled="!scope.row.show"
              v-model="scope.row.userstate1"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
              @change="changeSwitch(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="入职时间">
          <template slot-scope="scope">
            <span>{{ scope.row.userTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button @click="scope.row.show = true">编辑</el-button>
            <el-button
              @click="
                BC(scope.row);
                scope.row.show = false;
              "
              >保存</el-button
            >
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tabledatas)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Addsstaff from '@/components/ModelGuo/Addsstaff'
export default {
  data() {
    return {
      tt: "**********",
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
      displayOptions: [],
      displayOptions1: [],
      input: "",
    };
  },
  created() {
    this.show();
    this.staff();
    this.shop();
  },
  methods: {
    show() {
      this.axios
        .get(this.$api+"/api/users")
        .then((response) => {
          console.log(response.data);
          this.tabledatas = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    staff() {
      this.axios
        .get(this.$api+"/api/AddShopWareSelect")
        .then((response) => {
          this.displayOptions = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    shop() {
      this.axios
        .get(this.$api+"/api/roles")
        .then((response) => {
          this.displayOptions1 = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    changeSwitch(data) {
      this.axios
        .get(this.$api+"/api/Userstate", {
          params: {
            id: Number(data.userid),
            state: Number(data.userstate1),
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.$message({
              message: "修改员工状态成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "修改员工状态失败",
              type: "success",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    display(val) {
      this.axios
        .get(this.$api+"/api/Usershop", {
          params: {
            id: Number(val.userid),
            name: val.aswName,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            this.$message({
              message: "修改门店成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "修改门店失败",
              type: "success",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    display1(val) {
      this.axios
        .get(this.$api+"/api/UserRole", {
          params: {
            id: Number(val.userid),
            name: val.roleidName,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            this.$message({
              message: "修改角色成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "修改角色失败",
              type: "success",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    BC(val) {
      this.$confirm("是否保存其他数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios({
            method: "post",
            url: this.$api+"/api/uptUser",
            data: {
              userid: Number(val.userid),
              usernumber: val.usernumber,
              userpwd: val.userpwd,
              userName: val.userName,
            },
          }).then((res) => {
            this.$message({
              message: "保存成功",
              type: "success",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
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
    filterBooks() {
      const { tabledatas, value, value1, input } = this;
      let filterArr = new Array();
      filterArr = tabledatas;
      if (value != "") {
        filterArr = tabledatas.filter((p) => p.roleidName.indexOf(value) != -1);
      }
      if (value1 != "") {
        filterArr = tabledatas.filter((p) => p.aswName.indexOf(value1) != -1);
      }
      if (input != "") {
        filterArr = tabledatas.filter((p) => p.usernumber.indexOf(input) != -1);
      }
      return filterArr;
    },
  },
  components:{
       "Addsstaff":Addsstaff
  }
};
</script>