<template>
  <div
    class="echarts"
    ref="echarts"
    :style="{ height: maxHeight, width: '980px' }"
  >
    <div ref="myEchart" :style="{ height: maxHeight, width: '980px' }" />
  </div>
</template>

<script>
import echarts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  props: ["amt", "reg", "height"],
  data() {
    return {
      ish: false,
      insterdeg: 0,
      option: {
        tooltip: {
          trigger: "item",
          formatter: function (p) {
            return `${p.name}\n${p.value}`;
          },
        },
        grid: {
          left: "3%",
          right: "10%",
          containLabel: true,
        },
        yAxis: [],
        xAxis: [],
        series: [
          {
            name: "Direct",
            type: "bar",
            stack: "Total",
            barWidth: 24,
            data: [15, 60, 14],
            label: {
              show: true,
              position: "right",
              color: "#000",
              formatter: function (p) {},
            },
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              color: "rgb(73,169,238)",
            },
          },
        ],
      },
      xAxis: [
        {
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgb(235,235,235)",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            rotate: 0,
            textStyle: {
              color: "rgb(102,102,102)",
              fontSize: 12,
            },
          },
          splitLine: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: "category",
          interval: 0,
          data: [],
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgb(235,235,235)",
            },
          },
          axisLabel: {
            interval: 0,
            rotate: 0,
            textStyle: {
              color: "rgb(102,102,102)",
              fontSize: 12,
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
      ],
      maxHeight: "0",
    };
  },
  watch: {
    amt: function () {
      this.amtdata();
    },
    reg() {
      this.regdata();
    },
  },
  mounted() {
    let that = this;
    var erd = elementResizeDetectorMaker();
    erd.listenTo(this.$refs.echarts, function (element) {
      that.$nextTick(function () {
        echarts.init(that.$refs.myEchart).resize();
      });
    });

    if (this.amt && this.amt.length !== 0) {
      this.amtdata();
    }
  },
  methods: {
    Readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart);
      myChart.setOption(this.option);
      window.onresize = myChart.resize;
    },
    regdata() {
      if (this.reg) {
        this.maxHeight = "240px";
        this.$refs.myEchart.removeAttribute("_echarts_instance_");
        this.option.xAxis = this.yAxis;
        this.option.yAxis = this.xAxis;
        this.$set(this.yAxis[0].axisLabel, "rotate", this.insterdeg);
        this.$set(this.option.series[0].label, "position", "top");
        this.$nextTick(function () {
          this.Readiaechart();
        });
      } else {
        this.maxHeight = this.height;
        this.$refs.myEchart.removeAttribute("_echarts_instance_");
        this.$set(this.yAxis[0].axisLabel, "rotate", 0);
        this.$set(this.option.series[0].label, "position", "right");
        this.option.xAxis = this.xAxis;
        this.option.yAxis = this.yAxis;
        this.$nextTick(function () {
          this.Readiaechart();
        });
      }
    },
    amtdata() {
      const arr1 = [];
      const arr2 = [];
      this.insterdeg = 0;
      this.amt.forEach((i) => {
        arr1.push(i.countNum);
        arr2.push(i.countType);
      });
      if (arr2.length >= 9) {
        this.insterdeg = 30;
      } else {
        this.insterdeg = 0;
      }
      this.$set(this.option.series[0], "data", arr1);
      this.$set(this.yAxis[0], "data", arr2);
      this.regdata();
    },
  },
};
</script>
