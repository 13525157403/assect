<template>
  <div class="dashboard-editor-container">
    <el-row style="color:#535353;">
      <div style="font-size:25px">网商贷一期</div>
      <div style="font-size:20px;margin:10px 0 0 20px">高德地址评分</div>
    </el-row>
    <el-row :gutter="40" class="panel-group">
      <el-col :span="13" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <el-row type="flex">
            <el-col :span="7" align="center">
              <div class="flexrows">
                <div style="margin-left:30px;margin-botton:5px;height:18px"><i class="el-icon-question" /></div>
                <div style="font-size:20px;font-weight:bold;margin-bottom:5px">5</div>
                <div style="font-weight:500">累计预警人数</div>
              </div>
            </el-col>
            <div style="width:2px;margin:auto 0">/</div>
            <el-col :span="7" align="center">
              <div class="flexrows">
                <div style="margin-left:30px;margin-botton:5px;height:18px"><i /></div>
                <div style="font-size:20px;font-weight:bold;margin-bottom:5px">986659</div>
                <div style="font-weight:500">累计监控人数（人）</div>
              </div>
            </el-col>
            <el-divider direction="vertical" />
            <el-col :span="7">
              <div class="flexrows">
                <div style="display:flex;width:60%;border-bottom:3px solid #FF00FF;padding-bottom:5px">
                  <div>今日监控人数</div>
                  <div style="margin-left:auto;font-weight:bold">15</div>
                </div>
                <div style="width:60%;display:flex">
                  <div style="margin-left:auto"><i class="el-icon-top-right" style="color:green;font-weight:bold">0.1</i></div>
                </div>
                <div style="display:flex;width:60%;border-bottom:3px solid #FF00FF;padding-bottom:5px;margin-top:10px">
                  <div>平均每日监控人数</div>
                  <div style="margin-left:auto;font-weight:bold">3</div>
                </div>
                <div style="width:60%;display:flex">
                  <div style="margin-left:auto"><i class="el-icon-top-right" style="color:green;font-weight:bold">0.1</i></div>
                </div>
              </div>
            </el-col>
            <el-col :span="3" align="center">
              <div class="flexrows">
                <div><i class="el-icon-d-arrow-right" style="font-size:40px;color:blue" /></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="11" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <el-row type="flex">
            <el-col :span="7" align="center">
              <div class="flexrows">
                <div style="margin-left:30px;margin-botton:5px;height:18px"><i /></div>
                <div style="font-size:20px;font-weight:bold;margin-bottom:5px">96.75<span style="font-size:12px">万</span></div>
                <div style="font-weight:500">累计评分次数</div>
              </div>
            </el-col>
            <el-divider direction="vertical" />
            <el-col :span="21">
              <div class="flexrows">
                <div style="display:flex;width:90%;border-bottom:3px solid #FF00FF;padding-bottom:5px">
                  <div>今日地址评分（次）</div>
                  <div style="margin-left:auto;font-weight:bold">5000</div>
                </div>
                <div style="width:90%;display:flex">
                  <div style="margin-left:auto"><i class="el-icon-top-right" style="color:green;font-weight:bold">0.1</i></div>
                </div>
                <div style="display:flex;width:90%;border-bottom:3px solid #FF00FF;padding-bottom:5px;margin-top:10px">
                  <div>平均每日评分（次）</div>
                  <div style="margin-left:auto;font-weight:bold">50</div>
                </div>
                <div style="width:90%;display:flex">
                  <div style="margin-left:auto"><i class="el-icon-top-right" style="color:green;font-weight:bold">0.1</i></div>
                </div>
              </div>
            </el-col>
            <el-col :span="3" align="center">
              <div class="flexrows">
                <div><i class="el-icon-d-arrow-right" style="font-size:40px;color:blue" /></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="8" class="card-panel-lable">
        <div style="font-size:22px;margin: 10px 0 10px 10px">评分情况</div>
        <div id="pieReport" style="width:100%;height:400px;" />
      </el-col>
      <el-col :span="8" class="card-panel-lable">
        <div style="font-size:22px;margin: 10px 0 10px 10px">评分</div>
        <el-table
          :data="dataQuery"
          fit
          highlight-current-row
          style="width: 100%;height:400px"
        >
          <el-table-column label="排名" type="index" align="center" />
          <el-table-column label="地区" prop="channelName" align="center" />
          <el-table-column label="占比" prop="createTime" align="center">
            <template slot-scope="{row}"><el-progress :text-inside="true" :stroke-width="15" :percentage="row.percentage" /></template>
          </el-table-column>
          <el-table-column label="周环比" prop="zhouhuan" align="center" />
        </el-table>
      </el-col>
      <el-col :span="8" class="card-panel-lable">
        <div style="font-size:22px;margin: 10px 0 10px 10px">多地址</div>
        <div style="height:400px">
          <div class="panel-group">
            <div :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
                <div class="card-panel-icon-wrapper icon-people">
                  <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">总人数</div>
                  <div class="card-panel-num">1,345</div>
                  <div class="card-panel-text">数据详情</div>
                </div>
              </div>
            </div>
          </div>
          <div style="font-size:22px;margin: 10px 0 10px 10px">地址变更</div>
          <div class="panel-group">
            <div :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
                <div class="card-panel-icon-wrapper icon-people">
                  <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">总人数</div>
                  <div class="card-panel-num">5</div>
                  <div class="card-panel-text">数据详情</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40" class="card-content">
      <el-col :span="16">
        <div style="font-size:22px;margin: 10px 0 10px 10px">交易人数</div>

      </el-col>
      <el-col :span="8" class="card-content">
        <div style="font-size:22px;margin: 10px 0 10px 10px">交易类别占比</div>
        <div id="pieDoughnut" style="width:100%;height:400px;" />
      </el-col>
    </el-row>
    <el-row :gutter="40" class="card-content">
      <el-col :span="16">
        <div style="display:flex;align-items:center">
          <div style="font-size:22px;margin: 10px 0 10px 10px">交易笔数</div>
          <div style="color:#E67F09;margin-left:auto">
            <el-radio-group v-model="totalRadio2" size="medium" text-color="#F0F0F0" fill="#E67F09" @change="totalRadioChange2">
              <el-radio-button label="1">今日</el-radio-button>
              <el-radio-button label="2">本周</el-radio-button>
              <el-radio-button label="3">本月</el-radio-button>
            </el-radio-group>
          </div>
          <div style="display:flex;align-items:center;margin-left:10px">
            选择日期：
            <el-date-picker
              v-model="valueDate"
              type="date"
              placeholder="选择日期"
            />
          </div>
        </div>
        <div style="font-size:18px;margin: 10px 0 10px 10px">近一周交易笔数统计</div>
        <div id="pieAreaBasic" style="width:100%;height:400px;" />
      </el-col>
      <el-col :span="8" class="card-content">
        <div style="font-size:22px;margin: 10px 0 10px 10px">金额分布</div>
        <div id="pieBarTick" style="width:100%;height:400px;" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import '../../../node_modules/echarts/map/js/china.js'
