<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :span="13" class="card-panel-col">
        <div class="card-panel">
          <el-row type="flex">
            <el-col :span="7" align="center">
              <div class="flexrows">
                <div style="margin-left:30px;margin-botton:5px;height:18px"><i class="el-icon-question" /></div>
                <div style="font-size:20px;font-weight:bold;margin-bottom:5px">{{ countTodayMonitoredInfo.countAlert }}</div>
                <div style="font-weight:500">累计预警人数</div>
              </div>
            </el-col>
            <div style="width:2px;margin:auto 0">/</div>
            <el-col :span="7" align="center">
              <div class="flexrows">
                <div style="margin-left:30px;margin-botton:5px;height:18px"><i /></div>
                <div style="font-size:20px;font-weight:bold;margin-bottom:5px">{{ countTodayMonitoredInfo.cumulativeMonitor }}</div>
                <div style="font-weight:500">累计监控人数（人）</div>
              </div>
            </el-col>
            <el-divider direction="vertical" />
            <el-col :span="7">
              <div class="flexrows">
                <div style="display:flex;width:60%;border-bottom:3px solid #FF00FF;padding-bottom:5px">
                  <div>今日监控人数</div>
                  <div style="margin-left:auto;font-weight:bold">{{ countTodayMonitoredInfo.toDayMonitor }}</div>
                </div>
                <div style="width:60%;display:flex">
                  <div style="margin-left:auto"><i class="el-icon-top-right" style="color:green;font-weight:bold">0.1</i></div>
                </div>
                <div style="display:flex;width:60%;border-bottom:3px solid #FF00FF;padding-bottom:5px;margin-top:10px">
                  <div>平均每日监控人数</div>
                  <div style="margin-left:auto;font-weight:bold">{{ countTodayMonitoredInfo.averageMonitor }}</div>
                </div>
                <div style="width:60%;display:flex">
                  <div style="margin-left:auto"><i class="el-icon-top-right" style="color:green;font-weight:bold">0.1</i></div>
                </div>
              </div>
            </el-col>
            <el-col :span="3" align="center">
              <div class="flexrows">
                <div><i class="el-icon-d-arrow-right" style="font-size:40px;color:blue" @click="goPeople" /></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="11" class="card-panel-col">
        <div class="card-panel">
          <el-row type="flex">
            <el-col :span="7" align="center">
              <div class="flexrows">
                <div style="margin-left:30px;margin-botton:5px;height:18px"><i /></div>
                <div style="font-size:20px;font-weight:bold;margin-bottom:5px">{{ countTodayMonitoredInfo.cumulativeMonitorDeal }}</div>
                <div style="font-weight:500">累计监控交易</div>
              </div>
            </el-col>
            <el-divider direction="vertical" />
            <el-col :span="21">
              <div class="flexrows">
                <div style="display:flex;width:90%;border-bottom:3px solid #FF00FF;padding-bottom:5px">
                  <div>今日监控交易（比）</div>
                  <div style="margin-left:auto;font-weight:bold">{{ countTodayMonitoredInfo.toDayMonitorDeal }}</div>
                </div>
                <div style="width:90%;display:flex">
                  <div style="margin-left:auto"><i class="el-icon-top-right" style="color:green;font-weight:bold">0.1</i></div>
                </div>
                <div style="display:flex;width:90%;border-bottom:3px solid #FF00FF;padding-bottom:5px;margin-top:10px">
                  <div>平均每日监控交易（比）</div>
                  <div style="margin-left:auto;font-weight:bold">{{ countTodayMonitoredInfo.averageMonitorDeal }}</div>
                </div>
                <div style="width:90%;display:flex">
                  <div style="margin-left:auto"><i class="el-icon-top-right" style="color:green;font-weight:bold">0.1</i></div>
                </div>
              </div>
            </el-col>
            <el-col :span="3" align="center">
              <div class="flexrows">
                <div><i class="el-icon-d-arrow-right" style="font-size:40px;color:blue" @click="goOther" /></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style>

</style>
