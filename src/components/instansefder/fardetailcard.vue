<template>
  <div class="score">
    <ul>
      <li>
        <div>
          {{ scoreTotalCount }}
          <span v-if="frauddata.scoreTotalCount > 10000">万</span>
        </div>
        <div>{{ asstestit.tit1 }}</div>
      </li>
      <li>
        <div>
          <div class="flexrows">
            <div style="display: flex; width: 90%">
              <div>{{ asstestit.tit2 }}</div>
              <div style="margin-left: auto; font-weight: bold">
                {{ frauddata.scoreTodayCount }}
              </div>
            </div>
            <div class="asdistail">
              <span />
              <span />
            </div>
            <div style="width: 90%; display: flex">
              <div style="margin-left: auto">
                <i
                  :class="option1.className"
                  :style="{ color: option1.color, 'font-weight': 'bold' }"
                >{{ monitorSumber }}%</i>
              </div>
            </div>
            <div style="display: flex; width: 90%">
              <div>{{ asstestit.tit3 }}</div>
              <div style="margin-left: auto; font-weight: bold">
                {{ frauddata.scoreAveCount }}
              </div>
            </div>
            <div class="asdistail1">
              <span />
              <span />
            </div>
            <div style="width: 90%; display: flex">
              <div style="margin-left: auto">
                <i
                  :class="option2.className"
                  :style="{ color: option2.color, 'font-weight': 'bold' }"
                >{{ monitormilont }}%</i>
              </div>
            </div>
          </div>
        </div>
        <div @click="getdetail">
          <i
            class="el-icon-d-arrow-right"
            style="font-size: 60px; color: rgb(2, 167, 240); fontweight: 900"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    asstestit: {
      type: Object,
      default: () => {
        return {
          tit1: '累计评分次数',
          tit2: '今日地址评分（次）',
          tit3: '平均每日评分(次)'
        }
      }
    },
    monitorId2: {},
    skipName2: {
      type: String
    },
    frauddata: {
      type: Object,
      default: () => {
        return {
          scoreAveCount: '0',
          scoreTenDayAveCountAve: '0',
          scoreTenDayCountAve: '0',
          scoreTodayCount: '0',
          scoreTotalCount: '0'
        }
      }
    }
  },
  data() {
    return {
      option1: {
        color: 'red',
        className: 'el-icon-bottom-right'
      },
      option2: {
        color: 'green',
        className: 'el-icon-top-right'
      }
    }
  },
  computed: {
    // 今日评分次数百分比变化值：（当日评分次数-该数值过往10日平均值）/该数值过往10日平均值
    monitorSumber() {
      let a
      let i
      let j
      if (this.frauddata.scoreTenDayCountAve) {
        i = this.frauddata.scoreTodayCount - 0
        j = this.frauddata.scoreTenDayCountAve - 0
      }
      if (j && j !== 0) {
        a = ((i - j) / j).toFixed(2)
      } else {
        a = 0
      }
      if (a > 0) {
        this.option1.color = 'green'
        this.option1.className = 'el-icon-top-right'
      }
      if (a === 0) {
        this.option1.color = 'rgb(121,121,121)'
        this.option1.className = 'el-icon-minus'
      }
      if (a < 0) {
        this.option1.color = 'red'
        this.option1.className = 'el-icon-bottom-right'
      }
      return a
    },
    // 平均每日评分次数”百分比变化值：（当天平均值-该数值过往10日平均值的平均值）/该数值过往10日平均值的平均值
    monitormilont() {
      let a
      let i
      let j
      if (this.frauddata.scoreTenDayAveCountAve) {
        i = this.frauddata.scoreAveCount - 0
        j = this.frauddata.scoreTenDayAveCountAve - 0
      }
      if (j && j !== 0) {
        a = ((i - j) / j).toFixed(2)
      } else {
        a = 0
      }
      if (a > 0) {
        this.option2.color = 'green'
        this.option2.className = 'el-icon-top-right'
      }
      if (a === 0) {
        this.option2.color = 'rgb(121,121,121)'
        this.option2.className = 'el-icon-minus'
      }

      if (a < 0) {
        this.option2.color = 'red'
        this.option2.className = 'el-icon-bottom-right'
      }
      return a
    },
    // 评分次数
    scoreTotalCount() {
      return this.frauddata.scoreTotalCount >= 10000
        ? (this.frauddata.scoreTotalCount / 10000).toFixed(2)
        : this.frauddata.scoreTotalCount
    }
  },
  watch: {
    frauddata() {
      console.log(this.frauddata, 'frauddata')
    }
  },
  methods: {
    getdetail() {
      this.$router.push({
        name: this.skipName2,
        query: { monitorId: this.monitorId2 }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
ul,
li {
  margin: 0;
  padding: 0;
}

.score {
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
}

.score ul {
  width: 100%;
  height: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgb(114, 126, 151);
}

.score > ul > li:last-child {
  height: 90%;
  border-left: 1px solid rgb(0, 0, 191);
  flex: 7;
  display: flex;
  align-items: center;
}

.score > ul > li:last-child > div:last-child {
  flex: 2;
  display: flex;
  justify-content: center;
}

.score > ul > li:last-child > div:first-child {
  width: 100%;
  height: 100%;
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.score li:nth-child(1) {
  flex: 3;
  text-align: center;

  div {
    width: 100%;
    text-align: center;
  }

  div:nth-child(1) {
    font-size: 35px;
    font-weight: 600;

    span {
      font-size: 12px;
    }
  }
}

.flexrows {
  padding-top: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.asdistail {
  width: 90%;
  height: 5px;
  display: flex;

  span {
    display: inline-block;
  }

  span:nth-child(1) {
    width: 80%;
    height: 5px;
    background-color: #ff00ff;
  }

  span:nth-child(2) {
    width: 20%;
    height: 5px;
    background-color: #000;
  }
}

.asdistail1 {
  width: 90%;
  height: 5px;
  display: flex;

  span {
    display: inline-block;
  }

  span:nth-child(1) {
    width: 15%;
    height: 5px;
    background-color: #ff00ff;
  }

  span:nth-child(2) {
    width: 85%;
    height: 5px;
    background-color: #000;
  }
}
.el-icon-d-arrow-right {
  cursor: pointer;
}
</style>
