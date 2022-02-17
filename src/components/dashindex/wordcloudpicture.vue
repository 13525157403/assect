<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import "echarts-wordcloud";
import echarts from "echarts";
export default {
  props: ["rawanum"],
  data() {
    return {
      option: {
        num: [],
        tooltip: {
          show: true,
          position: "top",
          textStyle: {
            fontSize: 30,
          },
          formatter: (p) => {
            return this.num[p.dataIndex];
          },
        },
        series: [
          {
            type: "wordCloud",
            // 网格大小，各项之间间距
            gridSize: 15,
            // 形状 circle 圆，cardioid  心， diamond 菱形，
            // triangle-forward 、triangle 三角，star五角星
            shape: "circle",
            // 字体大小范围
            sizeRange: [14, 100],
            // 文字旋转角度范围
            rotationRange: [0, 90],
            // 旋转步值
            rotationStep: 90,
            // 自定义图形
            // maskImage: maskImage,
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            // 画布宽
            width: "90%",
            // 画布高
            height: "80%",
            // 是否渲染超出画布的文字
            drawOutOfBound: false,
            textStyle: {
              normal: {
                color: function () {
                  const rodom = Math.round(Math.random() * 10);
                  let index = 0;
                  if (rodom > 5) {
                    index = rodom - 5;
                  } else {
                    index = rodom;
                  }
                  return [
                    "rgb(68,137,242)",
                    "rgb(68,137,242)",
                    "rgb(53,164,254)",
                    "rgb(180,208,250)",
                    "rgb(180,208,250)",
                    "rgb(154,210,255)",
                  ][index];
                  // "rgb(" +
                  // [
                  //   Math.round(Math.random() * 200 + 55),
                  //   Math.round(Math.random() * 200 + 55),
                  //   Math.round(Math.random() * 200 + 55),
                  // ].join(",") +
                  // ")"
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#2ac",
              },
            },
            data: [
              // {
              //   name: "消费贷款",
              //   value: 50,
              //   // textStyle: { normal: { color: "red" } },
              // },
              // { name: "装修", value: 28 },
              // { name: "生意周转", value: 24 },
              // { name: "数码产品", value: 23 },
              // { name: "生产经营", value: 22 },
              // { name: "个体户贷款", value: 21 },
              // { name: "自驾游", value: 20 },
              // { name: "租房买房", value: 29 },
              // { name: "贷款", value: 28 },
              // { name: "教育消费", value: 27 },
              // { name: "个人资金周转", value: 26 },
              // { name: "学费贷款", value: 25 },
              // { name: "购车位", value: 24 },
              // { name: "汽车装饰", value: 30 },
              // { name: "创业贷款", value: 18 },
            ],
          },
        ],
      },
    };
  },
  watch: {
    rawanum() {
      this.readata();
    },
  },
  mounted() {},
  methods: {
    readiaechart() {
      this.$nextTick(() => {
        const myChart = echarts.init(this.$refs.myEchart);
        myChart.setOption(this.option);
        window.onresize = myChart.resize;
      });
    },
    readata() {
      let { list } = this.rawanum;
      let arr = [...list];
      let dataArr = [];
      arr.sort((a, b) => {
        return b.countNum - a.countNum;
      });
      this.num = [];
      arr.forEach((item, index) => {
        this.num.push(item.countNum);
        if (index == 0) {
          dataArr.push({ name: item.countType, value: 100 });
        } else {
          dataArr.push({
            name: item.countType,
            value: (item.countNum / arr[0].countNum) * 100,
          });
        }
      });
      this.$refs.myEchart.removeAttribute("_echarts_instance_");
      this.$set(this.option.series[0], "data", dataArr);
      this.$nextTick(() => {
        this.readiaechart();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 300px;
}
</style>
