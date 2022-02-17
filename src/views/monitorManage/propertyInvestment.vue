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
          <!-- :asstestit="asstestit" :frauddata="frauddata" -->
          <Score1
            :skip-name2="skipName2"
            :monitor-id2="$route.query.id"
            :asstestit="asstestit"
            :frauddata="frauddata"
          />
        </div></div></el-col>
    </el-row>
    <el-row :gutter="50">
      <!-- 评分人数 -->
      <el-col :span="15">
        <div class="grid-content bg-purple">
          <div class="dwbk2">
            <header>监控总人数</header>
            <ul>
              <li>近一周人数增长统计</li>
              <li>
                <a
                  v-for="(i, m) of titleList"
                  :key="m"
                  :class="color[m]"
                  @click="activeColor(m)"
                >
                  {{ i }}
                </a>
              </li>
              <li>
                <el-date-picker
                  v-model="value"
                  style="width: 220px; margin-left: 30px"
                  size="mini"
                  type="daterange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="PickdataChang"
                />
              </li>
            </ul>
            <!-- 反欺诈-评分人数图表 -->
            <div>
              <Histogram :allpeople="allPeople" />
            </div>
          </div>
        </div>
      </el-col>
      <!-- 评分/在贷余额 -->
      <el-col :span="9">
        <div class="grid-content bg-purple-light">
          <div class="dwbk3">
            <header>监控人群分布</header>
            <div>
              <ul class="wight">
                <li v-for="i in progressList" :key="i.countType">
                  <div>{{ i.countType }}</div>
                  <el-progress :percentage="i.countNum>100?100:i.countNum" :show-text="false" />
                  <div>{{i.countNum}}%</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 交易人数 -->
    <el-row :gutter="50">
      <el-col :span="15">
        <div class="grid-content bg-purple">
          <div class="dwbk2">
            <header>交易人数</header>
            <ul>
              <li>近一周人数增长统计</li>
              <li>
                <a
                  v-for="(i, m) of titleList"
                  :key="m"
                  :class="color1[m]"
                  @click="activeColor1(m)"
                >
                  {{ i }}
                </a>
              </li>
              <li>
                <el-date-picker
                  v-model="value1"
                  style="width: 240px; margin-left: 30px"
                  size="mini"
                  type="daterange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="PickdataChang1"
                />
              </li>
            </ul>
            <Cartdiu :allpeople="allPeople1" />
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content bg-purple">
          <div class="dwbk2">
            <header>交易类别占比</header>
            <Pieck :pie="pie" />
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 交易笔数 -->
    <el-row :gutter="50">
      <el-col :span="15">
        <div class="grid-content bg-purple">
          <div class="dwbk2">
            <header>交易笔数</header>
            <ul>
              <li>近一周交易笔数统计</li>
              <li>
                <a
                  v-for="(i, m) of titleList"
                  :key="m"
                  :class="color2[m]"
                  @click="activeColor2(m)"
                >
                  {{ i }}
                </a>
              </li>
              <li>
                <el-date-picker
                  v-model="value2"
                  style="width: 240px; margin-left: 30px"
                  size="mini"
                  type="daterange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="PickdataChang2"
                />
              </li>
            </ul>
            <Diutaran :allpeople="allPeople2" />
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content bg-purple">
          <div class="dwbk2">
            <header>金额分布</header>
            <div>
              <Kduion :amt="amt" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Score from '@/components/instansefder/farddatamoudetion.vue'
