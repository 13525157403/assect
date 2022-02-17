<template>
  <div class="echarts" ref="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>
<script>
import echarts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  props: {
    eIdData: {
      type: Array,
      Object,
      default: null,
    },
  },
  data() {
    return {
      option: {
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              // 坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: "rgb(121,121,121)",
              },
            },
            axisLabel: {
              // 坐标轴刻度标签的相关设置
              textStyle: {
                color: "#000",
                padding: 10,
                fontSize: 14,
              },

              formatter: function (data) {
                return data;
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(121,121,121)",
              },
            },

            data: ["0", "1万", "2万", "3万", "4万", "5万"],
          },
        ],
        yAxis: [
          {
            min: 0,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(121,121,121)",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgb(121,121,121)",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000",
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
        series: [
          {
            name: "客户量",
            symbolSize: 20,
            color: "rgb(103,206,223)",
            data: [
              [0.6, 70],
              [1.5, 65],
            ],
            type: "scatter",
          },
          {
            symbolSize: 10,
            color: "rgb(103,206,223)",
            data: [
              [3.0, 90.04],
              [4.3, 55],
            ],
            type: "scatter",
          },
          {
            symbolSize: 30,
            color: "rgb(103,206,223)",
            data: [
              [3.4, 60.81],
              [0.8, 40],
            ],
            type: "scatter",
          },
        ],
        legend: {
          align: "left",
          right: "10%",
          top: "10%",
          type: "plain",
          textStyle: {
            color: "#000",
            fontSize: 14,
          },
          padding: -5,
          itemGap: 20,
          itemWidth: 20,
          data: [
            {
              name: "客户量",
            },
          ],
        },
        tooltip: {
          show: true,
          formatter: (p) => {
            const a = this.sum2[p.componentIndex];
            const dom = `<div>
            <div>平均值:${p.data[1].toFixed(0)}</div>
            <div>客户人数:${a}人</div>
            </div>`;
            return dom;
          },
        },
      },
      num: [0, 0, 0, 0, 0],
      sum2: [],
    };
  },
  watch: {
    // 监听props传参触发重构气泡图数组
    eIdData(v) {
      console.log(v, "this.SeriesData");
      this.SeriesData();
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
    this.SeriesData();
  },
  methods: {
    // 实例化图表
    Readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart);
      myChart.setOption(this.option);
      window.onresize = myChart.resize;
    },
    // 通过props传参重构气泡图数组
    SeriesData() {
      const arr1 = [];
      const arr2 = [];
      const arr3 = [];
      const arr4 = [];
      const arr5 = [];
      this.eIdData.forEach((i, m) => {
        if (i.loanBalance - 0 <= 10000) {
          arr1.push(this.eIdData[m]);
        } else if (i.loanBalance - 0 <= 20000) {
          arr2.push(this.eIdData[m]);
        } else if (i.loanBalance - 0 <= 30000) {
          arr3.push(this.eIdData[m]);
        } else if (i.loanBalance - 0 <= 40000) {
          arr4.push(this.eIdData[m]);
        } else if (i.loanBalance - 0 <= 50000) {
          arr5.push(this.eIdData[m]);
        }
      });
      const sum = [0, 0, 0, 0, 0];
      const sum1 = [0, 0, 0, 0, 0];
      const sum2 = [0, 0, 0, 0, 0];
      if (arr1.length !== 0) {
        arr1.forEach((i) => {
          sum[0] += i.loanBalance - 0;
          sum1[0] += i.fraudScore - 0;
        });
        sum2[0] = arr1.length;
        this.num[0] = sum[0] / arr1.length;
      }
      if (arr2.length !== 0) {
        arr2.forEach((i) => {
          sum[1] += i.loanBalance - 0;
          sum1[1] += i.fraudScore - 0;
        });
        sum2[1] = arr2.length;
        this.num[1] = sum[1] / arr1.length;
      }
      if (arr3.length !== 0) {
        arr3.forEach((i) => {
          sum[2] += i.loanBalance - 0;
          sum1[2] += i.fraudScore - 0;
        });
        sum2[2] = arr3.length;
        this.num[2] = sum[2] / arr1.length;
      }
      if (arr4.length !== 0) {
        arr4.forEach((i) => {
          sum[3] += i.loanBalance - 0;
          sum1[3] += i.fraudScore - 0;
        });
        sum2[3] = arr4.length;
        this.num[3] = sum[3] / arr1.length;
      }
      if (arr5.length !== 0) {
        arr5.forEach((i) => {
          sum[4] += i.loanBalance - 0;
          sum1[4] += i.fraudScore - 0;
        });
        sum2[4] = arr5.length;
        this.num[4] = sum[4] / arr1.length;
      }
      this.sum2 = sum2;
      const arrs = [];
      for (let i = 0; i < 5; i++) {
        arrs.push({
          name: "客户量",
          symbolSize: 5 * sum2[i],
          color: "rgb(103,206,223)",
          data: [[(this.num[i] - 0) / 10000, sum1[i] / sum2[i]]],
          type: "scatter",
        });
      }
      this.$set(this.option, "series", arrs);
      this.$nextTick(() => {
        this.Readiaechart();
      });
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
