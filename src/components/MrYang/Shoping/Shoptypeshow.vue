<template>
    <div class="custom-tree-container">
  <div class="block">
    <Shoptypetian></Shoptypetian>
    <el-tree
      :data="data"
      node-key="classId"
      default-expand-all
      :render-content="renderContent"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{data }">
        <span>{{data.className }}</span>
        <span>
          <table>
            <tr>
              <td>
                  <Shoptypeadd v-bind:id="data.classId"></Shoptypeadd>
              </td>
              <td>
                  <Shopmodify v-bind:id="data.classId"></Shopmodify>
              </td>
              <td>
                 <el-button
            type="text"
            size="mini"
            @click="del(data)">
            删除
          </el-button>
              </td>
            </tr>
          </table>
        </span>
      </span>
    </el-tree>
  </div>
</div>
</template>
<script>
  import Shoptypeadd from "@/components/MrYang/Shoping/Shoptypeadd";
  import Shopmodify from "@/components/MrYang/Shoping/Shopmodify";
  import Shoptypetian from "@/components/MrYang/Shoping/Shoptypetian";
  export default {
    data() {
      const data = [];
      return {
        data: JSON.parse(JSON.stringify(data)),
        data: JSON.parse(JSON.stringify(data)),
        classId:"",
        className:"",
      }
    },
     created() {
    //显示
    this.axios
      .get(this.$api+"/api/ClassifySelect")
      .then((response) => { 
        this.data = response.data;
        console.log("ok");
      })
      .catch(function (error) {
        console.log(error);
      });
  },
    methods: {
      del(id) {
      this.$confirm("确认删除此数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(id);
        if(id.children.length==0)
        {
          this.$http.post(this.$api+"/api/ClassifyDelt?id="+id.classId);
        aler("删除成功");
        location.reload();
        }
        else{
            this.$message({
          showClose: true,
          message: '！该节点有子节点,不能删除。',
          type: 'error'
        });
        }
      });
    }
    },
    components: {
    'Shoptypeadd': Shoptypeadd,
    'Shopmodify':Shopmodify,
    'Shoptypetian':Shoptypetian
  },
  };
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>