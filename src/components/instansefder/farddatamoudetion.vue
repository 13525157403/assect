<template>
  <div class="score">
    <ul>
      <li>
        <div style="">{{ result.alertTotalCount }}</div>
        <div style="font-weight: 500">累计预警人数</div>
      </li>
      <li>/</li>
      <li>
        <div>{{ result.monitorTotalCount }}</div>
        <div>累计监控人数（人）</div>
      </li>
      <li>
        <div>
          <div class="flexrows">
            <div
              style="
                display: flex;
                width: 80%;
                border-bottom: 5px solid #ff00ff;
              "
            >
              <div>今日监控人数</div>
              <div style="margin-left: auto; font-weight: bold">
                {{ result.monitorTodayCount }}
              </div>
            </div>
            <div style="width: 80%; display: flex">
              <div style="margin-left: auto">
                <i
                  :class="option1.className"
                  :style="{ color: option1.color, 'font-weight': 'bold' }"
                >{{ monitorSumber }}%</i>
              </div>
            </div>
            <div
              style="
                display: flex;
                width: 80%;
                border-bottom: 5px solid #ff00ff;
              "
            >
              <div>平均每日监控人数</div>
              <div style="margin-left: auto; font-weight: bold">
                {{ result.monitorAveCount }}
              </div>
            </div>
            <div style="width: 80%; display: flex">
              <div style="margin-left: auto">
                <i
                  :class="option2.className"
                  :style="{ color: option2.color, 'font-weight': 'bold' }"
                >{{ monitormilont }}%</i>
              </div>
            </div>
          </div>
        </div>
        <div @click="getdetail(monitorId)">
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
    result: {
      type: Object,
      default: () => {
        return {
          alertTotalCount: 0,
          monitorAveCount: 0,
          monitorTenDayAveCountAve: 0,
          monitorTenDayCountAve: 0,
          monitorTodayCount: 0,
          monitorTotalCount: 0
        }
      }
    },
    monitorId: {},
    skipName: {
      type: String
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
      if (
        this.result.monitorTenDayCountAve &&
        this.result.monitorTenDayCountAve !== 0
      ) {
        a = (
          (this.result.monitorTodayCount - this.result.monitorTenDayCountAve) /
          this.result.monitorTenDayCountAve
        ).toFixed(2)
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
    // 平均每日评分次数”百分比变化值：（当天平均值-该数值过往10日平均值）/该数值过往10日平均值
    monitormilont() {
      let a
      if (
        this.result.monitorTenDayAveCountAve &&
        this.result.monitorTenDayAveCountAve !== 0
      ) {
        a = (
          (this.result.monitorAveCount - this.result.monitorTenDayAveCountAve) /
          this.result.monitorTenDayAveCountAve
        ).toFixed(2)
      } else {
        a = 0
      }
      if (a > 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.option2.color = 'green'
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.option2.className = 'el-icon-top-right'
      }
      if (a === 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.option2.color = 'rgb(121,121,121)'
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.option2.className = 'el-icon-minus'
      }
      if (a < 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.option2.color = 'red'
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.option2.className = 'el-icon-bottom-right'
      }
      return a
    }
  },
  methods: {
    getdetail() {
      this.$router.push({
        name: this.skipName,
        query: { monitorId: this.monitorId }
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

.score > ul > li:nth-child(2) {
  flex: 0.3;
  font-size: 50px;
  color: rgb(114, 126, 151);
  font-weight: 100;
  display: flex;
  justify-content: center;
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

.score li:nth-child(1),
.score li:nth-child(3) {
  flex: 3;

  div {
    width: 100%;
    text-align: center;
  }

  div:nth-child(1) {
    font-size: 35px;
    font-weight: 600;
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
.el-icon-d-arrow-right{
  cursor: pointer;
}
</style>
