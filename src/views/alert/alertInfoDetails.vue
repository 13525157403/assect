<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="80">
      <el-col :span="15">
        <div class="dwek1">
          <div class="scenario">
            <header>
              <h4>预警场景</h4>
              <div>
                <el-select
                  v-model="value"
                  placeholder="请选择"
                  @change="activechange"
                  size="mini"
                >
                  <el-option
                    v-for="(i, m) in alertOptions"
                    :key="m"
                    :label="i.label"
                    :value="i.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="btn">
                <el-button size="mini" type="primary" @click="goOther"
                  >查看详情</el-button
                >
              </div>
            </header>
            <div>
              <ul>
                <li>
                  <div style="margin: 20px">
                    <p class="p1">业务指标</p>
                    <p class="tit">
                      {{ this.list.countNowKPI ? this.list.countNowKPI : 0 }}
                    </p>
                    <p class="top">
                      <i class="el-icon-caret-top"></i>
                      <span>{{ num }}%</span>
                      <span>同比上周</span>
                    </p>
                  </div>
                  <div>
                    <Cart1
                      :color="'rgb(72,168,237)'"
                      :bordercolor="'rgb(218,238,251)'"
                      :allpeople="all.ap1"
                    ></Cart1>
                  </div>
                </li>
                <li>
                  <div style="margin: 20px">
                    <p class="p1">应用/功能</p>
                    <p class="tit">0</p>
                    <p class="top">
                      <i class="el-icon-caret-top"></i>
                      <span>0%</span>
                      <span>同比上周</span>
                    </p>
                  </div>
                  <div>
                    <Cart1
                      :color="'rgb(125,200,86)'"
                      :bordercolor="'rgb(229,244,221)'"
                    ></Cart1>
                  </div>
                </li>
                <li>
                  <div style="margin: 20px">
                    <p class="p1">接口/数据</p>
                    <p class="tit">0</p>
                    <p class="top">
                      <i class="el-icon-caret-top"></i>
                      <span>0%</span>
                      <span>同比上周</span>
                    </p>
                  </div>
                  <div>
                    <Cart1
                      :color="'rgb(255,215,109)'"
                      :bordercolor="'rgb(255,247,226)'"
                    ></Cart1>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="dwek1">
          <div class="scenario">
            <header>
              <h4>预警重复率</h4>
            </header>
            <div>
              <Cart2 :rawanum="rate"></Cart2>
            </div>
            <div class="rate">
              <div>
                <p>10%</p>
                <p>低</p>
              </div>
              <div>
                <p>40%</p>
                <p>标准</p>
              </div>
              <div>
                <p>60%</p>
                <p>高</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="dwek2">
          <div class="scenario">
            <header>
              <h4>预警方式</h4>
            </header>
          </div>
          <div class="mode">
            <div class="imgs">
              <img :src="require('@/assets/addresschange/u5568.svg')" alt="" />
            </div>
            <div>
              <p>预警总量</p>
              <p>{{ list.countNowAlertAll ? list.countNowAlertAll : 0 }}</p>
              <p>
                <i class="el-icon-caret-bottom a1" v-show="allnum < 0"
                  >{{ allnum }}%</i
                >
                <i class="el-icon-caret-top a2" v-show="allnum >= 0"
                  >{{ allnum }}%</i
                >
                <span>同比上周</span>
              </p>
            </div>
            <div v-for="(i, m) in list.nowAlertTypeList" :key="m">
              <p>{{ i.alertType }}</p>
              <p>{{ i.countNum }}</p>
              <p>
                <i class="el-icon-caret-bottom a1" v-show="arr[m] < 0"
                  >{{ arr[m] }}%</i
                >
                <i class="el-icon-caret-top a2" v-show="arr[m] >= 0"
                  >{{ arr[m] }}%</i
                >
                <span>同比上周</span>
              </p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="dwek1 culm">
          <div class="scenario">
            <header>
              <h4>预警分布</h4>
            </header>
            <Pie1 :pie="list.alertDistribute"></Pie1>
          </div>
          <div class="scenario">
            <header>
              <h4>预警方式</h4>
            </header>
            <Pie2
              :pie="list.alertDistributeList"
              :name="this.piemaxname"
            ></Pie2>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="dwek1">
          <div class="scenario">
            <header>
              <h4>预警次数</h4>
            </header>
            <Bork :rawanum="list.alertNumList"></Bork>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cart1 from "@/components/alertInfoDetailscart/cartrea.vue";
