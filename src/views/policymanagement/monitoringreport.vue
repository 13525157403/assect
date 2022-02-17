<template>
  <div class="cust-active">
    <el-row>
      <el-col :span="24">
        <div class="dwkskt kt3">
          <header>
            <div>各规则通过客户比例比较</div>
            <div class="right">
              <el-button size="mini" class="back" @click="backlevel">
                <img :src="require('@/assets/icon/u905.svg')" alt="">
                返回
              </el-button>
              <el-button size="mini" class="green">应用模</el-button>
            </div>
          </header>
          <div class="cart-tit">
            <div class="title">
              2015-10-02 09:12:21
              <span>统计时间</span>
            </div>
            <div class="cust-active-slet">
              <el-select
                v-model="selectquery.batchId"
                placeholder="请选择"
                size="mini"
                @change="findRuleRecordByStrategyId"
              >
                <el-option
                  v-for="i in strategyexecution"
                  :key="i"
                  :label="i"
                  :value="i"
                />
              </el-select>
              <el-select
                v-model="selectquery.contrastBatchId"
                placeholder="请选择"
                size="mini"
                @change="findRuleRecordByStrategyId"
              >
                <el-option
                  v-for="i in strategyexecution"
                  :key="i"
                  :label="i"
                  :value="i"
                />
              </el-select>
            </div>
          </div>
          <div class="cart-view">
            <Propeo :amt="amtcartprop" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="dwkskt kt2">
          <header>
            <div class="tit">提额（3个月）后额度使用率比较</div>
          </header>
          <div class="cont">
            <div class="left-data flex">
              <div class="title">目标客群数据</div>
              <div>
                <span>目标客群数据</span>
                <el-select
                  v-model="leftbatchId"
                  placeholder="请选择"
                  size="mini"
                  @change="findRecordByStrategyId('left')"
                >
                  <el-option
                    v-for="i in strategyexecution"
                    :key="i"
                    :label="i"
                    :value="i"
                  />
                </el-select>
                <el-radio-group
                  v-model="customergroupdata.k2"
                  size="mini"
                  @change="radiochange"
                >
                  <el-radio-button label="提额前额度使用率" />
                  <el-radio-button label="提额后额度使用率" />
                </el-radio-group>
                <el-table
                  :data="leftdata"
                  style="margin: 20px 0 0 0"
                  :header-cell-style="{
                    'font-size': '12px',
                    'font-weight': 'normal',
                    border: 0,
                    color: 'rgb(170,170,170)',
                  }"
                  :cell-style="{ border: 0 }"
                >
                  <el-table-column
                    label="提额前授信额度区间"
                    prop="section"
                  />
                  <el-table-column label="使用率" prop="value">
                    <template slot-scope="{ row }">
                      <div class="speed">
                        <span>{{ row.value }}%</span>

                        <el-progress
                          :percentage="row.value - 0"
                          :show-text="false"
                        />
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="center">
              <a>
                <img :src="require('@/assets/icon/u934.svg')" alt="">
                <img :src="require('@/assets/icon/u935.svg')" alt="">
              </a>
            </div>
            <div class="right-data flex">
              <div class="title">对照组客群数据</div>
              <div>
                <span>对照组客群数据</span>
                <el-select
                  v-model="rightbatchId"
                  placeholder="请选择"
                  size="mini"
                  @change="findRecordByStrategyId('right')"
                >
                  <el-option
                    v-for="i in strategyexecution"
                    :key="i"
                    :label="i"
                    :value="i"
                  />
                </el-select>
                <el-radio-group
                  v-model="customergroupdata.k2"
                  size="mini"
                  @change="radiochange"
                >
                  <el-radio-button label="提额前额度使用率" />
                  <el-radio-button label="提额后额度使用率" />
                </el-radio-group>
                <el-table
                  :data="rightdata"
                  style="margin: 20px 0 0 0"
                  :header-cell-style="{
                    'font-size': '12px',
                    'font-weight': 'normal',
                    border: 0,
                    color: 'rgb(170,170,170)',
                  }"
                  :cell-style="{ border: 0 }"
                >
                  <el-table-column
                    label="提额前授信额度区间"
                    prop="section"
                  />
                  <el-table-column label="使用率" prop="value">
                    <template slot-scope="{ row }">
                      <div class="speed">
                        <span>{{ row.value }}%</span>
                        <el-progress
                          :percentage="row.value - 0"
                          :show-text="false"
                        />
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="dwkskt kt2">
          <header>
            <div class="tit">贷中评分模型评分分布比较</div>
          </header>
          <div class="distr">
            <div class="distr-left">
              <div class="tit">目标组客群数据</div>
              <el-select
                v-model="scoredistribution.batchId"
                size="mini"
                @change="findModelRecordByStrategyId"
              >
                <el-option
                  v-for="i in strategyexecution"
                  :key="i"
                  :label="i"
                  :value="i"
                />
              </el-select>
              <div class="tit">对照组客群数据</div>
              <el-select
                v-model="scoredistribution.contrastBatchId"
                size="mini"
                placeholder="请选择"
                @change="findModelRecordByStrategyId"
              >
                <el-option
                  v-for="i in strategyexecution"
                  :key="i"
                  :label="i"
                  :value="i"
                />
              </el-select>
              <div class="legend">
                <div>
                  <p class="online1" />
                  <a>建模样本通过人数占比</a>
                </div>
                <div>
                  <p class="online2" />
                  <a>目标客群执行通过人数占比</a>
                </div>
                <div>
                  <p class="online3" />
                  <a>对照客群执行通过人数占比</a>
                </div>
              </div>
            </div>
            <div class="distr-right">
              <Broken :rawanum="scoredrawanum" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 遮罩层loding -->
    <div
      v-if="lod"
      v-loading="true"
      class="app-gloab-loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.7)"
    />
  </div>
