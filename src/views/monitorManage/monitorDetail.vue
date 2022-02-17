<template>
  <div class="app-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" style="background: #8ed6ac">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-num">资产质量</div>
          </div>
          <div class="card-panel-description">
            <div v-if="statisticsList[0]" class="card-panel-num">
              {{ statisticsList[0].finishCount }}/{{
                statisticsList[0].countAll
              }}项
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" style="background: #83cce4">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="message" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-num">借款人</div>
          </div>
          <div class="card-panel-description">
            <div v-if="statisticsList[1]" class="card-panel-num">
              {{ statisticsList[1].finishCount }}/{{
                statisticsList[1].countAll
              }}项
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" style="background: #dcb65e">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-num">资金流向</div>
          </div>
          <div class="card-panel-description">
            <div v-if="statisticsList[2]" class="card-panel-num">
              {{ statisticsList[2].finishCount }}/{{
                statisticsList[2].countAll
              }}项
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" style="background: #d8625a">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="shopping" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-num">企业风险</div>
          </div>
          <div class="card-panel-description">
            <div v-if="statisticsList[3]" class="card-panel-num">
              {{ statisticsList[3].finishCount }}/{{
                statisticsList[3].countAll
              }}项
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="filter-container">
      <el-input
        v-model="listQuery.taskName"
        placeholder="监控任务名称"
        style="width: 15%"
        clearable
      />
      <el-date-picker
        v-model="datePicker"
        type="daterange"
        style="width: 280px"
        range-separator="-"
        start-placeholder="起始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd HH:mm:ss"
        :default-time="['00:00:00', '23:59:59']"
      />

      <el-select
        v-model="listQuery.taskStatus"
        clearable
        placeholder="任务状态"
      >
        <el-option label="未完成" value="1" />
        <el-option label="已完成" value="2" />
      </el-select>

      <el-select v-model="listQuery.projectId" clearable placeholder="所属项目">
        <el-option
          v-for="item in projectInfoList"
          :key="item.id"
          :label="item.projectName"
          :value="item.id"
        />
      </el-select>

      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="exportBtn">导出</el-button>
    </div>
    <el-table
      :data="monitorDetailList"
      :header-cell-style="{ background: 'rgb(70,183,173)', color: 'white' }"
      fit
      highlight-current-row
      style="width: 100%; margin-top: 20px; margin-bottom: 30px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        fixed
        type="selection"
        label="全选"
        align="center"
        width="150"
      />
      <el-table-column label="任务编号" prop="taskNumber" align="center" />

      <el-table-column label="任务名称" prop="taskName" align="center" />
      <el-table-column label="所属项目" prop="projectName" align="center" />
      <el-table-column label="任务状态" prop="taskStatus" align="center" />
      <el-table-column label="监控时间" prop="taskManagementDate" align="center" />
      <el-table-column
        label="操作"
        align="center"
        min-width="200"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            type="text"
            size="small"
            @click="selectView(row)"
          >查看清单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.rows"
      @pagination="getList"
    />
    <!-- 遮罩层loding -->
    <div
      v-if="lod"
      v-loading="true"
      class="app-gloab-loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.7)"
    ></div>
  </div>
</template>

<script>
import { batchExport, getMonitorDetail, statistics } from '@/api/monitor'
import { getAllProject } from '@/api/projectInfo'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      lod: false,
      dataQuery: [],
      total: 0,
      input: '',
      listQuery: {
        taskType: 1,
        startTime: '',
        endTime: '',
        taskStatus: '',
        projectId: '',
        taskName: '',
        rows: 10,
        page: 1
      },
      datePicker: null,
      channelList: [],
      projectInfoList: [],
      statusList: {
        0: '监控中',
        1: '已取消',
        2: '手工取消'
      },
      dateList: { 1: '1天', 2: '2天', 3: '3天' },
      createFormDialogVisible: false,
      alertFrom: {
        datePicker: ''
      },
      ruleTaskDialogVisible: false,
      multipleSelection: [],
      monitorDetailList: [],
      createList: '',
      rules: {},
      statisticsList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async exportBtn() {
      // console.log(this.multipleSelection);
      if (this.multipleSelection.length <= 0) {
        return this.$message.error('请先勾选数据再导出')
      }
      var ids = ''
      this.multipleSelection.forEach((res) => {
        if (ids === '') {
          ids = res.id
        } else {
          ids = ids + ',' + res.id
        }
      })
      const params = {
        ids: ids
      }
      batchExport(params).then((res) => {
        // resolve(res)
        const blob = new Blob([res], {
          type: 'application/vnd.ms-excel'
        }) // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
        const url = window.URL.createObjectURL(blob) // 3.创建一个临时的url指向blob对象

        // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
        const a = document.createElement('a')
        a.href = url
        // a.download = '监控详情.xlsx'
        a.click()
        // 5.释放这个临时的对象url
        window.URL.revokeObjectURL(url)
      })
    },
    async getList() {
      const monitorDetailList = await getMonitorDetail(this.listQuery)
      this.monitorDetailList = monitorDetailList.data.records
      this.total = monitorDetailList.data.total
      const projectResult = await getAllProject()
      // console.log('嘤嘤嘤',projectResult);
      this.projectInfoList = projectResult.data
      const statisticsResult = await statistics(this.listQuery)
      if (statisticsResult.data) {
        this.statisticsList = statisticsResult.data
      }

      // console.log('this.statisticsList', this.statisticsList)
    },
    async search() {
      this.lod = true
      if (this.datePicker) {
        this.listQuery.startTime = this.datePicker[0]
        this.listQuery.endTime = this.datePicker[1]
      }
      const monitorDetailList = await getMonitorDetail(this.listQuery);
      this.monitorDetailList = monitorDetailList.data.records
      this.total = monitorDetailList.data.total
      const statisticsResult = await statistics(this.listQuery)
      this.statisticsList = statisticsResult.data
      this.lod = false
    },
    async selectView(row) {
      console.log(row, 'row')
      this.$router.push({
        name: 'monitorDetailInfoResult',
        query: { id: row.id }
      })
    },
    handleRenwe(row) {
      this.createList = row
    },
    addAlertTask() {
      this.createFormDialogVisible = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-content {
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

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
        background: #34bfa3;
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
      color: #34bfa3;
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
        margin-top: 12px;
        span {
          color: red;
          margin-right: 5px;
        }
      }

      .card-panel-num {
        font-size: 20px;
        /* margin-bottom: 12px; */
        line-height: 108px;
        color: #fff;
      }
    }
  }
}

@media (max-width: 550px) {
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
</style>