import Cart2 from "@/components/alertInfoDetailscart/dashboardcart.vue";
import Pie1 from "@/components/alertInfoDetailscart/pie1.vue";
import Pie2 from "@/components/alertInfoDetailscart/pie2.vue";
import Bork from "@/components/alertInfoDetailscart/brokenline.vue";
import { statsmain, repetitionRate } from "@/api/alertInfo";
import store from "@/store";
export default {
  name: "DashboardAdmin",
  components: { Cart1, Cart2, Pie1, Pie2, Bork },
  data() {
    return {
      value: 1,
      alertOptions: [
        { value: 1, label: "最近7天" },
        { value: 2, label: "最近30天" },
        { value: 3, label: "最近90天" },
      ],
      all: {
        ap1: [],
        ap2: [],
        ap3: [],
      },
      list: {},
      arr: [],
      piemaxname: "",
      rate: "",
    };
  },
  computed: {
    num() {
      if (this.list.countLastKPI) {
        if (this.list.countLastKPI !== 0 && this.list.countLastKPI !== "0") {
          return (
            (this.list.countNowKPI -
              this.list.countLastKPI / this.list.countLastKPI) *
            100
          );
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
    allnum() {
      if (this.list.countLastAlertAll) {
        if (
          this.list.countLastAlertAll !== 0 &&
          this.list.countLastAlertAll !== "0"
        ) {
          return (
            (this.list.countNowAlertAll -
              this.list.countLastAlertAll / this.list.countLastAlertAll) *
            100
          );
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
  },
  mounted() {
    this.statsmainList(1);
    this.repetitionrate();
  },
  methods: {
    activechange() {
      this.statsmainList(this.value);
    },
    //预警管理-预警详情主页面
    async statsmainList(v) {
      let { data } = await statsmain({ queryTimeType: v });
      this.list = data;
      data.alertNumList.sort((a, b) => {
        return a.countDate > b.countDate ? 1 : -1;
      });
      this.all.ap1 = data.alertNumList;
      if (data) {
        data.lastAlertTypeList.map((i, m) => {
          if (i.countNum !== 0) {
            this.arr.push(
              ((data.nowAlertTypeList[m].countNum - i.countNum) / i.countNum) *
                100
            );
          } else {
            this.arr.push(0);
          }
        });
      }
      store.commit("tagsView/DIR_LIST", data.alertDistributeList);
      let arr = [];
      for (let i in data.alertDistribute) {
        arr.push({ n: i, v: data.alertDistribute[i] });
      }
      arr.sort((a, b) => {
        return b.v - a.v;
      });
      this.piemaxname = arr[0].n;
    },
    //预警管理-预警重复率
    async repetitionrate() {
      let { data } = await repetitionRate();
      this.rate = data;
    },
    goOther() {
      this.$router.push({ name: "alertInfoDetailList" });
    },
  },
};
</script>

<style lang="scss" scoped>
.culm {
  display: flex;
  div {
    flex: 1;
  }
}
.mode {
  height: 150px;
  display: flex;
  align-items: center;
  .imgs {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: rgb(0, 182, 240);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 30px;
  }
}
.mode > div:nth-child(n + 2) {
  padding: 0 50px;
  font-size: 12px;
  color: rgb(152, 152, 152);
  p:nth-child(2) {
    font-size: 26px;
    margin: 5px 0;
    color: rgb(102, 102, 102);
  }

  p:last-child {
    color: rgb(204, 204, 204);
  }
}
.mode > div:nth-child(2) {
  padding-left: 0;
  padding-right: 100px;
  border-right: 1px solid rgb(235, 235, 235);
}
.a1 {
  color: rgb(254, 85, 0);
}
.a2 {
  color: rgb(46, 186, 7);
}
ul,
li,
div,
p {
  margin: 0;
  padding: 0;
}
.scenario {
  header {
    display: flex;
    height: 50px;
    align-items: center;
    border-bottom: 1px solid rgb(235, 235, 235);
    h4 {
      margin: 15px 20px;
      color: rgb(102, 102, 102);
    }
    .btn {
      margin-left: 45%;
    }
  }
}
.scenario > div {
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    list-style: none;
    margin-top: 40px;
    width: 90%;
    height: 280px;
    display: flex;
    font-size: 12px;
    li {
      flex: 1;
      border-right: 1px solid rgb(235, 235, 235);
      .top {
        color: rgb(46, 186, 7);
        span:last-child {
          color: rgb(204, 204, 204);
        }
      }
      .p1 {
        color: rgb(152, 152, 152);
      }
      .tit {
        font-size: 30px;
        color: rgb(102, 102, 102);
        margin: 5px 0;
      }
    }
    li:last-child {
      border: 0;
    }
  }
}
.rate {
  display: flex;
  width: 80%;
  margin: 0 auto;
  height: 100px;
  // margin-top: 30px;
  div {
    font-size: 12px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgb(235, 235, 235);
  }
  div:last-child {
    border: 0;
  }
}
.rate > div > p:nth-child(1) {
  font-size: 24px;
  color: rgb(102, 102, 102);
}
.dwek2 {
  height: 200px;
  background-color: #fff;
}
.dwek1 {
  height: 400px;
  background-color: #fff;
}
.el-col {
  margin-bottom: 40px;
}
.el-divider--vertical {
  display: inline-block;
  width: 2px;
  height: 1.5em;
  margin: 0 20px;
  vertical-align: middle;
  position: relative;
}
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(242, 242, 242);
  position: relative;
}
</style>
