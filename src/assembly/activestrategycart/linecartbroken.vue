<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
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
              interval: 0,
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
              "[500, 510)",
              "[510, 520)",
              "[520, 530)",
              "[530, 540)",
              "[540, 550)",
              "[550, 560)",
              "[560, 570)",
              "[570, 580)",
              "[580, 590)",
              "[590, 600)",
              "[600, 610)",
              "[610, 620)",
              "[620, 630)",
              "[620, 630)",
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
              dom += `${item.marker}${item.seriesName}${item.value}%<br>`;
            });
            return dom;
          },
        },
        series: [
          {
            name: "建模样本通过人数占比",
            data: [],
            symbolSize: 8,
            type: "line",
            itemStyle: {
              color: "rgb(73,169,238)",
            },
            lineStyle: {
              color: "rgb(73,169,238)",
            },
          },
          {
            name: "目标客群执行通过人数占比",
            data: [],
            type: "line",
            symbolSize: 8,
            itemStyle: {
              color: "rgb(167,237,137)",
            },
            lineStyle: {
              color: "rgb(167,237,137)",
            },
          },
          {
            name: "对照客群执行通过人数占比",
            data: [],
            type: "line",
            symbolSize: 8,
            itemStyle: {
              color: "rgb(255,237,121)",
            },
            lineStyle: {
              color: "rgb(255,237,121)",
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
      let { contrast, target, sample } = this.rawanum;
      let arr = [];
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      contrast.forEach((item, index) => {
        if (item.totolNumber == 0 || !item.totolNumber) {
          arr1.push(0);
        } else {
          arr1.push(
            ((item.intervalNumber / item.totolNumber) * 100).toFixed(2)
          );
        }
        if (
          sample[index].intervalNumber == 0 ||
          !sample[index].intervalNumber
        ) {
          arr2.push(0);
        } else {
          arr2.push(
            (
              (sample[index].intervalNumber / sample[index].totolNumber) *
              100
            ).toFixed(2)
          );
        }
        if (
          target[index].intervalNumber == 0 ||
          !target[index].intervalNumber
        ) {
          arr3.push(0);
        } else {
          arr3.push(
            (
              (target[index].intervalNumber / target[index].totolNumber) *
              100
            ).toFixed(2)
          );
        }
        arr.push(`[${item.startScore}, ${item.endScore}]`);
      });
      this.$set(this.option.series[0], "data", arr1);
      this.$set(this.option.series[1], "data", arr2);
      this.$set(this.option.series[2], "data", arr3);
      this.$set(this.option.xAxis[0], "data", arr);
      this.readiaechart();
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 350px;
}
</style>
