<template>
  <div>
    <!-- 新增 -->
    <div style="float: left">
      <el-button type="primary">新增</el-button>
    </div>
    <br /><br /><br />
    <!-- 查询 -->
    <div style="float: left">
      所属角色:
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      所属门店:
      <el-select v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
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
              v-model="scope.row.userid"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.userid }}</span>
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
              @change="display"
              :disabled="!scope.row.show"
            >
              <el-option
                v-for="item in displayOptions"
                :key="item.aswname"
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
              @change="display"
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
              on-text="禁止"
              off-text="启动"
              v-model="scope.row.userstate"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            <el-input
              placeholder="请输入内容"
              v-show="scope.row.show"
              v-model="scope.row.userTime"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row.userTime }}</span>
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
      tabledatas: [],
      value6: true,
      displayOptions: [],
      displayOptions1: [],
    };
  },
  mounted() {
    this.show();
    this.staff();
    this. shop();
  },
  methods: {
    show() {
      this.axios
        .get("http://localhost:50774/api/users")
        .then((response) => {
          this.tabledatas = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    staff() {
      this.axios
        .get("http://localhost:50774/api/AddShopWareSelect")
        .then((response) => {
          this.displayOptions = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    shop() {
      this.axios
        .get("http://localhost:50774/api/roles")
        .then((response) => {
          this.displayOptions1 = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>