<template>
  <div>
    <div>
      <router-link to="/AddJie"
        ><el-button type="primary">新增</el-button></router-link
      >
    </div>
    <div style="float: left">
      状态
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div style="float: left">
      <span class="demonstration">带快捷选项</span>
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
    </div>
    <div style="float: left; width: 300px">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
    <div style="float: left">
      &nbsp;&nbsp;
      <el-button type="primary" @click="Show()">查询</el-button>
    </div>
    <div style="float: right">
      <el-button type="danger" v-if="multipleSelectionFlag" @click="popDelete">
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
    <div style="float: lift">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="lbzdDate" label="提交时间"> </el-table-column>
        <el-table-column prop="lbnumber" label="单据编号" width="120">
        </el-table-column>
        <el-table-column
          prop="lbwarehouse"
          label="调出仓库"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="lbclient" label="客户" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="lbghDate" label="归还时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="lbstate" label="状态" show-overflow-tooltip>
          <template scope="scope">
            <span v-if="scope.row.lbstate == 0">未归还</span>
            <span v-if="scope.row.lbstate == 1">已归还</span>
            <span v-if="scope.row.lbstate == 2">已销售</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.lbstate == 0"
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              >归还</el-button
            >
            <el-button type="text" size="small" v-if="scope.row.lbstate == 0"
              @click="ZhuanX(scope.row)">转销售</el-button
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
      multipleSelectionFlag: false,
      multiDeleteVisible: false,
      multipleSelection: "",
      value2: "",
      value: "",
      input: "",
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
      tableData: [],
      options: [
        {
          value: "0",
          label: "待归还",
        },
        {
          value: "1",
          label: "已归还",
        },
      ],
      value: "",
    };
  },
  methods: {
    ZhuanX(row){
      this.$router.push({path:'/ZhuanX',query:{id:row.lbid}})
    },
    handleClick(row){
      console.log(row)
      this.axios.post("http://localhost:50774/api/GaiLoan?id="+row.lbid)
      .then((res)=>{
        location.reload();
      })

    },
    multiDelete() {
      this.multiDeleteVisible = false;
      let checkArr = this.multipleSelection; // multipleSelection存储了勾选到的数据
      let params = [];
      let self = this;
      checkArr.forEach(function (item) {
        params.push(item.lbid); // 添加所有需要删除数据的id到一个数组，post提交过去
      });
      console.log(params);
      this.axios.post("http://localhost:50774/api/DelLoan",params)
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.multipleSelectionFlag = true;
      if (this.multipleSelection.length == 0) {
        // 如不进行判断则勾选完毕后批量删除按钮还是会在
        this.multipleSelectionFlag = false;
      }
    },
    Show() {
      this.axios
        .get("http://localhost:50774/api/Jie", {
          params: {
            z: Number(this.value),
            q: this.value2[0],
            h: this.value2[1],
            n: this.input,
          },
        })
        .then((res) => {
          this.tableData = res.data;
        });
    },
  },
  mounted() {
    this.Show();
  },
};
</script>