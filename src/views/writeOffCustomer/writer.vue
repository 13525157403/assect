<template>
  <div class="dashboard-editor-container">
    <el-row style="color: #535353">
      <div class="tit1">{{ $route.query.tit }}</div>
      <div class="tit2">{{ $route.query.name }}</div>
    </el-row>
    <el-row :gutter="20">
      <!-- 预警人数 -->
      <el-col :span="13">
        <div class="grid-content bg-purple">
          <div class="dwbk1">
            <!-- :result="result" -->
            <Score
              :skip-name="skipName"
              :monitor-id="$route.query.id"
              :result="result"
            />
          </div>
        </div>
      </el-col>
      <!-- 评分人数 -->
      <el-col
        :span="11"
      ><div class="grid-content bg-purple-light">
        <div class="dwbk1">
          <Score1
            :skip-name2="skipName2"
            :monitor-id2="$route.query.id"
            :asstestit="asstestit"
            :frauddata="frauddata"
          />
        </div></div></el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="12">
        <div class="dwk2">
          <header>
            核销-授信 金额统计
            <el-select v-model="day1" size="mini" @change="amountStatistics">
              <el-option label="近7天" :value="7" />
              <el-option label="近30天" :value="30" />
              <el-option label="近90天" :value="90" />
            </el-select>
          </header>
          <div class="cart">
            <Linewriter :color="creditcolor" :rawanum="amt1" />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="dwk2">
          <header>核销-授信 间隔周期统计</header>
          <div class="cart">
            <Colum :color="color1" :amt="amt3" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="12">
        <div class="dwk2">
          <header>
            核销-放款 金额统计
            <el-select
              v-model="day2"
              size="mini"
              @change="loanAmountStatistics"
            >
              <el-option label="近7天" :value="7" />
              <el-option label="近30天" :value="30" />
              <el-option label="近90天" :value="90" />
            </el-select>
          </header>
          <div class="cart">
            <Linewriter :color="loancolor" :rawanum="amt2" />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="dwk2">
          <header>核销-放款 间隔周期统计</header>
          <div class="cart">
            <Colum :color="color2" :amt="amt4" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Score from '@/components/instansefder/farddatamoudetion.vue'
import Score1 from '@/components/instansefder/fardetailcard.vue'
import Linewriter from '@/assembly/writer/writerlinechart.vue'
import Colum from '@/assembly/writer/writercolumnarcart.vue'
import {
  writeoffpeople,
  writeoffloan,
  writeOffCreditAmountStatistics,
  writeOffLoanAmountStatistics,
  writeOffCreditIntervalStatistics,
  writeOffLoanIntervalStatistics
} from '@/api/monitor'
export default {
  components: { Score, Score1, Linewriter, Colum },
  data() {
    return {
      asstestit: {
        tit1: '累计申请数据',
        tit2: '今日申请（比）',
        tit3: '平均每日申请(比)'
      },
      result: {},
      skipName: 'writecustPopleList',
      skipName2: 'writeScoreList',
      frauddata: {},
      value: [],
      color: ['', 'a1', ''],
      titleList: ['今日', '本周', '本月'],
      allPeople: [],
      EIdData: [],
      day1: 7,
      day2: 7,
      // 授信图表颜色
      creditcolor: ['rgb(201,236,246)', 'rgb(153,223,243)'],
      loancolor: ['rgb(253,240,222)', 'rgb(252,225,189)'],
      color1: 'rgb(75,132,255)',
      color2: 'rgb(251,216,170)',
      amt1: [],
      amt2: [],
      amt3: [],
      amt4: []
    }
  },
  created() {
    this.management()
    this.People()
    this.amountStatistics()
    this.loanAmountStatistics()
    this.IntervalStatistics()
    this.loanIntervalStatistics()
  },
  methods: {
    // //回销-评分数据卡
    async management() {
      const { data } = await writeoffloan(this.$route.query.id)
      this.frauddata = data
    },
    // 回销-人数数据卡
    async People() {
      const { data } = await writeoffpeople(this.$route.query.id)
      this.result = data
    },
    // 核销-授信-金额
    async amountStatistics() {
      const { data } = await writeOffCreditAmountStatistics({
        monitorId: this.$route.query.id,
        day: this.day1
      })
      this.amt1 = []
      data.forEach((i) => {
        this.amt1.push({
          time: i.time,
          value1: i.creditAmount,
          value2: i.writeOffAmount
        })
      })
    },
    // 核销-放款-金额统计
    async loanAmountStatistics() {
      const { data } = await writeOffLoanAmountStatistics({
        monitorId: this.$route.query.id,
        day: this.day2
      })
      this.amt2 = []
      data.forEach((i) => {
        this.amt2.push({
          time: i.time,
          value1: i.creditAmount,
          value2: i.writeOffAmount
        })
      })
    },
    // 统计图表-核销客户-核销-授信-间隔周期统计
    async IntervalStatistics() {
      const { data } = await writeOffCreditIntervalStatistics({
        monitorId: this.$route.query.id
      })
      data.forEach((i) => {
        this.amt3.push({
          time: i.time,
          min: i.minDay,
          max: i.maxDay
        })
      })
    },
    // 统计图表-核销客户-核销-放款-间隔周期统计
    async loanIntervalStatistics() {
      const { data } = await writeOffLoanIntervalStatistics({
        monitorId: this.$route.query.id
      })
      data.forEach((i) => {
        this.amt4.push({
          time: i.time,
          min: i.minDay,
          max: i.maxDay
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 40px;
  background-color: rgb(242, 242, 242);
  position: relative;
}
.tit1 {
  font-size: 18px;
  color: rgb(102, 102, 102);
  font-weight: 800;
}
.tit2 {
  font-size: 10px;
  margin: 25px 0 0 15px;
}
.grid-content {
  margin-top: 20px;
}
.dwbk1 {
  width: 100%;
  height: 180px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dwk2 {
  height: 400px;
  background-color: #fff;
  padding: 20px;
  header {
    width: 100%;
    color: rgb(153, 153, 153);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cart {
    width: 100%;
    height: 100%;
  }
}
.el-row {
  margin-top: 20px;
}
</style>

