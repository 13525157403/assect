<template>
  <!-- 地址评分统计页面-人数数据卡-点击后跳转的详情页 -->
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.key" style="width: 220px" placeholder="姓名/身份证/手机号码" />
      <el-date-picker
        v-model="dateArr"
        style="width: 230px; height: 36px"
        size="small"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @input="handleDate"
      />
      <el-select v-model="listQuery.ruleId" clearable placeholder="命中规则">
        <el-option v-for="(val, key, i) in ruleNameList" :key="i" :label="val.ruleName" :value="val.id" />
      </el-select>
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button type="primary" @click="exportBtn">导出</el-button>
    </div>
    <el-table
      :data="resultList"
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
      <el-table-column label="命中规则详情" prop="ruleNameSplit" align="center" />
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
import Pagination from '@/components/Pagination'
import { addressScoreDataCardDetails, addressScoreDataCardDownExport } from '@/api/alertInfoDetail'
import { getRuleNameListByMonitorId } from '@/api/ruleConfig'

export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      dateArr: [],
      ruleNameList: [],
      listQuery: {
        rows: 10,
        page: 1,
        monitorId: '',
        provinceCode: '',
        key: '',
        startDate: '',
        endDate: '',
        ruleId: ''
      },
      resultList: []
    }
  },
  created() {
    this.getList()
    this.getRuleNameListByMonitorId()
  },
  methods: {
    async exportBtn() {
      const res = await addressScoreDataCardDownExport(
        {
          monitorId: this.listQuery.monitorId,
          provinceCode: this.listQuery.provinceCode,
          key: this.listQuery.key,
          startDate: this.listQuery.startDate,
          endDate: this.listQuery.endDate,
          thresholdType: this.listQuery.thresholdType
        },
        'people'
      )
      console.log(res)
      const blob = new Blob([res], {
        type: 'application/vnd.ms-excel'
      })
      const url = window.URL.createObjectURL(blob) // 3.创建一个临时的url指向blob对象
      // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
      const a = document.createElement('a')
      a.href = url
      // a.download = '地址评分-累计人数数据-详情.xlsx'
      a.click()
      // 5.释放这个临时的对象url
      window.URL.revokeObjectURL(url)
    },
    async getList() {
      this.listQuery.monitorId = this.$route.query.monitorId
      this.listQuery.provinceCode = this.$route.query.provinceCode
      this.listQuery.startDate = this.dateArr[0]
      this.listQuery.endDate = this.dateArr[1]
      const res= await addressScoreDataCardDetails(this.listQuery, 'people')
      this.resultList = res.data.records
      this.total = res.data.total
    },
    async getRuleNameListByMonitorId() {
      const ruleNameListResult = await getRuleNameListByMonitorId(this.$route.query.monitorId)
      console.log(ruleNameListResult);
      this.ruleNameList = ruleNameListResult.data
    },
    // 选择日期时获取日期数据
    handleDate(e) {
      this.$nextTick(() => {
        if (e == null) {
          this.dateArr = []
        } else {
          this.$set(this, 'dateArr', [e[0], e[1]])
        }
      })
    }
  }
}
</script>
