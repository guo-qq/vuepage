<template>
  <div>
    <!-- Form -->
    <el-button type="text" @click="show">分配权限</el-button>

    <el-dialog title="权限的分配" :visible.sync="dialogFormVisible">
      <el-tree
        :data="data"
        show-checkbox
        node-key="mid"
        ref="tree"
        highlight-current
        :props="defaultProps"
      >
      </el-tree>

      <div class="buttons">
        <el-button @click="resetChecked">清空</el-button>
        <el-button @click="getCheckedNodes">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      data: "",
      defaultProps: {
        children: "children",
        label: "mname",
      },
      idd: this.id,
    };
  },
  mounted() {
      
  },
  methods: {
    Cha() {
      
      this.axios
        .get("http://localhost:50774/api/RoleMenus?id=" + this.idd)
        .then((val) => {
             
            this.$refs.tree.setCheckedKeys(val.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getCheckedNodes() {
      alert(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      alert(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label: "二级 2-1",
        },
        {
          id: 9,
          label: "三级 1-1-1",
        },
      ]);
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    show() {
      this.dialogFormVisible = true;
      this.axios
        .get("http://localhost:50774/api/Carte?name="+18325401161+'&pwd='+123)
        .then((val) => {
          this.data = val.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      this.Cha();
    },
    getCheckedNodes() {
      var rad = "";
      var ridsa = this.$refs.tree.getCheckedKeys().join(","); // 获取当前的选中的数据[数组] -id, 把数组转换成字符串
      var ridsb = this.$refs.tree.getCheckedNodes(); // 获取当前的选中的数据{对象}
      ridsb.forEach((ids) => {
        //获取选中的所有的父级id
        rad += "," + ids.pid;
      });
      rad = rad.substr(1); // 删除字符串前面的','
      var rids = rad + "," + ridsa;
      var arr = rids.split(","); //  把字符串转换成数组
      arr = [...new Set(arr)]; // 数组去重

      rids = arr.join(","); // 把数组转换成字符串

      this.axios
        .get("http://localhost:50774/api/FQX?id=" + this.idd + "&Fid=" + rids)
        .then((val) => {
          this.$message({
            message: "添加成功",
            type: "success",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  props: {
    id: {
      type: Number,
      Request: true,
    },
  },
};
</script>
