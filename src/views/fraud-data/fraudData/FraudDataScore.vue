<template>
  <div v-loading="lod" class="app-container" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
    <div class="filter-container">
      <el-input v-model="listQuery.key" style="width: 20%" placeholder="姓名/身份证/手机号码" />
      <el-date-picker
        v-model="listQuery.datePicker"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd HH:mm:ss"
        :default-time="['00:00:00', '23:59:59']"
        @input="handleDate"
      />
      <el-select v-model="listQuery.scoreId" clearable placeholder="评分结果">
        <el-option label="0～250" value="1" />
        <el-option label="251～500" value="2" />
        <el-option label="501～750" value="3" />
        <el-option label="751～1000" value="4" />
      </el-select>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="exportBtn">导出</el-button>
    </div>
    <el-table
      :data="dataQuery"
      :header-cell-style="{background: '#3a835d',color: 'white'}"
      fit
      highlight-current-row
      style="width: 100%;margin-top:20px;margin-bottom:30px"
    >
      <el-table-column label="客户姓名" prop="name" align="center" />
      <el-table-column label="所属项目" prop="projectName" align="center" />
      <el-table-column label="手机号码" prop="mobile" align="center" />
      <el-table-column label="身份证" prop="certNo" align="center" />
      <el-table-column label="在贷余额" prop="loanBalance" align="center" >
        <template slot-scope="{ row }">
          <div>
            <div v-if="row.loanStatus == '逾期'||row.loanStatus == '2'" style="color: rgb(217, 0, 27)">
              {{ row.loanBalance }}    逾
            </div>
            <div v-else>
              {{ row.loanBalance }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="监控日期" prop="monitorDate" align="center" />
      <el-table-column label="评分结果" prop="score" align="center" />
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.rows"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  FraudDataScore,
  FraudDataScoreExport
} from '@/api/alertInfoDetail'
import { getRuleNameList } from '@/api/ruleConfig'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      handleDate: [],
      lod: false,
      dataQuery: [],
      total: 0,
      listQuery: {
        monitorId: this.$route.query.monitorId,
        key: '',
        datePicker: [],
        startDate: '',
        endDate: '',
        scoreId: '',
        rows: 10,
        page: 1
      },
      projectList: [],
      ruleInfoList: []
    }
  },
  created() {
    // this.getRule()
    this.getList()
  },
  methods: {
    exportBtn() {
      // console.log(api.serverUrl);
      const params = {
        monitorId: this.$route.query.monitorId,
        key: this.listQuery.key,
        startDate: this.listQuery.startDate,
        endDate: this.listQuery.endDate,
        scoreId: this.listQuery.scoreId
      }
      FraudDataScoreExport(params).then(
        res => {
          // resolve(res)
          const blob = new Blob([res], {
            type: 'application/vnd.ms-excel'
          }) // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
          const url = window.URL.createObjectURL(blob) // 3.创建一个临时的url指向blob对象

          // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
          const a = document.createElement('a')
          a.href = url
          // a.download = '反欺诈-累计评分结果.xlsx'
          a.click()
          // 5.释放这个临时的对象url
          window.URL.revokeObjectURL(url)
        })
    },
    async getList() {
      let startDate
      let endDate
      // eslint-disable-next-line eqeqeq
      if (undefined != this.listQuery.datePicker) {
        startDate = this.listQuery.datePicker[0]
        endDate = this.listQuery.datePicker[1]
      }
      var fraudDataScore = await FraudDataScore({
        monitorId: this.listQuery.monitorId,
        rows: this.listQuery.rows,
        page: this.listQuery.page,
        key: this.listQuery.key,
        scoreId: this.listQuery.scoreId,
        startDate: startDate,
        endDate: endDate
      })
      this.total = fraudDataScore.data.total
      fraudDataScore = fraudDataScore.data.records
      this.dataQuery = fraudDataScore
    },
    async search() {
      this.lod = true
      console.log(this.listQuery.datePicker)
      let startDate
      let endDate
      // eslint-disable-next-line eqeqeq
      if (undefined != this.listQuery.datePicker) {
        startDate = this.listQuery.datePicker[0]
        endDate = this.listQuery.datePicker[1]
      }
      FraudDataScore({
        monitorId: this.listQuery.monitorId,
        rows: this.listQuery.rows,
        page: this.listQuery.page,
        key: this.listQuery.key,
        scoreId: this.listQuery.scoreId,
        startDate: startDate,
        endDate: endDate
      }).then((res) => {
        this.lod = false
        this.total = res.data.total
        res = res.data.records
        this.dataQuery = res
      })
    },
    async getRule() {
      const ruleInfo = await getRuleNameList(this.$route.query.monitorId)
      this.ruleInfoList = ruleInfo.data
    }
  }
}
</script>
