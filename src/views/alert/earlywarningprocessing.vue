<template>
  <div class="cust">
    <el-row :gutter="10">
      <el-col :span="3">
        <el-input
          v-model="modelquery.taskNumber"
          size="mini"
          placeholder="预警编号"
          clearable
        />
      </el-col>
      <el-col :span="7">
        <el-date-picker
          v-model="dataValue1"
          size="mini"
          style="width: 360px"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          @change="changedatavalue1"
        />
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="modelquery.taskId"
          placeholder="选择场景"
          size="mini"
          clearable
        >
          <el-option
            v-for="i in taskNameList"
            :key="i.id"
            :label="i.taskName"
            :value="i.id"
          />
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="modelquery.dealWithResult"
          placeholder="处理结果"
          size="mini"
          clearable
        >
          <el-option
            v-for="i in dealWithResult"
            :key="i.id"
            :label="i.label"
            :value="i.value"
          />
        </el-select>
      </el-col>
      <el-col :span="8">
        <div class="right">
          <el-button
            type="primary"
            size="mini"
            @click="getListDealWithByPage"
          >查询</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="newcreatemodel"
          >批量处理</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="alertInfoDetailsexport"
          >导出</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="importExcel = true"
          >导入</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="table">
      <el-table
        :data="modeldata"
        :header-cell-style="{
          'background-color': 'rgb(70,183,173)',
          color: '#fff',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column
          width="240"
          align="center"
          label="预警编号"
          prop="taskNumber"
        />
        <el-table-column
          width="150"
          align="center"
          label="预警场景"
          prop="taskName"
        />
        <el-table-column
          width="150"
          align="center"
          label="预警时间"
          prop="alertDate"
        />
        <el-table-column
          align="center"
          label="处理时间"
          prop="dealWithTime"
        />
        <el-table-column
          align="center"
          label="处理结果"
          prop="dealWithResultValue"
        />
        <el-table-column
          align="center"
          label="处理人"
          prop="dealWithPeople"
        />
        <el-table-column align="center" label="操作" prop="f">
          <template slot-scope="{ row }">
            <div class="oper">
              <img
                :src="require('@/assets/alters/u16528.svg')"
                alt=""
                @click="editprocessing(row)"
              >
              <img
                :src="require('@/assets/alters/u16529.svg')"
                alt=""
                @click="seetextdesxc(row)"
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pag">
      <pagination
        v-show="total1 > 0"
        :total="total1"
        :page.sync="modelquery.page"
        :limit.sync="modelquery.rows"
        @pagination="getListDealWithByPage"
      />
    </div>
    <el-dialog title="导入" :visible.sync="importExcel" @close="fileclose">
      <div class="imp">
        <div>
          <el-upload
            ref="upload"
            class="upload-img"
            action="/model-info/uploadFile"
            :on-change="filechange"
            :before-remove="removefile"
            accept=".xls"
            :auto-upload="false"
            :multiple="false"
            :limit="1"
          >
            <el-button type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">
              <span style="color: red">*</span>只允许更改处理结果和处理描述
            </div>
          </el-upload>
        </div>
        <div class="imp-tip">
          <el-button
            type="primary"
            @click="alertInfoDetailsimport"
          >导入</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="处理描述" :visible.sync="describe">
      <el-input v-model="textdesc" type="textarea" />
    </el-dialog>
    <el-dialog :visible.sync="handl" class="modify">
      <el-input v-model="editdatastore.alertData" type="textarea" />
      <div>
        更改状态
        <el-select v-model="editdatastore.dealWithResult" placeholder="">
          <el-option label="已处理" value="1" />
          <el-option label="未处理" value="0" />
        </el-select>
      </div>
      <div>
        处理结果
        <el-input
          v-model="editdatastore.dealWithDesc"
          type="textarea"
        />
      </div>
      <div class="success">
        <el-button type="primary" @click="successedit">完成</el-button>
        <el-button type="danger" @click="handl = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 遮罩层loding -->
    <div
      v-if="lod"
      v-loading="true"
      class="app-loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.7)"
    />
  </div>
</template>

