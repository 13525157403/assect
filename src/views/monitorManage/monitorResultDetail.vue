<template>
  <div class="dashboard-editor-container">
    <el-row style="color:#535353;">
      <div style="font-size:25px">网商贷一期</div>
      <div style="font-size:20px;margin:10px 0 0 20px">资金流向监控</div>
    </el-row>
    <el-row :gutter="40" class="panel-group">
      <el-col :span="13" class="card-panel-col">
        <div class="card-panel">
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
                <div><i class="el-icon-d-arrow-right" style="font-size:40px;color:blue" @click="goPeople" /></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="11" class="card-panel-col">
        <div class="card-panel">
          <el-row type="flex">
            <el-col :span="7" align="center">
              <div class="flexrows">
                <div style="margin-left:30px;margin-botton:5px;height:18px"><i /></div>
                <div style="font-size:20px;font-weight:bold;margin-bottom:5px">96.75<span style="font-size:12px">万</span></div>
                <div style="font-weight:500">累计监控交易</div>
              </div>
            </el-col>
            <el-divider direction="vertical" />
            <el-col :span="21">
              <div class="flexrows">
                <div style="display:flex;width:90%;border-bottom:3px solid #FF00FF;padding-bottom:5px">
                  <div>今日监控交易（比）</div>
                  <div style="margin-left:auto;font-weight:bold">5000</div>
                </div>
                <div style="width:90%;display:flex">
                  <div style="margin-left:auto"><i class="el-icon-top-right" style="color:green;font-weight:bold">0.1</i></div>
                </div>
                <div style="display:flex;width:90%;border-bottom:3px solid #FF00FF;padding-bottom:5px;margin-top:10px">
                  <div>平均每日监控交易（比）</div>
                  <div style="margin-left:auto;font-weight:bold">50</div>
                </div>
                <div style="width:90%;display:flex">
                  <div style="margin-left:auto"><i class="el-icon-top-right" style="color:green;font-weight:bold">0.1</i></div>
                </div>
              </div>
            </el-col>
            <el-col :span="3" align="center">
              <div class="flexrows">
                <div><i class="el-icon-d-arrow-right" style="font-size:40px;color:blue" @click="goOther" /></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="16" class="card-panel-lable">
        <div style="display:flex;align-items:center">
          <div style="font-size:22px;margin: 10px 0 10px 10px">监控总人数</div>
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
              v-model="listQuery.datePicker"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </div>
        </div>
        <div style="font-size:18px;margin: 10px 0 10px 10px">近一周监控总人数统计</div>
        <div id="pieReport" style="width:100%;height:400px;" />
      </el-col>
      <el-col :span="8" class="card-panel-lable">
        <div style="font-size:22px;margin: 10px 0 10px 10px">监控人群分布</div>
        <div style="margin-top:30px;margin-left:20px">
          <div style="display:flex;height:35px">
            <div style="color:#999">高危地区</div>
            <div style="width:80%;margin-left:10px">
              <el-progress :percentage="50" />
            </div>
          </div>
          <div style="display:flex;height:35px">
            <div style="color:#999">存在逾期</div>
            <div style="width:80%;margin-left:10px">
              <el-progress :percentage="50" />
            </div>
          </div>
          <div style="display:flex;height:35px">
            <div style="color:#999">沉睡客户</div>
            <div style="width:80%;margin-left:10px">
              <el-progress :percentage="50" />
            </div>
          </div>
          <div style="display:flex;height:35px">
            <div style="color:#999">累计高频</div>
            <div style="width:80%;margin-left:10px">
              <el-progress :percentage="50" />
            </div>
          </div>
          <div style="display:flex;height:35px">
            <div style="color:#999">高使用率</div>
            <div style="width:80%;margin-left:10px">
              <el-progress :percentage="50" />
            </div>
          </div>
          <div style="display:flex;height:35px">
            <div style="color:#999">信息变更</div>
            <div style="width:80%;margin-left:10px">
              <el-progress :percentage="50" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40" class="card-content">
      <el-col :span="16">
        <div style="display:flex;align-items:center">
          <div style="font-size:22px;margin: 10px 0 10px 10px">交易人数</div>
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
              v-model="listQuery.datePicker"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </div>
        </div>
        <div style="font-size:18px;margin: 10px 0 10px 10px">近一周人数增长统计</div>
        <div id="pieLineSmooth" style="width:100%;height:400px;" />
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
              v-model="listQuery.datePicker"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
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
export default {
  name: 'DashboardAdmin',
  components: {
  },
  data() {
    return {
      totalRadioChange2: '',
      listQuery: {},
      valueDate: '',
      dataQuery: [
        {
          channelName: '<1万',
          zhouhuan: '10%',
          createTime: '35%',
          percentage: '35'

        },
        {
          channelName: '1万~3万',
          zhouhuan: '10%',
          createTime: '35%',
          percentage: '55'

        },
        {
          channelName: '3万~5万',
          zhouhuan: '10%',
          createTime: '35%',
          percentage: '65'

        },
        {
          channelName: '5万~10万',
          zhouhuan: '10%',
          createTime: '35%',
          percentage: '75'

        },
        {
          channelName: '>10万',
          zhouhuan: '10%',
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
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
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
    },
    goPeople() {
      this.$router.push({ name: 'alertNumberPeople' })
    },
    goOther() {
      this.$router.push({ name: 'dubious' })
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
