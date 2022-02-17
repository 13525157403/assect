<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="input" style="width: 11%" placeholder="姓名/身份证" />
      <el-date-picker
        v-model="value1"
        type="datetimerange"
        style="width: 200px"
        range-separator="至"
        start-placeholder="起始日期"
        end-placeholder="结束日期"
      />
      <el-select v-model="listQuery.channel" clearable placeholder="渠道">
        <el-option
          v-for="item in channelList"
          :key="item.id"
          :label="item.channelName"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="listQuery.channel" clearable placeholder="产品">
        <el-option
          v-for="item in channelList"
          :key="item.id"
          :label="item.channelName"
          :value="item.id"
        />
      </el-select>

      <el-select v-model="listQuery.channel" clearable placeholder="客户状态">
        <el-option
          v-for="item in channelList"
          :key="item.id"
          :label="item.channelName"
          :value="item.id"
        />
      </el-select>
      <el-button type="primary" @click="getCurrentTask">查询</el-button>
      <el-button type="primary" @click="getCurrentTask">批量下载分析报告</el-button>
      <el-button type="primary" @click="getCurrentTask">批量下载影响材料</el-button>
    </div>
    <el-table
      :data="dataQuery"
      :header-cell-style="{background: '#3a835d',color: 'white'}"
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      style="width: 100%;margin-top:20px;margin-bottom:30px"
      >
      <el-table-column
        fixed
        prop="date"
        label="全选"
        width="150"
      />
      <el-table-column label="客户姓名" prop="taskNumber" align="center" />
      <el-table-column label="手机号码" prop="alert" align="center" />
      <el-table-column label="身份证" prop="alert" align="center" />
      <el-table-column label="渠道" prop="alert" align="center" />
      <el-table-column label="授信产品" prop="alert" align="center" />
      <el-table-column label="授信日期" prop="alert" align="center" />
      <el-table-column label="客户状态" prop="alert" align="center" />
      <el-table-column label="操作" prop="alert" align="center" />
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
import { pageNearEndTaskInfo, getAllChannel, renewTask, cancelRenewal } from '@/api/channel'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      dataQuery: [],
      total: 0,
      listQuery: {
        dateStamp: '',
        status: '',
        channel: '',
        rows: 10,
        page: 1
      },
      channelList: [],
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
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: [],
      createList: '',
      rules: {}
    }
  },
  created() {
    getAllChannel().then(res => {
      this.channelList = res.data
    })
    this.getList()
  },
  methods: {
    async getList() {
      var channelList = await getAllChannel()
      this.channelList = channelList.data
      var allTaskInfo = await pageNearEndTaskInfo({
        rows: this.listQuery.rows,
        page: this.listQuery.page
      })
      this.total = allTaskInfo.data.totalElements
      allTaskInfo = allTaskInfo.data.content
      for (var i = 0; i < allTaskInfo.length; i++) {
        for (var j = 0; j < this.channelList.length; j++) {
          // eslint-disable-next-line eqeqeq
          if (allTaskInfo[i].channelId == this.channelList[j].id) {
            allTaskInfo[i].channelName = this.channelList[j].channelName
          }
        }
      }
      this.dataQuery = allTaskInfo
    },
    getCurrentTask() {
      pageNearEndTaskInfo({
        rows: this.listQuery.rows,
        page: this.listQuery.page,
        channelId: this.listQuery.channel,
        remainDays: this.listQuery.dateStamp,
        status: this.listQuery.status
      }).then(res => {
        this.total = res.data.totalElements
        res = res.data.content
        for (var i = 0; i < res.length; i++) {
          for (var j = 0; j < this.channelList.length; j++) {
            // eslint-disable-next-line eqeqeq
            if (res[i].channelId == this.channelList[j].id) {
              res[i].channelName = this.channelList[j].channelName
            }
          }
        }
        this.dataQuery = res
      })
    },
    cancelRenewal(row) {
      cancelRenewal({ taskId: row.id }).then(res => {
        if (res.success) {
          this.$notify({
            title: '成功',
            message: '取消续订成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        }
      })
    },
    handleRenwe(row) {
      this.createList = row
      this.createFormDialogVisiblecreateFormDialogVisible = true
    },
    addAlertTask() {
      this.createFormDialogVisible = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    renewTaskDate() {
      this.$refs['createForm'].validate((valid) => {
        if (valid) {
          renewTask({
            taskId: this.createList.id,
            startDate: this.createForm.datePicker[0],
            endDate: this.createForm.datePicker[1]
          }).then(res => {
            if (res.success) {
              this.$notify({
                title: '成功',
                message: '续订成功',
                type: 'success',
                duration: 2000
              })
              this.createFormDialogVisible = false
              this.getList()
            }
          })
        }
      })
    }
  }
}
</script>