import Score1 from '@/components/instansefder/fardetailcard.vue'
import Histogram from '@/components/duioustransactionscart/dutickcart.vue'
import Kduion from '@/components/duioustransactionscart/histongkenycart.vue'
import Pieck from '@/components/duioustransactionscart/piedack.vue'
import Cartdiu from '@/components/duioustransactionscart/careechartdui.vue'
import Diutaran from '@/components/duioustransactionscart/taransduicart.vue'
import {
  mentpeople,
  riskLabel,
  transaction,
  ruleType,
  transactionType,
  amtDistribution,
  numberOfTransactions,
  merchantName
} from '@/api/dubiousTransaction'
export default {
  components: { Score, Score1, Histogram, Pieck, Cartdiu, Diutaran, Kduion },
  data() {
    return {
      asstestit: {
        tit1: '累计监控交易',
        tit2: '今日监控交易（比）',
        tit3: '平均每日监控交易(比)'
      },
      pie: [],
      result: {},
      skipName: 'alertNumberPeople',
      skipName2: 'dubious',
      frauddata: {},
      value: [],
      value1: [],
      value2: [],
      color: ['a1', ''],
      color1: ['a1', ''],
      color2: ['a1', ''],
      titleList: ['本周', '本月'],
      allPeople: [],
      allPeople1: [],
      allPeople2: [],
      EIdData: [],
      day: 1,
      day1: 1,
      day2: 1,
      progressList: [],
      amt: []
    }
  },
  created() {
    this.risklabel()
    this.People()
    this.transaction()
    this.ruletype()
    this.transactiontype()
    this.amtdistribution()
    this.numberotransactions()
    this.merchantname()
  },
  methods: {
    // 资金流向-人数数据卡
    async People() {
      const { data } = await mentpeople(this.$route.query.id)
      this.result = data
    },
    // 资金流向-交易数据卡
    async risklabel() {
      const { data } = await riskLabel(this.$route.query.id)
      this.frauddata = data
    },
    // 监控总人数模块
    // 资金流向-监控总人数OK
    async transaction(endDate = '', startDate = '') {
      const a = this.day
      const { data } = await transaction({
        monitorId: this.$route.query.id,
        queryTimeType: a,
        endDate: endDate,
        startDate: startDate
      })
      if (data && data.length !== 0) {
        data.sort(function(a, b) {
          return a.countDate < b.countDate ? -1 : 1
        })
        this.value = [data[0].countDate, data[data.length - 1].countDate]
        this.allPeople = data
      }
    },
    PickdataChang(a) {
      this.day = '0'
      this.transaction(a[1], a[0])
    },
    activeColor(v) {
      this.color = ['', '']
      this.color[v] = 'a1'
      if (v === 0) {
        this.day = 1
      } else if (v === 1) {
        this.day = 2
      }
      this.transaction()
    },
    // 监控总人数模块
    // 资金流向-监控总人数OK
    // 资金流向-交易人数OK
    async numberotransactions(endDate = '', startDate = '') {
      const a = this.day1
      const { data } = await numberOfTransactions({
        monitorId: this.$route.query.id,
        queryTimeType: a,
        endDate: endDate,
        startDate: startDate
      })

      if (data.estate && data.estate.length !== 0) {
        data.estate.sort(function(a, b) {
          return a.countDate < b.countDate ? -1 : 1
        })
        this.value1 = [
          data.estate[0].countDate,
          data.estate[data.estate.length - 1].countDate
        ]
      }
      if (data.investment && data.investment.length !== 0) {
        data.investment.sort(function(a, b) {
          return a.countDate < b.countDate ? -1 : 1
        })
      }
      this.allPeople1 = data
    },
    PickdataChang1(a) {
      this.day1 = '0'
      this.numberotransactions(a[1], a[0])
    },
    activeColor1(v) {
      this.color1 = ['', '']
      this.color1[v] = 'a1'
      if (v === 0) {
        this.day1 = 1
      } else if (v === 1) {
        this.day1 = 2
      }
      this.numberotransactions()
    },
    // 资金流向-交易人数OK
    // 资金流向-交易笔数OK
    async merchantname(endDate = '', startDate = '') {
      const a = this.day2
      const { data } = await merchantName({
        monitorId: this.$route.query.id,
        queryTimeType: a,
        endDate: endDate,
        startDate: startDate
      })
      if (data && data.length !== 0) {
        data.sort(function(a, b) {
          return a.countDate < b.countDate ? -1 : 1
        })
        this.value2 = [
          data[0].countDate,
          data[data.length - 1].countDate
        ]
        this.allPeople2 = data
      }
    },
    PickdataChang2(a) {
      this.day2 = '0'
      this.merchantname(a[1], a[0])
    },
    activeColor2(v) {
      this.color2 = ['', '']
      this.color2[v] = 'a1'
      if (v === 0) {
        this.day2 = 1
      } else if (v === 1) {
        this.day2 = 2
      }
      this.merchantname()
    },
    // 资金流向-交易笔数OK
    // 监控总人数模块
    // 资金流向-监控人群分布
    async ruletype() {
      const { data } = await ruleType(this.$route.query.id)
      this.progressList = data
    },
    async transactiontype() {
      const { data } = await transactionType(this.$route.query.id)
      this.pie = data
      console.log(data, 'result')
    },
    // 交易类别占比
    async amtdistribution() {
      const { data } = await amtDistribution(this.$route.query.id)
      this.amt = data
      console.log(data, 'data')
    }
  }
}
</script>

<style lang="scss" scoped>
.wight {
  margin: 20px 0 0 0;
  color: rgb(153, 153, 153);
  font-size: 14px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
}
.wight > li {
  display: flex;
  margin-bottom: 12px;
  align-items: center;
  div:nth-child(1){
    width: 180px;
  }
  .el-progress {
    width: 35%;
  }
}
.wight > li>div:nth-child(3){
  width: 100px;
  text-align: center;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
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
.dwbk2 {
  height: 400px;
  background-color: #fff;
  padding: 10px 20px;
  font-weight: bold;
  header {
    margin-top: 10px;
  }
  li {
    display: flex;
    align-items: center;
  }
  ul {
    display: flex;
    margin-top: 20px;
    font-size: 14px;
    li:nth-child(1) {
      font-style: italic;
    }
    li:nth-child(2) {
      width: 10%;
      justify-content: space-between;
      font-size: 12px;
      font-weight: lighter;
      margin-left: 32%;
    }
  }
}
.dwbk2 > div {
  margin-top: 10px;
  font-weight: normal;
}

.dwbk3 {
  height: 400px;
  background-color: #fff;
  padding: 30px 20px;
  font-weight: bold;
}
.a1 {
  color: rgb(16, 142, 233);
}
</style>

