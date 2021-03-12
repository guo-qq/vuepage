<template>
  <div>
    <div>
      <router-link to="/AddAllot">
        <el-button type="primary">新增</el-button></router-link
      >
    </div>
    <div id="app">
      <div style="float: right">
        <el-button
          type="danger"
          v-if="multipleSelectionFlag"
          @click="popDelete()"
        >
          批量删除
        </el-button>
        <el-dialog :visible.sync="multiDeleteVisible" title="提示" width="30%">
          <span>确定要删除吗</span>
          <span slot="footer">
            <el-button type="primary" @click="multiDelete()">确 定</el-button>
            <el-button @click="multiDeleteVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <div style="float: left">
        <span class="demonstration">盘点日期</span>
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        &nbsp;&nbsp;&nbsp;
      </div>
      <!--关键字搜索-->
      <div style="width: 200px; float: left">
        <el-input v-model="input" placeholder="请输入关键字"></el-input>
      </div>
      <div style="float: left">
        &nbsp;&nbsp;&nbsp;
        <el-button @click="sel()" type="primary">搜索</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="rtYwDate" label="提交时间"> </el-table-column>
        <el-table-column prop="reSerial" label="单据编号"> </el-table-column>
        <el-table-column prop="wnamec" label="调出仓库"> </el-table-column>
        <el-table-column prop="wnamer" label="调入仓库"> </el-table-column>
        <el-table-column prop="cDzhuang" label="状态">
          <template scope="scope">
            <span v-if="scope.row.cDzhuang == 0">待审核</span>
            <span v-if="scope.row.cDzhuang == 1" style="color: green"
              >通过</span
            >
            <span v-if="scope.row.cDzhuang == 2" style="color: red"
              >不通过</span
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
            <el-button
              v-if="scope.row.cDzhuang == 0"
              type="text"
              size="small"
              @click="Schang(scope.row, 1)"
              style="color: green"
              >通过</el-button
            >
            <el-button
              v-if="scope.row.cDzhuang == 0"
              type="text"
              size="small"
              @click="Schang(scope.row, 2)"
              style="color: red"
              >不通过</el-button
            >
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
      //日期
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      multipleSelectionFlag: false,
      multiDeleteVisible: false,
      multipleSelection: "",
      tableData: [],
      value2: "",
      input: "",
      multipleSelection: [],
    };
  },
  methods: {
    handleClick(row)
    {
      this.$router.push({path:'/DiaoXi',query:{id:row.rtid}})
    },
    Schang(row, o) {
      this.axios
        .post(
          this.$api+"/api/ChangDiao?id=" + row.rtid + "&start=" + o
        )
        .then(function (res) {
          console.log(res);
          if (res.data > 0) {
            location.reload();
          }
        });
    },
    multiDelete() {
      this.multiDeleteVisible = false;
      let checkArr = this.multipleSelection; // multipleSelection存储了勾选到的数据
      let params = [];
      let self = this;
      checkArr.forEach(function (item) {
        params.push(item.rtid); // 添加所有需要删除数据的id到一个数组，post提交过去
      });
      console.log(params);
      this.axios.post( this.$api+"/api/DelDiao",params)
      .then(function(res){
        if(res.data>0)
        {
          self.$message({
              message: "删除成功",
              type: "success",
            });
            location.reload();
        }
      })
    },
    popDelete() {
      this.multiDeleteVisible = true;
    },
    show: function () {
      //显示
      this.axios
        .get( this.$api+"/api/AllotShow")
        .then((response) => {
          this.tableData = response.data;
          console.log("ok");
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val;
      this.multipleSelectionFlag = true;
      if (this.multipleSelection.length == 0) {
        // 如不进行判断则勾选完毕后批量删除按钮还是会在
        this.multipleSelectionFlag = false;
      }
    },

    sel: function () {
      this.axios
        .get( this.$api+"/api/ShowWareCheck", {
          params: {
            q: this.value2[0],
            h: this.value2[1],
            n: this.input,
          },
        })
        .then((data) => {
          this.tableData = data.data;
          console.log("ok");
        });
    },
  },
  mounted() {
    this.show();
  },
};
</script>
