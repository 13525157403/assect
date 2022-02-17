<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '110%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    amt: {},
    color: {},
  },
  data() {
    return {
      tooltip: [],
      option: {
        tooltip: {
          trigger: "axis",
          formatter: (p) => {
            return `<div>${p[0].name}</div>
            <div>max:${this.tooltip[p[0].dataIndex].max}</div>
            <div>min:${this.tooltip[p[0].dataIndex].min}</div>`;
          },
          axisPointer: {
            type: "none",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgb(235,235,235)",
              },
            },
            boundaryGap: false,
            axisLabel: {
              interval: 0,
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
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgb(235,235,235)",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
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
        series: [
          {
            z: -1,
            name: "Direct",
            type: "bar",
            barWidth: 15,
            data: [150, 600, 140, 260, 400, 190, 340, 560, 260],
            itemStyle: {
              color: this.color,
            },
          },
          {
            z: 2,
            name: "2020",
            type: "bar",
            barWidth: 45,
            barGap: "-105%",
            itemStyle: {
              normal: {
                border: 0,
                color: "rgb(255,255,255)",
              },
            },
            data: [120, 540, 100, 100, 300, 100, 140, 360, 160],
          },
        ],
      },
    };
  },
  watch: {
    amt() {
      this.amtdata();
      this.$nextTick(() => {
        this.Readiaechart();
      });
    },
  },
  methods: {
    Readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart);
      myChart.setOption(this.option);
      window.onresize = myChart.resize;
    },
    amtdata() {
      let arr1 = [];
      let arr2 = [];
      let time = [];
      let zoom = [];
      this.amt.forEach((i) => {
        this.tooltip.push({ min: i.min, max: i.max });
        time.push(String(i.time).slice(5, 7) + "月");
        if (i.min == i.max) {
          arr1.push(i.max-2);
        } else {
          arr1.push(i.min);
        }
        arr2.push(i.max);
      });
      this.$set(this.option, "dataZoom", zoom);
      this.$set(this.option.xAxis[0], "data", time);
      this.$set(this.option.series[0], "data", arr2);
      this.$set(this.option.series[1], "data", arr1);
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
