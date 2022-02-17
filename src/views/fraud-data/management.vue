<template>
  <div class="dashboard-editor-container">
    <!-- 预警人数 -->
    <el-row style="color: #535353">
      <div class="tit1">{{ $route.query.tit }}</div>
      <div class="tit2">{{ $route.query.name }}</div>
    </el-row>
    <!-- 评分人数 -->
    <el-row :gutter="20">
      <el-col :span="13">
        <div class="grid-content bg-purple">
          <div class="dwbk1">
            <Score
              :skip-name="skipName"
              :monitor-id="$route.query.id"
              :result="result"
            />
          </div>
        </div>
      </el-col>
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
    <!-- 中国地图&评分数据 -->
    <el-row :gutter="60">
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <div class="dwbk2">
            <!-- left -->
            <div>
              <header>评分情况</header>
              <div class="chinamap">
                <ChinaMap :map-id="$route.query.id" />
              </div>
            </div>
            <!-- right -->
            <div>
              <header>评分</header>
              <div class="rank">
                <!-- 评分表 -->
                <el-table
                  :data="tableDataMap"
                  style="width: 80%; height: 75%; font-size: 12px"
                  align="center"
                  :header-cell-style="{
                    color: 'rgb(204,204,204)',
                    'font-size': '12px',
                    'font-weight': '400',
                  }"
                >
                  <el-table-column prop="sort" label="排名" width="60" />
                  <el-table-column
                    prop="provinceName"
                    label="地区"
                    width="100"
                  />
                  <el-table-column width="120" label="占比">
                    <template slot-scope="{ row }">
                      <div class="disprow">
                        <span>{{ row.proportion.toFixed(2) + "%" }}</span>
                        <el-progress
                          :percentage="row.proportion"
                          :show-text="false"
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="scoreAve" label="评分" width="60" />
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <div class="disp">
            <div class="dwbk3">
              <header>多地址</header>
              <div>
                <img
                  :src="require('@/assets/addresschange/u3612.svg')"
                  alt=""
                >
                <ul>
                  <li>总人数</li>
                  <li>{{ r1 }}<span>人</span></li>
                  <li>数据详情</li>
                </ul>
              </div>
            </div>
            <div class="dwbk3">
              <header>地址变更</header>
              <div>
                <img
                  class="u1"
                  :src="require('@/assets/addresschange/u3621.svg')"
                  alt=""
                >

                <ul>
                  <li>总人数</li>
                  <li>{{ r2 }}<span>人</span></li>
                  <li>数据详情</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 地址评分-重点地区提示 -->
    <el-card style="margin-top: 40px">
      <div class="area">
        <img :src="require('@/assets/addresschange/u3626.png')" alt="">
        <ul>
          <li>
            <div>重点地区提示</div>
            <div>{{ colorcommandTitle }}</div>
            <div>
              <el-dropdown
                split-button
                type="primary"
                size="mini"
                @command="handleCommand"
              >
                {{ commandTitle }}
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(i, m) of commandList"
                    :key="i"
                    :command="m + 1"
                  >{{ i }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </li>
          <li>
            <div>地区：{{ focalPoint.provinceName }}</div>
            <div>统计开始：{{ focalPoint.startDate }}</div>
            <div>统计结束：{{ focalPoint.endDate }}</div>
          </li>
          <li>
            <div>当前状态：重点提示</div>
          </li>
          <li>
            <router-link
              :to="{
                name: 'addressScoreFocalPointDetails',
                query: {
                  monitorId: this.$route.query.id,
                  provinceCode: focalPoint.provinceCode,
                },
              }"
            >查看详情</router-link>
            <a 
              @click="downexport(focalPoint.provinceCode, 'focalPoint')"
            >导出清单</a>
          </li>
        </ul>
      </div>
    </el-card>
    <!-- 地址评分-快速增长地区 -->
    <el-card><div class="area">
      <img :src="require('@/assets/addresschange/u3626.png')" alt="">
      <ul>
        <li>
          <div>快速增长地区</div>
          <div>{{ colorcommandTitle1 }}</div>
          <div>
            <el-dropdown
              split-button
              type="primary"
              size="mini"
              @command="handleCommand1"
            >
              {{ commandTitle1 }}
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(i, m) of commandList"
                  :key="i"
                  :command="m + 1"
                >{{ i }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </li>
        <li>
          <div>地区：{{ rapidGrowth.provinceName }}</div>
          <div>统计开始：{{ rapidGrowth.startDate }}</div>
          <div>统计结束：{{ rapidGrowth.endDate }}</div>
        </li>
        <li>
          <div>当前状态：重点提示</div>
        </li>
        <li>
          <router-link
            :to="{
              name: 'addressScoreRapidGrowthDetails',
              query: {
                monitorId: this.$route.query.id,
                provinceCode: rapidGrowth.provinceCode,
              },
            }"
          >查看详情</router-link>
          <a
            ref="down"
            @click="downexport(rapidGrowth.provinceCode, 'rapidGrowth')"
          >导出清单</a>
        </li>
      </ul>
    </div>
    </el-card>
  </div>
