<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["allpeople", "color", "bordercolor"],
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "15%",
          left: "10%",
          right: "10%",
          bottom: "15%",
        },
        dataZoom: [],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              // 坐标轴轴线相关设置。数学上的x轴
              show: false,
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLabel: {
              show: false,
              // 坐标轴刻度标签的相关设置
              textStyle: {
                color: "#000",
                padding: 14,
                fontSize: 14,
              },
              formatter: function (data) {
                return data;
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
            data: [1, 2, 3, 4, 5],
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
              show: false,
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000",
                padding: 16,
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
        dataZoom: [],
        series: [
          {
            name: "总人数",
            type: "line",
            symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            areaStyle: {
              // 区域填充样式
              normal: {
                color: this.bordercolor,
              },
            },
            lineStyle: {
              normal: {
                width: 2,
                color: this.color, // 线条颜色
              },
              borderColor: "rgba(0,0,0,.4)",
            },
            itemStyle: {
              color: "rgb(115,101,238)",
              borderWidth: 2,
            },
            tooltip: {
              show: true,
            },
            data: [50, 50, 50, 50, 50],
          },
        ],
      },
    };
  },
  mounted() {
    if (!this.allpeople) {
      this.$nextTick(() => {
        this.Readiaechart();
      });
    }
  },
  watch: {
    allpeople() {
      this.alldata()
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
    alldata(){
      let arr1=[]
      let arr2=[]
      this.allpeople.map((i)=>{
        arr1.push(i.countNum)
        arr2.push(String(i.countDate).slice(5,10))
      })
      this.$set(this.option.series[0],'data',arr1)
      this.$set(this.option.xAxis[0],'data',arr2)
    }
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 200px;
}
</style>
