<template>
  <div class="act">
    <actcheck @click.native="checkact(1)" :active="ishact[1]">123</actcheck>
    <actcheck @click.native="checkact(2)" :active="ishact[2]">123</actcheck>
    <actcheck @click.native="checkact(3)" :active="ishact[3]">123</actcheck>
    <div
      style="
        font-size: 30px;
        font-weight: normal;
        display: flex;
        align-items: center;
      "
    >
      {<el-input style="width: 50px"></el-input>}
    </div>
    <el-dialog title="123" :visible.sync="ish">
      <el-steps :active="1" style="width: 50%; margin: 0 auto">
        <el-step title="基本信息">1</el-step>
        <el-step title="规则配置">2</el-step>
      </el-steps>
    </el-dialog>
    <div>
      <el-tree
        :data="list"
        :props="pop"
        @node-click="(data, node, item) => NodeClick(data, node, item)"
      >
        <span class="custom-tree-node" slot-scope="{ data, node }">
          <span class="far">
            <div class="border" v-if="node.level==1"></div>
            <div class="border1" v-if="data.children && node.level > 1"></div>
            <img
              v-if="node.level === 1"
              class="one-icon"
              :src="require('@/assets/icon/u11885.svg')"
            />
            <img
              v-if="node.level == 2"
              class="two-icon"
              :src="require('@/assets/icon/u11885.svg')"
            />
            <img
              v-if="!data.children"
              :src="require('@/assets/icon/u11888.svg')"
            />
            {{ data.lable }}
          </span>
        </span>
      </el-tree>
    </div>
    
    <Pickdata @change="actdata"></Pickdata>
  </div>
</template>

<script>
import actcheck from "./activecheck.vue";
import Pickdata from "./pickdata.vue";
export default {
  components: {
    actcheck,
    Pickdata,
  },
  data() {
    return {
      value2: [],
      ish: false,
      ishact: [false, false, false],
      list: [
        {
          lable: "123",
          children: [
            {
              lable: "123",
              children: [
                {
                  lable: "123",
                  children: null,
                },
              ],
            },
          ],
        },
        {
          lable: "123",
          children: [
            {
              lable: "123",
              children: [
                {
                  lable: "123",
                  children: null,
                },
              ],
            },
          ],
        },
        {
          lable: "123",
          children: [
            {
              lable: "123",
              children: [
                {
                  lable: "123",
                  children: null,
                },
              ],
            },
          ],
        },
        { lable: "123", children: [] },
      ],
      pop: {
        lable: "lable",
        children: "children",
      },
      // pickerOptions: {
      //   shortcuts: [
      //     {
      //       text: "最近一周",
      //       onClick(picker) {
      //         const end = new Date();
      //         const start = new Date();
      //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      //         console.log(start);
      //         picker.$emit("pick", [start, end]);
      //       },
      //     },
      //     {
      //       text: "最近一个月",
      //       onClick(picker) {
      //         const end = new Date();
      //         const start = new Date();
      //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      //         picker.$emit("pick", [start, end]);
      //       },
      //     },
      //     {
      //       text: "最近三个月",
      //       onClick(picker) {
      //         const end = new Date();
      //         const start = new Date();
      //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      //         picker.$emit("pick", [start, end]);
      //       },
      //     },
      //     {
      //       text: "最近一周",
      //       onClick(picker) {
      //         const end = new Date();
      //         const start = new Date();
      //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      //         console.log(start);
      //         picker.$emit("pick", [start, end]);
      //       },
      //     },
      //     {
      //       text: "最近一个月",
      //       onClick(picker) {
      //         const end = new Date();
      //         const start = new Date();
      //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      //         picker.$emit("pick", [start, end]);
      //       },
      //     },
      //     {
      //       text: "最近三个月",
      //       onClick(picker) {
      //         const end = new Date();
      //         const start = new Date();
      //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      //         picker.$emit("pick", [start, end]);
      //       },
      //     },
      //   ],
      // },
    };
  },
  mounted() {
    this.pickmet();
  },
  methods: {
    pickmet() {
      console.log(this.$refs["pick"]);
    },
    checkact(v) {
      console.log(v);
      this.ishact = [false, false, false];
      this.ishact[v] = true;
    },
    icon() {},
    NodeClick(a, b, c, d) {
      console.log(a, b, c, d);
    },
    actdata(v) {},
  },
};
</script>

<style lang="scss" >
.one-icon {
  width: 23px;
  height: 19px;
}
.two-icon {
  width: 17px;
  height: 15px;
}
.far {
  position: relative;
}
.border {
  position: absolute;
  top: 6%;
  left: 3%;
  width: 19px;
  height: 2px;
  background-color: #fff;
}
.border1 {
  position: absolute;
  top: 30%;
  left: 0;
  width: 17px;
  height: 1px;
  background-color: #fff;
}
div {
  margin: 0;
  padding: 0;
}
.act {
  width: 400px;
  display: flex;
  justify-content: space-around;
}
.el-step__icon,
.is-text {
  background-color: rgb(71, 203, 149);
}

::v-deep .el-step.is-center .el-step__line {
  left: 0;
  right: 0;
}
::v-deep .el-step:last-of-type .el-step__line {
  display: inline-block;
}
/*圆圈中间序号字体颜色*/
::v-deep .el-step__icon.is-text {
  color: #c0c4cc;
}
/*完成状态——圆圈边框颜色*/
::v-deep .el-step__head.is-finish {
  border-color: rgb(71, 203, 149);
}
/*完成状态——圆圈背景颜色*/
::v-deep .is-finish .el-step__icon.is-text {
  background: rgb(71, 203, 149);
}
/*完成状态——横线颜色设置*/
::v-deep .is-finish .el-step__line {
  background-color: rgb(201, 201, 201);
}
/*等待状态——序号颜色、圆圈边框颜色*/
::v-deep .el-step__head.is-process {
  border-color: #c0c4cc;
}
/*等待状态——圆圈背景颜色*/
::v-deep .is-process .el-step__icon.is-text {
  background: #fff;
}
/*完成状态——tips字体设置*/
::v-deep .el-step__title.is-finish {
  font-size: 12px;
  color: black;
}
/*等待状态——tips字体设置*/
::v-deep .el-step__title.is-process {
  color: #c0c4cc;
  font-size: 12px;
  font-weight: normal;
}
</style>