export default {
  name: 'DashboardAdmin',
  components: {
  },
  data() {
    return {
      valueDate: '',
      dataQuery: [
        {
          channelName: '河南',
          zhouhuan: '15',
          createTime: '35%',
          percentage: '35'

        },
        {
          channelName: '广东',
          zhouhuan: '14',
          createTime: '35%',
          percentage: '55'

        },
        {
          channelName: '广西',
          zhouhuan: '13',
          createTime: '35%',
          percentage: '65'

        },
        {
          channelName: '上海',
          zhouhuan: '12',
          createTime: '35%',
          percentage: '75'

        },
        {
          channelName: '成都',
          zhouhuan: '1',
          createTime: '35%',
          percentage: '85'

        }
      ],
      radio1: '网商贷一期',
      totalRadio2: ''
    }
  },
  mounted() {
  },
  created() {
    this.$nextTick(function() {
      this.drawPie('pieReport')
      this.drawPieLineSmooth('pieLineSmooth')
      this.drawPieDoughnut('pieDoughnut')
      this.drawPieAreaBasic('pieAreaBasic')
      this.drawPieBarTick('pieBarTick')
    })
  },
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        tooltip: {
          show: false
        },
        geo: {
          map: 'china',
          roam: false, // 一定要关闭拖拽
          zoom: 1.23,
          center: [105, 36], // 调整地图位置
          label: {
            normal: {
              show: false, // 关闭省份名展示
              fontSize: '10',
              color: 'rgba(0,0,0,0.7)'
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#0d0059',
              borderColor: '#389dff',
              borderWidth: 1, // 设置外层边框
              shadowBlur: 5,
              shadowOffsetY: 8,
              shadowOffsetX: 0,
              shadowColor: '#01012a'
            },
            emphasis: {
              areaColor: '#184cff',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 5,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            type: 'map',
            map: 'china',
            roam: false,
            zoom: 1.23,
            center: [105, 36],
            // geoIndex: 1,
            // aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#0d0059',
                borderColor: '#389dff',
                borderWidth: 0.5
              },
              emphasis: {
                areaColor: '#17008d',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 5,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    drawPieBarTick(id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      })
    },
    drawPieAreaBasic(id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      })
    },
    drawPieLineSmooth(id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      })
    },
    drawPieDoughnut(id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '地产类' },
              { value: 735, name: '无交易信息类' },
              { value: 580, name: '地产+投资' },
              { value: 484, name: '投资类' }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flexrows{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 108px;
}
.el-divider--vertical {
    display: inline-block;
    width: 2px;
    height: 7em;
    margin: auto 8px;
    vertical-align: middle;
    position: relative;
}
  .card-panel-lable {
    /* height: 108px;
    cursor: pointer; */
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    padding-top:10px;
  }
.dashboard-editor-container {
  padding: 32px;
  background-color: #fff;
  position: relative;

  .cardOfEl{
    height: 150px;
  }
  .panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-content {
    /* position: relative;
    overflow: hidden; */
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: left;
      font-weight: bold;
      /* margin: 26px; */
      margin-left: 20px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        margin-bottom: 12px;
        margin-top:12px;
        span {
          color: red;
          margin-right:5px;
        }
      }

      .card-panel-num {
        font-size: 20px;
        margin-bottom: 12px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
}
</style>
