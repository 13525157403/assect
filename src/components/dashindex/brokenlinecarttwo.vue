<template>
  <div class="echarts" ref="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  props: ["rawanum"],
  data() {
    return {
      option: {
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              // 坐标轴轴线相关设置。数学上的x轴
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLabel: {
              // interval: 0,
              // 坐标轴刻度标签的相关设置
              textStyle: {
                color: "#000",
                margin: 0,
                fontSize: 12,
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisTick: {
              show: false,
            },
            data: [
              "10/02",
              "10/03",
              "10/04",
              "10/05",
              "10/06",
              "10/07",
              "10/08",
            ],
          },
        ],
        yAxis: [
          {
            min: 0,
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000",
                padding: 0,
              },
              formatter: function (value) {
                if (value === 0) {
                  return value;
                }
                return value;
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          formatter: (p) => {
            let dom = `<div>${p[0].axisValueLabel}</div>`;
            p.forEach((item) => {
              dom += `${item.marker}${item.seriesName}${item.value}<br>`;
            });
            return dom;
          },
        },
        dataZoom: [],
        series: [
          {
            name: "监控人次",
            data: [40, 60, 80, 100, 32, 43, 45],
            symbolSize: 4,
            type: "line",
            itemStyle: {
              color: "rgb(152,216,125)",
            },
            lineStyle: {
              color: "rgb(152,216,125)",
              width: 3,
            },
          },
          {
            name: "预警人次",
            data: [60, 40, 29, 12, 36, 89, 67],
            type: "line",
            symbolSize: 4,
            itemStyle: {
              color: "rgb(244,145,136)",
              type: "",
            },
            lineStyle: {
              color: "rgb(244,145,136)",
              width: 3,
            },
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
  mounted() {
    let that = this;
    var erd = elementResizeDetectorMaker();
    erd.listenTo(this.$refs.echarts, function (element) {
      that.$nextTick(function () {
        echarts.init(that.$refs.myEchart).resize();
      });
    });
  },
  methods: {
    readiaechart() {
      this.$nextTick(() => {
        const myChart = echarts.init(this.$refs.myEchart);
        myChart.setOption(this.option);
        window.onresize = myChart.resize;
      });
    },
    readata() {
      let { alert, monitor } = this.rawanum;
      alert.sort((a, b) => {
        return a.countDate > b.countDate ? 1 : -1;
      });
      monitor.sort((a, b) => {
        return a.countDate > b.countDate ? 1 : -1;
      });
      let alertArr = [];
      let monitorArr = [];
      let dataArr = [];
      let zoom = [{ show: false }];
      alert.forEach((item, index) => {
        alertArr.push(item.countNum);
        dataArr.push(String(item.countDate).slice(5, 10));
        monitorArr.push(monitor[index].countNum);
      });
      if (dataArr.length > 7) {
        zoom = [{ show: true }];
      } else {
        zoom = [{ show: false }];
      }
      this.$set(this.option, "dataZoom", zoom);
      this.$set(this.option.series[0], "data", monitorArr);
      this.$set(this.option.series[1], "data", alertArr);
      this.$set(this.option.xAxis[0], "data", dataArr);
      this.$refs.myEchart.removeAttribute("_echarts_instance_");
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
