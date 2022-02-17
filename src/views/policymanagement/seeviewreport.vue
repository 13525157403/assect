<template>
  <div class="cust">
    <el-row>
      <el-col :span="4">
        <div class="slets">
          <span>客户姓名/身份证号:</span>
          <el-input
            v-model="listdataquery.userNameOrCertNo"
            size="mini"
            style="width: 95px"
            placeholder=""
            clearable
          />
        </div>
      </el-col>
      <el-col :span="5">
        <div class="slets">
          <span>所属项目:</span>
          <el-select
            v-model="listdataquery.projectId"
            size="mini"
            style="width: 190px"
            placeholder="不限"
            clearable
          >
            <el-option
              v-for="i in projectsletlist"
              :key="i.id"
              :label="i.projectName"
              :value="i.id"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="slets">
          <span>处理日期:</span>
          <el-date-picker
            v-model="dataValue"
            size="mini"
            style="width: 330px"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="changedatavalue"
          />
        </div>
      </el-col>
      <el-col :span="1">
        <el-button size="mini" class="green" @click="getList">查询</el-button>
      </el-col>
      <el-col :span="6">
        <div class="lastslet">
          <el-checkbox-group
            v-model="listdataquery.searchLast"
            @change="checkboxmi"
          >
            <el-checkbox
              true-label="true"
              false-label="false"
              label="查看最近一次"
            />
          </el-checkbox-group>
          <el-button size="mini" @click="searchExport">导出</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="table">
      <el-table
        :data="mickdata"
        :header-cell-style="{
          'font-size': '12px',
          'font-weight': 'normal',
          color: '#000',
          background: 'rgb(238,241,246)',
        }"
        :cell-style="{ 'font-size': '12px' }"
      >
        <el-table-column label="客户姓名" align="center" prop="name" />
        <el-table-column label="所属项目" align="center" prop="projectName" />
        <el-table-column
          label="身份证号"
          width="200"
          align="center"
          prop="certNo"
        />
        <el-table-column label="在贷余额" align="center" prop="loanBalance" />
        <el-table-column
          label="处理日期"
          width="200"
          align="center"
          prop="createTime"
        />
        <el-table-column
          label="调整前额度"
          align="center"
          prop="oldCreditLimit"
        />
        <el-table-column
          label="调整后额度"
          align="center"
          prop="newCreditLimit"
        />
      </el-table>
    </div>
    <div class="pag">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listdataquery.page"
        :limit.sync="listdataquery.rows"
        @pagination="getList"
      />
    </div>
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
import { getAllProject } from '@/api/projectInfo'
import { sysdict } from '@/api/user'
import { findRecordListByPage, searchExport } from '@/api/policymanagement'
import Pagination from '@/components/Pagination'
import store from '@/store'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      lod: false,
      dataValue: [],
      total: 0,
      listdataquery: {
        userNameOrCertNo: '',
        projectId: '',
        searchLast: '',
        startTime: '',
        endTime: '',
        page: 1,
        rows: 10,
        id: ''
      },
      mickdata: [],
      createpolicish: false,
      createpolicydata: [
        {
          a: '',
          b: [],
          c: '',
          d: '',
          e: '',
          f: '',
          ish: false,
          g: ''
        }
      ],
      projectsletlist: []
    }
  },
  created() {
    this.listdataquery.id = this.$route.query.id
    this.getList()
    this.getAllProject()
  },
  methods: {
    // 仅我
    checkboxmi(v) {},
    async getList() {
      this.lod = true
      const { data } = await findRecordListByPage(this.listdataquery)
      this.lod = false
      this.mickdata = data.records
      this.total = data.total
    },
    // 时间选择
    changedatavalue() {
      if (!this.dataValue) {
        this.listdataquery.startTime = ''
        this.listdataquery.endTime = ''
        return
      }
      this.listdataquery.startTime = this.dataValue[0]
      this.listdataquery.endTime = this.dataValue[1]
    },
    // 查询
    querygetlist() {
      this.lod = true
      this.getList()
    },
    // 查询项目下拉框
    async getAllProject() {
      const { data } = await getAllProject()
      this.projectsletlist = data
    },
    // 导出策略明细
    async searchExport() {
      const res = await searchExport(this.listdataquery)
      const blob = new Blob([res], {
        type: 'application/vnd.ms-excel'
      }) // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
      const url = window.URL.createObjectURL(blob) // 3.创建一个临时的url指向blob对象
      // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
      const a = document.createElement('a')
      a.href = url
      const type = store.state.app.blobname
      a.download = '策略明细.' + type
      a.click()
      // 5.释放这个临时的对象url
      window.URL.revokeObjectURL(url)
    }
  }
}
</script>

<style lang="scss" scoped>
//分页器
::v-deep {
  .el-pagination.is-background .el-pager li:not(.disabled) {
    background-color: #fff; // 进行修改未选中背景和字体
    border-radius: 3px;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: rgb(76, 205, 105); // 进行修改选中项背景和字体
    color: #fff;
    border-radius: 3px;
  }
}
//遮罩层loding
.app-loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30001;
}
.icon-green {
  font-size: 26px;
  color: rgb(76, 205, 105);
  margin: 0 3px;
}

.slets {
  display: flex;
  font-size: 12px;
  align-items: center;
  span {
    margin-right: 6px;
  }
}
.el-icon-search::before {
  font-size: 12px !important;
  margin: 0 3px !important;
}
.operation {
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    cursor: pointer;
    align-items: center;
    margin-right: 10px;
  }

  .p2 {
    cursor: no-drop;
  }
  span {
    margin: 0 3px;
  }

  a {
    font-size: 36px;
  }
}

.opern {
  color: rgb(76, 205, 105);
}
.step {
  color: rgb(245, 154, 35);
}
.pag {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.table {
  min-height: 400px;
  margin-top: 20px;
}

.tab-group {
  .el-icon-success {
    color: rgb(71, 203, 149);
  }
  span {
    color: rgb(1, 142, 202);
  }
}
.tab-col-icon {
  cursor: pointer;
  i {
    margin: 0 3px;
  }
}
.lastslet {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .el-button {
    margin-left: 10px;
    background-color: rgb(80, 205, 152);
    color: #fff;
  }
}
.cust {
  padding: 20px;
}
.green {
  background-color: rgb(80, 205, 152);
  color: #fff;
  border: 0;
}
.foot {
  margin: 0 auto;
  width: 95%;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
</style>
