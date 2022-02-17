<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '110%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["amt"],
  data() {
    return {
      option: {
        title: {
          text: "{a|人数}\n{b|占比}",
          textStyle: {
            rich: {
              a: {
                color: "rgb(127,127,127)",
                height: "22",
              },
              b: {
                color: "rgb(127,127,127)",
              },
            },
          },
          right: "35%",
        },
        tooltip: {
          trigger: "axis",
          formatter: (p) => {
            let dom = `<div>${p[0].name}</div>`;
            p.forEach((item) => {
              switch (item.seriesIndex) {
                case 3:
                  dom += `<span style=\"display:inline-block;margin-right:5px;border-radius:10px;border:2px solid rgb(73,169,238);width:10px;height:10px;background-color:rgb(111,111,111);\"></span>${item.seriesName.replace(
                    "人数",
                    "率"
                  )}${item.value}%<br>`;
                  break;
                case 4:
                  dom += `<span style=\"display:inline-block;margin-right:5px;border:2px solid rgb(152,216,125);width:10px;height:10px;background-color:rgb(111,111,111);border-radius:10px;\"></span>${item.seriesName.replace(
                    "人数",
                    "率"
                  )}${item.value}%<br>`;
                  break;
                case 5:
                  dom += `<span style=\"display:inline-block;margin-right:5px;border:2px solid rgb(255,216,110);width:10px;height:10px;background-color:rgb(111,111,111);border-radius:10px;\"></span>${item.seriesName.replace(
                    "人数",
                    "率"
                  )}${item.value}%<br>`;
                  break;
              }
              if (item.seriesIndex < 3) {
                dom += `${item.marker}${item.seriesName}${item.value}<br>`;
              }
            });
            return dom;
          },
          // textStyle: {
          //   color: "#000",
          //   padding: "10",
          // },
          // extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
          // backgroundColor: "#fff",
          // borderColor: "#000",
        },
        axisPointer: {
          link: { xAxisIndex: "all" },
          lineStyle: {
            color: "rgba(0,0,0,0)",
          },
          label: {
            backgroundColor: "#fff",
          },
        },
        legend: [
          {
            top: "0",
            right: "2%",
            data: [
              "建模样本通过人数",
              "目标客群执行通过人数",
              "对照客群执行通过人数",
              "\n",
            ],
            padding: [8, 20],
            itemWidth: 8,
            itemHeight: 8,
          },
          {
            top: "20",
            right: "5%",
            icon: "path://M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z",
            data: [
              "建模样本通过人数",
              "目标客群执行通过人数",
              "对照客群执行通过人数",
            ],
            padding: [8, 20],
            itemWidth: 8,
            itemHeight: 8,
            formatter: function (p) {
              return `${p.substring(0, p.length - 2)}率`;
            },
          },
        ],
        grid: [
          {
            top: "55",
            left: 0,
            right: 0,
            height: "40%",
          },
          {
            left: 0,
            right: 0,
            top: "62%",
            height: "26%",
          },
        ],
        xAxis: [
          {
            type: "category",
            data: [
              "调额人数",
              "有支用的客户数",
              "当前未发生逾期",
              "最大历史逾期时长<=3天",
              "至少有3次以上还款（先息后本不记入内）",
              "当前额度使用率<=90%",
              "近3个月未提额",
              "风险等级为A B C(D档客户不提额)",
              "boost分数>=500",
              "贷中评分模型分数>=570",
            ],
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgb(235,235,235)",
              },
            },
            axisLabel: {
              show: true,
              interval: 0,
              formatter: function (params) {
                var newParamsName = ""; // 最终拼接成的字符串
                var paramsNameNumber = params.length; // 实际标签的个数
                var provideNumber = 7; // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ""; // 表示每一次截取的字符串
                    var start = p * provideNumber; // 开始截取的位置
                    var end = start + provideNumber; // 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p == rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr; // 最终拼成的字符串
                  }
                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }
                //将最终的字符串返回
                return newParamsName;
              },
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
          {
            gridIndex: 1,
            type: "category",
            data: [
              "调额人数对照",
              "有支用的客户数对照",
              "当前未发生逾期对照",
              "最大历史逾期时长<=3天对照",
              "至少有3次以上还款（先息后本不记入内对照",
              "当前额度使用率<=90%对照",
              "近3个月未提额对照",
              "风险等级为A B C(D档客户不提额)对照",
              "boost分数>=500对照",
              "贷中评分模型分数>=570对照",
            ],
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgb(235,235,235)",
              },
            },
            axisLabel: {
              show: false,
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
            position: "top",
          },
        ],
        yAxis: [
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
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
          {
            gridIndex: 1,
            type: "value",
            inverse: true,
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
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          //上半部分
          {
            name: "建模样本通过人数",
            type: "bar",
            barWidth: 10,
            symbolSize: 4,
            color: "",
            data: [10, 15, 70, 65, 40, 32, 78, 34, 45, 12],
            itemStyle: {
              color: "rgb(73,169,238)",
            },
          },
          {
            name: "目标客群执行通过人数",
            type: "bar",
            barWidth: 10,
            symbolSize: 4,
            data: [104, 45, 20, 35, 20, 80, 40, 10, 15, 70],
            itemStyle: {
              color: "rgb(152,216,125)",
            },
          },
          {
            name: "对照客群执行通过人数",
            type: "bar",
            symbolSize: 4,
            barWidth: 10,
            data: [35, 30, 10, 25, 69, 20, 15, 34, 67, 12],
            itemStyle: {
              color: "rgb(255,216,110)",
            },
          },
          //下半部分
          {
            name: "建模样本通过率",
            type: "bar",
            barWidth: 10,
            symbolSize: 4,
            xAxisIndex: 1,
            yAxisIndex: 1,
            color: "",
            data: [10, 15, 70, 65, 40, 32, 40, 78, 59, 61],
            itemStyle: {
              color: "#fff",
              borderColor: "rgb(73,169,238)",
            },
          },
          {
            name: "目标客群执行通过率",
            type: "bar",
            barWidth: 10,
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 4,
            data: [5, 45, 20, 35, 20, 60, 40, 34, 23, 12],
            itemStyle: {
              color: "#fff",
              borderColor: "rgb(152,216,125)",
            },
          },
          {
            name: "对照客群执行通过率",
            type: "bar",
            symbolSize: 4,
            xAxisIndex: 1,
            yAxisIndex: 1,
            barWidth: 10,
            data: [35, 30, 10, 25, 69, 20, 15, 12, 67, 54],
            itemStyle: {
              color: "#fff",
              borderColor: "rgb(255,216,110)",
            },
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    Readiaechart() {
      this.$nextTick(() => {
        const myChart = echarts.init(this.$refs.myEchart);
        myChart.setOption(this.option);
        window.onresize = myChart.resize;
      });
    },
    amtdata() {
      let data = {
        name: [],
        arr1: [],
        arr2: [],
        arr3: [],
        arr4: [],
        arr5: [],
        arr6: [],
      };
      this.amt.forEach((item) => {
        data.arr1.push(item.configPassedNumber);
        data.arr2.push(item.executionPassedNumber);
        data.arr3.push(item.contrastPassedNumber);
        if (item.configTotalNumber != 0 && item.configTotalNumber) {
          data.arr4.push(
            ((item.configPassedNumber / item.configTotalNumber) * 100).toFixed(
              2
            )
          );
        } else {
          data.arr4.push(0);
        }
        if (item.executionTotalNumber != 0 && item.executionTotalNumber) {
          data.arr5.push(
            (
              (item.executionPassedNumber / item.executionTotalNumber) *
              100
            ).toFixed(2)
          );
        } else {
          data.arr5.push(0);
        }
        if (item.contrastTotalNumber != 0 && item.contrastTotalNumber) {
          data.arr6.push(
            (
              (item.contrastPassedNumber / item.contrastTotalNumber) *
              100
            ).toFixed(2)
          );
        } else {
          data.arr6.push(0);
        }
        data.name.push(item.ruleName);
      });
      for (let i = 1; i < 7; i++) {
        this.$set(this.option.series[i - 1], "data", data["arr" + i]);
      }
      this.$set(this.option.xAxis[0], "data", data.name);
      this.$set(this.option.xAxis[1], "data", data.name);
      this.Readiaechart();
    },
  },
  watch: {
    amt() {
      this.amtdata();
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 450px;
}
</style>