<script>
import store from '@/store'
import Pagination from '@/components/Pagination'
import {
  getDealWithByPage,
  alertInfoDetailsexport,
  alertInfoDetailsimportExcel,
  batchDealWith,
  alertInfoDetailsdealWith
} from '@/api/alertInfo'
import { getTaskNameList } from '@/api/taskInfo'
import { sysdict } from '@/api/user'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      // 获取所有下拉框
      dealWithResult: [],
      taskNameList: [],
      // 查询参数
      modelquery: {
        taskNumber: '',
        taskId: '',
        dealWithResult: '',
        endTime: '',
        startTime: '',
        page: 1,
        rows: 10
      },
      // 处理数据
      modeldata: [],
      // 分页
      total1: 0,
      handleSelectionValue: null,
      // 导入表格
      importExcel: false,
      // 存储数据
      fells: null,
      // 编辑数据存储
      editdatastore: {
        alertData: '',
        dealWithResult: '',
        id: '',
        dealWithDesc: ''
      },
      // 处理
      handl: false,
      // --
      lod: false,
      // --
      activeName: 'model',
      // 处理描述
      describe: false,
      textdesc: '',
      dataValue1: []
    }
  },
  mounted() {
    this.getListDealWithByPage()
    this.dropdownbox()
  },
  methods: {
    // 获取所有下拉框
    async dropdownbox() {
      const dealWithResult = await sysdict('dealWithResult')
      const taskNameList = await getTaskNameList({ taskType: '2' })
      this.dealWithResult = dealWithResult.data
      this.taskNameList = taskNameList.data
    },
    // 时间处理
    changedatavalue1() {
      if (!this.dataValue1) {
        this.modelquery.startTime = ''
        this.modelquery.endTime = ''
        return
      }
      this.modelquery.startTime = this.dataValue1[0]
      this.modelquery.endTime = this.dataValue1[1]
    },
    // tab切换
    handleClick(v) {
      switch (this.activeName) {
        case 'rule':
          this.getList2(true)
          break
        case 'parameter':
          this.getList3(true)
          break
      }
    },
    // 导出
    async alertInfoDetailsexport() {
      const from = {
        dealWithResult: this.modelquery.dealWithResult,
        endTime: this.modelquery.endTime,
        startTime: this.modelquery.startTime,
        taskId: this.modelquery.taskId,
        id: this.modelquery.id
      }
      const res = await alertInfoDetailsexport(from)
      const blob = new Blob([res], {
        type: 'application/vnd.ms-excel'
      }) // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
      const url = window.URL.createObjectURL(blob) // 3.创建一个临时的url指向blob对象
      // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
      const a = document.createElement('a')
      a.href = url
      const type = store.state.app.blobname
      a.download = '预警处理.' + type
      a.click()
      // 5.释放这个临时的对象url
      window.URL.revokeObjectURL(url)
    },
    // 多选处理
    handleSelectionChange(val) {
      this.handleSelectionValue = ''
      val.forEach((item, index) => {
        if (index === val.length - 1) {
          this.handleSelectionValue += 'ids=' + item.id
        } else {
          this.handleSelectionValue += 'ids=' + item.id + '&'
        }
      })
    },
    // 列表
    async getListDealWithByPage() {
      this.lod = true
      const { data } = await getDealWithByPage(this.modelquery)
      this.lod = false
      this.modeldata = data.records
      this.total1 = data.total
    },
    // 导入
    async alertInfoDetailsimport() {
      if (!this.fells) return this.$message.error('未选择文件或文件格式不对')
      const from = new FormData()
      from.append('file', this.fells)
      const res = await alertInfoDetailsimportExcel(from)
      console.log(res)
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.fileclose()
      this.$message.success(res.message)
      this.getListDealWithByPage()
    },
    // 文件处理
    // 判断上传文件类型以及存储文件
    filechange(file) {
      const i = file.raw.name.lastIndexOf('.')
      const filename = file.raw.name.substr(i + 1)
      if (filename !== 'xlsx' && filename !== 'xls') {
        this.modelfrom.fells = null
        return this.$message.error('上传文件类型必须是excel文件')
      }
      this.fells = file.raw
    },
    // 删除文件
    // 关闭时清除
    fileclose() {
      this.$refs.upload.clearFiles()
      this.importExcel = false
      this.fells = null
    },
    removefile() {
      this.fells = null
    },
    // 批量处理
    async newcreatemodel() {
      if (this.handleSelectionValue === '' || !this.handleSelectionValue) {
        return this.$message.error('请勾选数据再处理')
      }
      const res = await batchDealWith(this.handleSelectionValue)
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.$message.success(res.message)
      this.getListDealWithByPage()
    },
    // 修改
    editprocessing(row) {
      this.editdatastore = {
        alertData: row.alertData,
        dealWithResult: row.dealWithResult,
        id: row.id,
        dealWithDesc: row.dealWithDesc
      }
      this.handl = true
    },
    // 完成修改
    async successedit() {
      const res = await alertInfoDetailsdealWith(this.editdatastore)
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.$message.success(res.message)
      this.handl = false
      this.getListDealWithByPage()
    },
    cancel() {
      this.handl = false
    },
    // 查看描述
    seetextdesxc(row) {
      this.describe = true
      this.textdesc = row.dealWithDesc
    }
  }
}
</script>

<style lang="scss" scoped>
.imp {
  width: 60%;
  .imp-tip {
    margin: 20px;
  }
}
.pag {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.right {
  float: right;
}
.table {
  margin-top: 20px;
  min-height: 400px;
  .oper {
    img {
      margin: 0 8px;
      cursor: pointer;
    }
  }
}
.Batch {
  .number {
    margin-bottom: 20px;
    color: rgb(2, 167, 240);
  }
  .upde {
    margin: 20px 0;
  }
  .down {
    font-size: 24px;
  }
}
.modify {
  div {
    margin: 8px 0;
  }
  .number {
    color: rgb(2, 167, 240);
  }
  .success {
    display: flex;
    justify-content: center;
  }
}
.oper {
  a {
    margin: 0 10px;
  }
  img {
    cursor: pointer;
  }
  a:nth-child(1) {
    color: rgb(2, 167, 240);
  }
}
.cre {
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
}
//模型----------------------------
//标签页样式
::v-deep {
  .tabs {
    .el-tabs__active-bar {
      background-color: rgb(128, 128, 255) !important;
    }
    .el-tabs__item:hover {
      color: rgb(128, 128, 255) !important;
    }
    .is-active {
      color: rgb(128, 128, 255) !important;
    }
  }
}
//标签页样式
//遮罩层loding
.app-loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30001;
}
.cust {
  padding: 20px;
}
</style>