</template>

<script>
import Propeo from '@/assembly/activestrategycart/proportionofpeoplecart.vue'
import Broken from '@/assembly/activestrategycart/linecartbroken.vue'
import {
  findByStrategyId,
  findRuleRecordByStrategyId,
  findModelRecordByStrategyId,
  findRecordByStrategyId
} from '@/api/policymanagement'
export default {
  components: {
    Propeo,
    Broken
  },
  data() {
    return {
      lod: false,
      // 下拉框1
      strategyexecution: [],
      selectquery: {
        batchId: '',
        contrastBatchId: '',
        strategyId: ''
      },
      amtcartprop: [],
      // 客群数据
      leftbatchId: '',
      rightbatchId: '',
      leftdata: [],
      rightdata: [],
      customergroupdata: {},
      // 贷中评分模型评分分布比较
      scoredistribution: {
        batchId: '',
        contrastBatchId: '',
        strategyId: ''
      },
      scoredrawanum: []
    }
  },
  created() {
    this.selectquery.strategyId = 24
    this.scoredistribution.strategyId = 24
  },
  mounted() {
    this.findByStrategyId()
  },
  methods: {
    // 额度使用率单选框
    radiochange() {},

    backlevel() {
      this.$router.go(-1)
    },
    // 各规则通过客户比例比较
    async findRuleRecordByStrategyId() {
      if (!this.selectquery.batchId || !this.selectquery.contrastBatchId) {
        return
      }
      const { data } = await findRuleRecordByStrategyId(this.selectquery)
      if (!data) return
      this.amtcartprop = data
    },
    // 贷中评分模型评分分布比较
    async findModelRecordByStrategyId() {
      if (
        !this.scoredistribution.batchId ||
        !this.scoredistribution.contrastBatchId
      ) {
        return
      }
      const { data } = await findModelRecordByStrategyId(this.scoredistribution)
      if (!data) return
      this.scoredrawanum = data
    },
    // 提额后额度使用率比较
    async findRecordByStrategyId(name) {
      const { data } = await findRecordByStrategyId({
        strategyId: this.$route.query.id,
        batchId: this[`${name}batchId`]
      })
      if (!data) return
      this[`${name}data`] = []
      data.forEach((item) => {
        let value = null
        if (!item.totalCreditlimit || item.totalCreditlimit == 0) {
          value = 0
        } else {
          value = (
            (item.totalloanBalance / item.totalCreditlimit) *
            100
          ).toFixed(2)
        }
        this[`${name}data`].push({
          section: item.creditLimitLevelValue,
          value
        })
      })
    },
    async findByStrategyId() {
      this.lod = true
      const { data } = await findByStrategyId(this.$route.query.id)
      this.lod = false
      if (!data || data.length == 0) return
      this.strategyexecution = data
      this.selectquery.batchId = data[0]
      this.scoredistribution.batchId = data[0]
    }
  }
}
</script>

<style lang="scss" scoped>
//遮罩层loding
.app-loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30001;
}
.distr {
  display: flex;
  width: 100%;
}
.distr-left {
  flex: 2;
  font-size: 12px;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  .tit {
    margin: 12px 5px;
    color: rgb(98, 98, 98);
  }
}
.legend > div {
  width: 100%;
  display: flex;
  align-items: center;
  height: 20px;

  padding: 5px 10px;
  margin: 10px 0;
  a {
    width: 150px;
    margin: 0 10px;
  }
  p {
    width: 19px;
    height: 9px;
    border-radius: 100px;
  }
  .online1 {
    border: 2px solid rgb(73, 169, 238);
  }
  .online2 {
    border: 2px solid rgb(152, 216, 125);
  }
  .online3 {
    border: 2px solid rgb(255, 216, 110);
  }
}
.distr-right {
  margin-left: -80px;
  flex: 12;
}
.distr > div {
}
.cont {
  width: 100%;
  display: flex;
  .center {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
.cont > .flex {
  color: rgb(98, 98, 98);
  flex: 5;
  padding: 20px 35px;
  .title {
    font-size: 20px;

    margin-bottom: 20px;
  }
  .el-select {
    width: 140px;
  }
}
.cart-view {
  width: 100%;
  margin-top: 20px;
}
.speed {
  display: flex;
  align-items: center;
  span {
    width: 20%;
  }
  .el-progress {
    margin-left: 10px;
    width: 40%;
  }
}
.cart-tit {
  margin: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 20px;

    span {
      font-size: 12px;
      color: rgb(152, 152, 152);
    }
  }
}
// ul,
// li,
// div {
//   margin: 0;
//   padding: 0;
//   list-style: none;
// }
.cust-active-slet {
  .el-select {
    width: 140px;
    margin-right: 10px;
  }
}
.cust-active {
  background-color: rgb(242, 242, 242);
  padding: 15px;
}
.dwkskt {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  .tit {
    display: flex;
    align-items: center;
  }
  header {
    padding: 20px 20px;
    border-bottom: 1px solid rgb(242, 242, 242);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .back {
      padding: 5px 15px;
    }
    .el-row {
      width: 100%;
      margin: 0;
      padding: 0;
      .right {
        float: right;
      }
    }
  }
}
::v-deep {
  .right {
    display: flex;
    align-items: center;
    .el-icon-back:before {
      color: rgb(80, 205, 152) !important;
      font-weight: bolder;
    }
  }
}
.kt2 {
  height: 500px;
}
.kt3 {
  height: 650px;
}
.el-row {
  margin-bottom: 40px;
}
.green {
  color: #fff;
  background-color: rgb(80, 205, 152);
  border: 0;
}
</style>