</template>

<script>
import Score from '@/components/instansefder/farddatamoudetion.vue'
import Score1 from '@/components/instansefder/fardetailcard.vue'
import ChinaMap from '@/components/Mapchina/chain.vue'
import {
  getPeople,
  monitorId,
  addressRank,
  addressMultipl,
  addressMmanagement,
  addressFocalPoint,
  addressScoreRapidGrowth,
  DownExport
} from '@/api/alertInfoDetail'
export default {
  components: { Score, Score1, ChinaMap },
  data() {
    return {
      asstestit: {
        tit1: '累计评分次数',
        tit2: '今日地址评分（次）',
        tit3: '平均每日评分(次)'
      },
      result: {},
      skipName: 'addressScorePersonDetails',
      skipName2: 'addressScoreScoreDetails',
      frauddata: {},
      dataMap: {},
      tableDataMap: [],
      commandTitle: '其他时间选择',
      colorcommandTitle: '过去一周',
      commandTitle1: '其他时间选择',
      colorcommandTitle1: '过去一周',
      commandIndex: 0,
      commandList: [
        '过去一周',
        '过去一月',
        '过去一季度',
        '过去半年',
        '过去一年'
      ],
      r1: null,
      r2: null,
      focalPoint: {},
      rapidGrowth: {}
    }
  },
  created() {
    this.addressfocalPoint(1)
    this.addressrapidGrowth(1)
    this.getPeopl()
    this.monitorid()
    this.addressrank()
    this.addressmultipl()
    this.addressMmanagement()
  },
  methods: {
    async getPeopl() {
      const { data } = await getPeople(this.$route.query.id)
      this.result = data
    },
    async monitorid() {
      const { data } = await monitorId(this.$route.query.id)
      this.frauddata = data
    },
    // 地址评分-地图(右)地区排名
    async addressrank() {
      const { data } = await addressRank(this.$route.query.id)
      if (data) {
        data.map((i) => {
          i.proportion = i.proportion * 100
        })
        this.tableDataMap = data
      }

      // console.log(result,'result');
    },
    handleCommand(v) {
      this.commandTitle = this.commandList[v - 1]
      this.colorcommandTitle = this.commandList[v - 1]
      this.addressfocalPoint(v)
    },
    handleCommand1(v) {
      this.commandTitle1 = this.commandList[v - 1]
      this.colorcommandTitle1 = this.commandList[v - 1]
      this.addressrapidGrowth(v)
    },
    // 地址评分-多地址
    async addressmultipl() {
      const { data } = await addressMultipl(this.$route.query.id)
      this.r1 = data
    },
    // 地址评分-地址变更
    async addressMmanagement() {
      const { data } = await addressMmanagement(this.$route.query.id)
      this.r2 = data
    },
    // 地址评分-重点地区提示
    async addressfocalPoint(v) {
      const { data } = await addressFocalPoint({
        monitorId: this.$route.query.id,
        queryTimeType: v
      })
      if (data) {
        this.focalPoint = data
      }
    },
    // 地址评分-快速增长地区
    async addressrapidGrowth(v) {
      const { data } = await addressScoreRapidGrowth({
        monitorId: this.$route.query.id,
        queryTimeType: v
      })
      // console.log(data,'dddddd');
      if (data) {
        this.rapidGrowth = data
        // console.log('ul')
      }
    },
    async downexport(v, downurl) {
      if(!v){
        return this.$message.error('暂无数据')
      }
      const res = await DownExport(
        {
          monitorId: this.$route.query.id,
          provinceCode: v
        },
        downurl
      )
      const blob = new Blob([res], {
        type: 'application/vnd.ms-excel'
      })
      const url = window.URL.createObjectURL(blob) // 3.创建一个临时的url指向blob对象
      // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
      const a = document.createElement('a')
      a.href = url
      // a.download = '监控详情.xlsx'
      a.click()
      // 5.释放这个临时的对象url
      window.URL.revokeObjectURL(url)
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
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
  height: 180px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dwbk3 {
  font-weight: 900;
  color: rgb(102, 102, 102);
  height: 180px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  header {
    width: 100%;
    padding-left: 35px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgb(235, 235, 235);
  }
  div {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 30px;
    img {
      height: 75px;
      width: 75px;
      display: flex;
      justify-content: center;
    }
    .u1 {
      padding: 0 15px;
    }
    ul {
      height: 60%;
      font-size: 12px;
      color: rgb(161, 161, 161);
      display: flex;
      flex-direction: column;

      li:nth-child(2) {
        color: rgb(102, 102, 102);
        font-size: 24px;

        margin-bottom: 10px;
        span {
          font-size: 12px;
        }
      }
    }
  }
}
.dwbk2 {
  height: 410px;
  background-color: #fff;
  display: flex;
  div {
    flex: 1;
    height: 100%;
    header {
      padding-left: 50px;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid rgb(235, 235, 235);
    }
    .chinamap {
      width: 100%;
      height: 90%;
    }
    .rank {
      width: 100%;
      height: 100%;
      display: flex;

      align-items: center;
    }
  }
}
.disp {
  height: 410px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.el-row:nth-child(n + 2) {
  margin-bottom: 20px;
}
.el-card {
  margin-top: 20px;
}
.el-row:first-child {
  margin-left: 10px;
}
.el-col {
  cursor: pointer;
}
.disprow {
  display: flex;
  align-items: center;
  span {
    width: 50%;
    margin-right: 5px;
  }
}
.el-dropdown {
}
.area {
  display: flex;
  img {
    background-color: rgb(243, 243, 243);
    width: 70px;
    height: 70px;
    padding: 15px;
  }
  ul {
    display: flex;
    flex-direction: column;
    color: rgb(152, 152, 152);
  }
}
.el-card {
  position: relative;
}
.area > ul > li:nth-child(1) {
  color: rgb(102, 102, 102);
  font-weight: bold;
  display: flex;
  div:nth-child(2) {
    font-size: 12px;
    padding: 5px 10px;
    margin-left: 40px;
    color: #fff;
    font-weight: lighter;
    background-color: rgb(255, 170, 0);
  }
  div:nth-child(3) {
    position: absolute;
    right: 40px;
  }
}
.area > ul > li:nth-child(2),
.area > ul > li:nth-child(3) {
  margin-top: 10px;
  color: rgb(152, 152, 152);
  font-weight: 400;
  display: flex;
  font-size: 12px;
  div {
    margin-right: 150px;
  }
}
.area > ul > li:last-child {
  margin: 30px 0 10px 0;
  display: flex;
  font-size: 12px;
  color: rgb(16, 141, 233);
  a {
    margin-right: 20px;
  }
}
</style>

