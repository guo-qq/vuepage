<template>
  <el-form>
    <el-button type="text" @click="dialogFormVisible = true"
      >添 加 商 品</el-button
    >
    <div class="dialog">
      <el-dialog
        title="添加商品"
        style="font-size: 20px"
        :visible.sync="dialogFormVisible"
      >
        <div class="bigdiv">
          <el-input
            v-model="Condition"
            size="mini"
            placeholder="输入关键字搜索"
            style="width: 300px"
          />
          <el-button type="primary" @click="selll()">搜索</el-button>
          <el-tree
            :data="data"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            class="el-tree"
            highlight-current
            :props="defaultProps"
          >
          </el-tree>

          <el-table
            class="el-table"
            ref="multipleTable"
            :data="gridData"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="cargoName" label="商品名称" width="120">
            </el-table-column>
            <el-table-column prop="unitPice" label="采购价格" width="120">
            </el-table-column>
            <el-table-column prop="className" label="商品分类" width="120">
            </el-table-column>
            <el-table-column
              prop="cargoCount"
              label="库存"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="que()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-form>
</template>

<style scoped>
.bigdiv {
  width: 95%;
  height: 400px;
}
.dialog {
  width: 85%;
}
.el-tree {
  width: 170px;
  float: left;
}
.el-table {
  width: 526px;
  float: right;
}
</style>

<script>
export default {
  data() {
    return {
      gridData: [],
      multipleSelection: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      Condition: "",
      items: [],
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    que() {
      this.dialogFormVisible = false;
      console.log(this.items);
      this.$emit("signStatus", this.items);
    },
    selll() {
      this.Getshoop();
    },
    Getshoop() {
      this.axios
        .get("http://localhost:50774/api/ChoiceShoop", {
          params: {
            name: this.Condition,
          },
        })
        .then((res) => {
          this.gridData = res.data;
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      this.items = val;
    },

    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
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
  },
  mounted() {
    this.Getshoop();
  },
};
</script>