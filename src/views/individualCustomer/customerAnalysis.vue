<template>
  <div
    id="pdfcontent"
    v-loading="lod"
    class="custmore"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)"
  >
    <!-- 客户信息 -->
    <el-card class="cust">
      <div style="margin: 0 20px">
        <div class="area">
          <img :src="require('@/assets/addresschange/u3626.png')" alt="" />
          <ul>
            <li>
              <div>客户信息</div>
              <ul class="yello">
                <li v-show="ish1">地址可信度低</li>
                <li v-show="ish2">资金流向违规</li>
                <li
                  v-for="(i, m) in customerusername"
                  v-show="ishcustomertab[m]"
                  :key="m"
                >
                  {{ i }}
                </li>
                <li v-show="hasWriteOff">核销客户</li>
              </ul>
              <div>
                <el-button type="primary" size="mini" @click="exportExcelcust"
                  >导出Excel</el-button
                >
                <el-button type="primary" size="mini" @click="handleCommand">
                  下载分析报告
                </el-button>
              </div>
            </li>
            <li>
              <div>客户姓名：{{ customer.ocrName }}</div>
              <div>首次创建时间：{{ customer.firstCreateTime }}</div>
              <div>统计时间：{{ customer.countTime }}</div>
            </li>
            <li>
              <div>客户编号：{{ customer.customerNo }}</div>
              <div>上次更新时间：{{ customer.lastUpdateTime }}</div>
            </li>
            <li />
          </ul>
        </div>
      </div>
      <div class="tab" style="margin: 0 20px">
        <el-table
          :data="customerList"
          style="border: 1px solid #000"
          :header-cell-style="{
            background: 'rgb(70,183,173)',
            color: 'white',
            border: '1px solid #fff',
          }"
          class="border000"
          :cell-style="{
            border: '1px solid #000',
            borderLeft: 0,
          }"
        >
          <el-table-column
            prop="applyNo"
            label="影像件编号"
            align="center"
            width="260"
          />
          <el-table-column align="center" prop="updateTime" label="更新日期">
            <template slot-scope="{ row }">
              <div>
                {{ row.updateTime.slice(0, 10) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            style="backgroundcolor: #000"
            prop="ocrStatus"
            label="OCR识别"
          >
            <template slot-scope="{ row }">
              <div>
                {{ row.ocrStatus ? "成功" : "失败" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="idImgx" label="身份证（正面）">
            <template slot-scope="{ row }">
              <div class="dolodaing">
                <img
                  :src="require('@/assets/addresschange/u8502.svg')"
                  class="imgs"
                />
                <div>
                  <a @click="konwshowidImgx(row.idImgx)">预览</a>
                  <a @click="downimg(row.idImgx)">下载</a>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="idImgy" label="身份证（反面）">
            <template slot-scope="{ row }">
              <div class="dolodaing">
                <img
                  :src="require('@/assets/addresschange/u8502.svg')"
                  class="imgs"
                />
                <div>
                  <a @click="konwshowidImgx(row.idImgx)">预览</a>
                  <a @click="downimg(row.idImgx)">下载</a>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        v-if="lodCust"
        v-loading="true"
        class="lod-cust"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.7)"
      />
    </el-card>
    <el-card>
      <div class="rejcustmore">
        <header>基础信息</header>
        <ul class="cest">
          <li>
            <div>
              <span>客户姓名：</span><a>{{ customer.ocrName }}</a>
            </div>
            <div>
              <span>性别：</span><a>{{ customer.sex }}</a>
            </div>
            <div>
              <span>手机号：</span><a>{{ customer.mobile }}</a>
            </div>
          </li>
          <li>
            <div>
              <span>民族:</span><a>{{ customer.nation }}</a>
            </div>
            <div><span>证件类型：</span><a /></div>
            <div>
              <span>证件编号：</span> <a>{{ customer.certNo }}</a>
            </div>
          </li>
          <li>
            <div>
              <span>证件地址：</span>
              <a class="ls">{{ customer.certAddr }}</a>
            </div>
          </li>
        </ul>
        <div class="tabs1">
          <header>
            <img :src="require('@/assets/addresschange/u8457.svg')" alt="" />
            其他联系号码
          </header>
          <el-table
            :data="analyadres"
            :header-cell-style="{
              background: 'rgb(70,183,173)',
              color: 'white',
            }"
            :cell-style="cellclassstyle"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="120"
              class-name="green"
            />
            <el-table-column align="center" prop="mobile" label="联络号码" />
            <el-table-column align="center" label="号码类别">
              <template slot-scope="{ row }">
                <div>
                  {{ row.mobile.length >= 11 ? "手机" : "座机" }}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="updateTime" label="更新时间">
              <template slot-scope="{ row }">
                <div>
                  {{
                    row.updateTime
                      ? String(row.updateTime).slice(0, 10) +
                        " " +
                        String(row.updateTime).slice(11, 19)
                      : ""
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="source" label="数据来源" />
          </el-table>
        </div>
        <div class="tabs1">
          <header>
            <img :src="require('@/assets/addresschange/u8458.svg')" alt="" />
            其他联系地址
          </header>
          <el-table
            style="margin: 30px 0"
            :data="analyadres"
            :header-cell-style="{
              background: 'rgb(70,183,173)',
              color: 'white',
            }"
            :cell-style="cellclassstyle"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="120"
              class-name="green"
            />
            <el-table-column label="地址信息" prop="address" align="center" />
            <el-table-column
              align="center"
              label="地址类别"
              prop="addressType"
            />
            <el-table-column align="center" prop="updateTime" label="更新时间">
              <template slot-scope="{ row }">
                <div>
                  {{
                    row.updateTime
                      ? String(row.updateTime).slice(0, 10) +
                        " " +
                        String(row.updateTime).slice(11, 19)
                      : ""
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="source" label="数据来源" />
            <el-table-column
              align="center"
              prop="reliabilityScore"
              label="可信度评分"
            />
          </el-table>
        </div>
        <div class="tabs1">
          <header>
            <img :src="require('@/assets/addresschange/u8458.svg')" alt="" />
            其他信息变更
          </header>
          <el-table
            style="margin: 30px 0"
            :data="analyadres"
            :header-cell-style="{
              background: 'rgb(70,183,173)',
              color: 'white',
            }"
            :cell-style="cellclassstyle"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="120"
              class-name="green"
            />
            <el-table-column label="地址信息" prop="address" align="center" />
            <el-table-column
              align="center"
              label="地址类别"
              prop="addressType"
            />
            <el-table-column align="center" prop="updateTime" label="更新时间">
              <template slot-scope="{ row }">
                <div>
                  {{
                    row.updateTime
                      ? String(row.updateTime).slice(0, 10) +
                        " " +
                        String(row.updateTime).slice(11, 19)
                      : ""
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="source" label="数据来源" />
            <el-table-column
              align="center"
              prop="reliabilityScore"
              label="可信度评分"
            />
          </el-table>
        </div>
      </div>
    </el-card>
    <!-- //授信分析 -->
    <el-card>
      <div class="rejcustmore">
        <header>授信分析</header>
      </div>
      <div class="tabdata">
        <div class="clm">
          <button v-for="i in resultname" :key="i" class="b1">{{ i }}</button>
        </div>

        <!-- 额度趋势 -->
        <div>
          <Custcartaplly :cust="analysiscred" />
        </div>
        <!-- Bootst模型 -->
        <div>
          <Risk :risk="custmodel" />
        </div>
      </div>
      <div style="margin: 0 20px">
        <el-table
          :data="[{ a: numdata }]"
          :header-cell-style="{
            background: 'rgb(70,183,173)',
            color: 'white',
          }"
          style="width: 100%"
          :border="true"
        >
          <el-table-column label="放款分析" prop="a">
            <template slot-scope="{ row }">
              <div class="rawa">
                <div>
                  <Rawa :rawanum="row.a" />
                </div>
                <ul>
                  <li>
                    <div>授信金额：{{ custwithdalanaly.creditLimit }}</div>
                    <div>当前支用：{{ custwithdalanaly.prinBal }}</div>
                    <div>
                      剩余额度：{{
                        custwithdalanaly.creditLimit
                          ? custwithdalanaly.creditLimit -
                            0 -
                            (custwithdalanaly.prinBal - 0)
                          : ""
                      }}
                    </div>
                  </li>
                  <li>
                    <div>授信产品：{{ custwithdalanaly.productName }}</div>
                    <div>
                      授信日期：{{
                        custwithdalanaly.creditTime
                          ? String(custwithdalanaly.creditTime).slice(0, 10)
                          : ""
                      }}
                    </div>
                    <div>额度有效期：{{ custwithdalanaly.rffective }}</div>
                  </li>
                  <li>
                    <div>支用次数：{{ custwithdalanaly.disburseTotal }}</div>
                    <div>
                      日均余额：{{
                        custwithdalanaly.averageBalance
                          ? custwithdalanaly.averageBalance
                          : ""
                      }}
                    </div>
                  </li>
                </ul>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin: 0 20px">
        <el-table
          :data="bcercustm"
          :header-cell-style="{
            background: 'rgb(70,183,173)',
            color: 'white',
          }"
          style="width: 100%; font-size: 12px"
        >
          <el-table-column type="expand" />
          <el-table-column
            align="center"
            width="360"
            label="授信编号"
            prop="applyNo"
          />

          <el-table-column align="center" label="授信额度" prop="creditLimit" />
          <el-table-column
            align="center"
            label="授信结果"
            prop="platformAccess"
          >
            <template slot-scope="{ row }">
              <div>
                <div
                  v-show="row.platformAccess === 'Y'"
                  style="color: rgb(46, 186, 7)"
                >
                  &bull;通过
                </div>
                <div
                  v-show="row.platformAccess === 'N'"
                  style="color: rgb(254, 85, 0)"
                >
                  &bull;拒绝
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="200"
            label="授信时间"
            prop="createTime"
          >
            <template slot-scope="{ row }">
              <div>
                {{
                  String(row.createTime).slice(0, 10) +
                  " " +
                  String(row.createTime).slice(11, 19)
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="备注" prop="ackMsg" />
          <el-table-column align="center" label="授信合同" prop="applyContract">
            <template slot-scope="{ row }">
              <div
                style="
                  display: flex;
                  color: rgb(22, 155, 213);
                  justify-content: center;
                "
              >
                <!-- <a
                  style="margin: 0 10px 0 0"
                  @click="showhtm(row.applyContract)"
                  >预览</a
                > -->
                <a @click="downhtm(row.applyContract)">下载</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="授权协议"
            prop="applyCreditAuth"
          >
            <template slot-scope="{ row }">
              <div
                style="
                  display: flex;
                  color: rgb(22, 155, 213);
                  justify-content: center;
                "
              >
                <!-- <a
                  style="margin: 0 10px 0 0"
                  @click="showhtm(row.applyContract)"
                  >预览</a
                > -->
                <a @click="downhtm(row.applyCreditAuth)">下载</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 贷后分析 -->
    <el-card>
      <div class="rejcustmore">
        <header>贷后分析</header>
      </div>
      <div class="tabdata1">
        <p class="clm">
          <button v-for="i in resultname" :key="i" class="b1">{{ i }}</button>
        </p>
        <!-- 近30天在贷余额变化 -->
        <div>
          <Withdr :countaccoun="countAccoun" />
        </div>
      </div>
      <div style="margin: 0 20px">
        <el-table
          :data="[...counttotal]"
          :header-cell-style="{
            background: 'rgb(70,183,173)',
            color: 'white',
          }"
          style="width: 100%"
          :border="true"
        >
          <el-table-column label="还款分析">
            <template>
              <div class="rawa">
                <div>
                  <Hua :raw="counttotal.postLoadScore" />
                </div>
                <ul>
                  <li>
                    <div>总计应还余额：{{ counttotal.totalRepayable }}</div>
                    <div>剩余应还本金：{{ counttotal.residualPrincipal }}</div>
                    <div>未结清借据：{{ counttotal.uncleared }}</div>
                  </li>
                  <li>
                    <div>累计借款次数：{{ counttotal.loanTotal }}</div>
                    <div>累计履约次数：{{ counttotal.performanceTotal }}</div>
                    <div>逾期次数：{{ counttotal.overdueTotal }}</div>
                  </li>
                  <li>
                    <div>最大逾期天数：{{ counttotal.maxOverdueDay }}</div>
                    <div>最大逾期金额：{{ counttotal.maxOverdueAmount }}</div>
                  </li>
                </ul>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin: 0 20px">
        <el-table
          :data="qnaly"
          :header-cell-style="{
            background: 'rgb(70,183,173)',
            color: 'white',
          }"
          style="width: 100%; font-size: 12px"
        >
          <el-table-column type="expand" />
          <el-table-column
            width="240"
            align="left"
            label="借据编号"
            prop="contractNo"
          />
          <el-table-column
            width="200"
            align="center"
            label="借款产品"
            prop="prodCode"
          />
          <el-table-column align="center" label="记账机构" prop="orgid" />
          <el-table-column
            width="80"
            align="center"
            label="期次数"
            prop="totalTerms"
          />
          <el-table-column align="center" label="初次本金" prop="encashAmt" />
          <el-table-column
            width="100"
            align="center"
            label="利率"
            prop="dayRate"
          />
          <el-table-column align="center" label="还款方式" prop="repayMode" />
          <el-table-column align="center" label="当前期次" prop="crrenPeriod" />
          <el-table-column align="center" label="借款合同" prop="loanContract">
            <template slot-scope="{ row }">
              <div
                style="
                  display: flex;
                  color: rgb(22, 155, 213);
                  justify-content: center;
                "
              >
                <!-- <a style="margin: 0 10px 0 0" @click="showhtm(row.loanContract)"
                  >预览</a
                > -->
                <a @click="downhtm(row.loanContract)">下载</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card>
      <div class="rejcustmore">
        <header>核销记录</header>
      </div>
      <div style="margin: 20px">
        <el-table
          :data="writeOff"
          :header-cell-style="{
            background: 'rgb(70,183,173)',
            color: 'white',
          }"
          style="width: 100%; font-size: 12px"
        >
          <el-table-column type="expand" />
          <el-table-column align="left" label="借据编号" prop="contractNo" />
          <el-table-column align="center" label="借据产品" prop="bsnType" />
          <el-table-column align="center" label="核销金额" prop="encashAmt" />
          <el-table-column align="center" label="核销时间" prop="createTime" />
        </el-table>
      </div>
    </el-card>

    <!-- 催收分析 -->
    <el-card>
      <div class="rejcustmore">
        <header>催收分析</header>
      </div>
      <el-row :gutter="40" style="padding: 0 20px">
        <el-col :span="6">
          <div class="col-div">
            <i class="el-icon-bank-card" />
            <div>
              <div>逾期总额</div>
              <div>
                {{
                  counttotal.overDueAmount ? "¥" + counttotal.overDueAmount : ""
                }}
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="col-div">
            <i style="background: rgb(255, 61, 113); fontsize: 34px">&copy;</i>
            <div>
              <div>累计联系次数</div>
              <div>{{ findcust.length === 0 ? "" : findcust.length }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="col-div">
            <i class="el-icon-date" style="background: rgb(38, 228, 153)" />
            <div>
              <div>联系成功次数</div>
              <div>{{ custResult }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="col-div">
            <i
              class="el-icon-s-comment"
              style="background: rgb(255, 174, 11)"
            />
            <div>
              <div>催收记录</div>
              <div>{{ visitType }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div style="margin: 0 20px">
        <el-table
          :data="findcust"
          :header-cell-style="{
            background: 'rgb(70,183,173)',
            color: 'white',
          }"
          style="width: 100%; margin: 50px 0 0 0"
        >
          <el-table-column label="回访时间" prop="visitTime">
            <template slot-scope="{ row }">
              <div>
                <div>
                  {{ row.visitTime || String(row.createTime).slice(0, 10) }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="产品" prop="productId">
            <template slot-scope="{ row }">
              <div>
                {{ row.productId || row.projectName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="回访类型" prop="visitType">
            <template slot-scope="{ row }">
              <div>
                <div v-if="row.visitType">
                  {{ row.visitType === "01" ? "逾期催收" : "贷后回访" }}
                </div>
                <div>
                  {{ row.taskTypeValue }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="回访结果" prop="visitResult">
            <template slot-scope="{ row }">
              <div>
                <div v-if="row.visitResult">
                  {{
                    row.visitResult === "01" ||
                    row.visitResult === "02" ||
                    row.visitResult === "03" ||
                    row.visitResult === "04" ||
                    row.visitResult === "05" ||
                    row.visitResult === "26" ||
                    row.visitResult === "99"
                      ? "接通"
                      : "未接通"
                  }}
                </div>
                <div v-else>
                  {{ row.returnVisitResultValue }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="资产回访"
            prop="returnVisitSource"
          >
            <template slot-scope="{ row }">
              <div>
                {{
                  row.returnVisitSource == 1
                    ? "行内外呼回访数据"
                    : "资产管理回访数据"
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="回访描述"
            width="300"
            align="center"
            prop="visitDesc"
          >
            <template slot-scope="{ row }">
              <div v-if="row.visitDesc">
                {{ row.visitDesc }}
              </div>
              <div v-else>
                {{ row.returnVisitSubsection }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 反洗钱评级 -->
    <!-- <el-card>
      <div class="rejcustmore">
        <header>反洗钱评级</header>
      </div>
      <el-row :gutter="30" style="margin: 40px 0 0 5px">
        <el-col :span="16">
          <div class="custfx">
            <div class="left">
              <p>29</p>
              <p>反洗钱评分</p>
            </div>
            <div class="rigth">
              <header>&bull;评分说明</header>
              <div>
                基于专家经验汇总和机器学习方法的资信、欺诈等规则的累积触发分数
                基于当前时点的数据资料进行风险识别判断计算
              </div>
              <header>&bull;评分区间</header>
              <div>
                0分～100分（分数越低洗钱风险越高，逾期的可能性越大）
                70分及以上为红色，70分以下为绿色
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="jucont">
            <div>
              <header>决策建议</header>
              <div class="spack">
                <p>低风险</p>
                <p>申请用户未检测出高危风险， 建议通过</p>
                <p>共发现2条异常信息</p>
              </div>
              <div class="spack">
                <el-table
                  :data="[]"
                  style="
                    borderbottom: 1px solid #000;
                    borderright: 1px solid #000;
                  "
                  :header-cell-style="{
                    border: '1px solid #000',

                    borderRight: 0,
                  }"
                  class="border000"
                  :cell-style="{
                    border: '1px solid #000',
                    borderTop: 0,
                    borderRight: 0,
                  }"
                >
                  <el-table-column label="分数区间"></el-table-column>
                  <el-table-column label="决策建议"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="h">风险命中情况</div>
      <div class="etab">
        <el-table
          style="
            borderBottom: 1px solid #000;
            borderRight: 1px solid #000;
            width: 97%;
            margin: 0 20px;
          "
          :header-cell-style="{
            border: '1px solid #000',
            fontSize: '20px',
            fontWidth: 900,
            color: '#000',
            borderRight: 0,
          }"
          class="border000"
          :cell-style="{
            border: '1px solid #000',
            borderTop: 0,
            borderRight: 0,
          }"
          :data="[
            { a: 0, b: 0 },
            { a: 0, b: 0 },
          ]"
        >
          <el-table-column align="center" label="0" prop="a"></el-table-column>
          <el-table-column align="center" label="0" prop="b"></el-table-column>
        </el-table>
      </div>
    </el-card> -->
    <!-- 图片预览弹窗 -->
    <el-dialog title="图片预览" :visible.sync="ishcustomeridImgx">
      <div class="imgshow">
        <img :src="imgURL" alt="" />
      </div>
    </el-dialog>
    <!-- 遮罩层loding -->
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  findCustomerInfo,
  findOcrList,
  analyadress,
  analysisfindCred,
  withdrawalAnaly,
  findjdcreditbalancemodel,
  bcertNo,
  applyCertuo,
  countTotal,
  findertu,
  qnalYsis,
  down,
  exportExcelcust,
  findWriteOff,
} from "@/api/customerList";
import Custcartaplly from "@/components/custmcortart/custCreditApply.vue";
import Withdr from "@/components/custmcortart/withdrcust.vue";
import Risk from "@/components/custmcortart/custmorerisk.vue";
import Rawa from "@/components/custmcortart/custrawa.vue";
import Hua from "@/components/custmcortart/custrawaHUA.vue";
export default {
  components: {
    Custcartaplly,
    Risk,
    Rawa,
    Withdr,
    Hua,
  },
  data() {
    return {
      lod: false,
      lodCust: false,
      ish1: false,
      ish2: false,
      numdata: 0,
      customer: {},
      assectcust: [
        { assectList: "[90~100]", found: 2 },
        { assectList: "[70~90]", found: 2 },
        { assectList: "[45~70]", found: 1 },
        { assectList: "[0~45]", found: 0 },
      ],
      customerusername: [
        "虚假申请",
        "失信人员",
        "经济犯罪",
        "营销套利",
        "历史逾期",
        "当前逾期",
      ],
      ishcustomertab: [false, false, false, false, false, false],
      customerList: [],
      ishcustomeridImgx: false,
      ishcustomeridImgy: false,
      imgURL: "",
      // 查询信息变更
      information: [],
      // 查询其他联系地址
      analyadres: [],
      analysiscred: {},
      // 查询授信额度趋势分析数据
      resultname: [],
      // 授信分析
      custwithdalanaly: {},
      custwithdalanalyList: [],
      custmodel: {},
      bcercustm: [],
      // 查询贷后分析折线图数据接口
      countAccoun: {},
      // 查询还款分析数据接口
      counttotal: {},
      // 查询客户回访记录
      custfindk: [],
      custResult: null,
      visitType: null,
      findcust: [],
      qnaly: [],
      // 核销
      hasWriteOff: null,
      writeOff: [],
    };
  },
  mounted() {
    this.findcustomerInfo();
    this.findOcrList();
    this.anadress();
    this.analysisfindcred();
    this.withdrawalanaly();
    this.model();
    this.bcertno();
    this.applycertuo();
    this.repayable();
    this.findcustk();
    this.qnalysis();
    this.findWriteOff();
  },
  methods: {
    // 个人 导出
    async exportExcelcust() {
      const res = await exportExcelcust(`certNos=${this.$route.query.id}`);
      const blob = new Blob([res], {
        type: "application/vnd.ms-excel",
      }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
      const url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象
      // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
      const a = document.createElement("a");
      a.href = url;
      a.download = "客户信息.xls";
      a.click();
      // 5.释放这个临时的对象url
      window.URL.revokeObjectURL(url);
    },
    // 下载分析报告
    handleCommand() {
      document.getElementById("pdfcontent").scrollTop = 0;
      html2canvas(document.getElementById("pdfcontent"), {
        useCORS: true,
        dpi: 200000,
      }).then(function (canvas) {
        var context = canvas.getContext("2d");
        // 关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        // 画布大小
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;
        // 将canvas转为base64图片
        var pageData = canvas.toDataURL("image/jpeg", 1.0);
        // 设置pdf的尺寸，pdf要使用pt单位 已知 1pt/1px = 0.75   pt = (px/scale)* 0.75
        var pdfWidth = (contentWidth + 10) * 0.75;
        var pdfHeight = (contentHeight + 500) * 0.75;

        // 设置内容图片的尺寸，img是pt单位
        var imgWidth = pdfWidth;
        var imgHeight = contentHeight * 0.75;

        // 初始化jspdf 第一个参数方向：默认''时为纵向，第二个参数设置pdf内容图片使用的长度单位为pt，第三个参数为PDF的大小，单位是pt
        // eslint-disable-next-line new-cap
        const PDF = new jsPDF("", "pt", [pdfWidth, pdfHeight]);

        PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
        PDF.save("test.pdf");
      });
    },
    // 查询客户基本信息OK
    async findcustomerInfo() {
      // this.lodCust=true
      const { data } = await findCustomerInfo(this.$route.query.id);
      // this.lodCust=false
      if (data) {
        this.hasWriteOff = data.hasWriteOff;
        this.customer = data;
        this.ishcustomertab = [false, false, false, false, false, false];
        if (data.hasHistoryOverdue) {
          this.ishcustomertab[4] = true;
        }
        if (data.hasOverdue) {
          this.ishcustomertab[5] = true;
        }
        if (data.riskTag) {
          if (data.riskTag.hit_fraud_apply) {
            this.ishcustomertab[0] = true;
          }
          if (data.riskTag.hit_lose_trust) {
            this.ishcustomertab[1] = true;
          }
          if (data.riskTag.hit_economic_crime) {
            this.ishcustomertab[2] = true;
          }
          if (data.riskTag.hit_scalper_level) {
            this.ishcustomertab[3] = true;
          }
        }
        if (data.hasLowAddressReliability) {
          this.ish1 = true;
        }
        if (data.hasCapitalFlowViolation) {
          this.ish2 = true;
        }
      }
    },
    // 影像件编号OK
    async findOcrList() {
      const { data } = await findOcrList(this.$route.query.id);
      this.customerList = data;
      // console.log(data, "cccc");
    },
    // 点击弹出身份证预览弹窗
    konwshowidImgx(v) {
      this.imgURL = v;
      this.ishcustomeridImgx = true;
    },
    downimg(v) {
      const a = document.createElement("a");
      a.download = "1.jpg";
      a.href = v;
      a.click();
    },
    // 查询授信额度趋势分析数据OK
    async analysisfindcred() {
      if (this.$route.query.id) {
        const { data } = await analysisfindCred(this.$route.query.id);
        this.analysiscred = data;
        // console.log(this.analysiscred, "this.analysiscred");
        const arr = [];
        if (data) {
          for (const i in data) {
            arr.push(i);
          }
          this.resultname = arr;
        }
      }
    },
    // 提款数据分析列表OK
    async withdrawalanaly() {
      const { data } = await withdrawalAnaly(this.$route.query.id);
      // console.log(data, "bbbb");
      this.custwithdalanaly = data;
      this.custwithdalanalyList = [];
      this.numdata = Number(
        (this.custwithdalanaly.prinBal / this.custwithdalanaly.creditLimit) *
          100
      ).toFixed(0);
      if (data) {
        for (const i in data) {
          this.custwithdalanalyList.push(data[i]);
        }
      }
      // console.log(data, "bbbbbbb");
      // console.log(this.custwithdalanalyList,'custwithdalanalyList');
    },
    // 查询其他联系地址analyadressOK
    async anadress() {
      const { data } = await analyadress(this.$route.query.id);
      this.analyadres = data;
    },
    cellStyle() {
      return "border-color:black;";
    },
    // 查询模型数据OK
    async model() {
      if (this.$route.query.id) {
        const { data } = await findjdcreditbalancemodel(this.$route.query.id);
        if (data) {
          this.custmodel = data;
        }
      }
    },
    async bcertno() {
      const { data } = await bcertNo(this.$route.query.id);
      console.log(data, "123");
      this.bcercustm = data;
    },
    // 预览htm页面
    showhtm(v) {
      window.open(v, "_blank");
    },
    // 下载htm页面
    async downhtm(v) {
      this.lod = true;
      const res = await down().catch((err) => {
        const { response } = err;
        this.lod = false;
        this.$message.error(response.data.message);
        return;
      });
      this.lod = false;
      const blob = new Blob([res], {
        type: "text/html",
      });
      const url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象
      // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
      const a = document.createElement("a");
      a.href = url;
      a.download = "个人用户.html";
      a.click();
      // 5.释放这个临时的对象url
      window.URL.revokeObjectURL(url);
    },
    // 查询贷后分析折线图数据接口
    async applycertuo() {
      const { data } = await applyCertuo(this.$route.query.id, "12");
      const a = JSON.parse(JSON.stringify(data));
      if (Object.keys(a).length !== 0) {
        this.countAccoun = data;
      }
    },
    // 还款分析
    async repayable() {
      const { data } = await countTotal(this.$route.query.id);
      this.counttotal = data;
    },
    // 查询客户回访记录//催收分析
    async findcustk() {
      const { data } = await findertu(this.$route.query.id);
      if (!data) return;
      this.findcust = [
        ...data.wdLoanReturnVisits,
        ...data.returnVisitResultUserVos,
      ];
      this.custResult = 0;
      this.visitType = 0;
      this.findcust.forEach((i) => {
        if (
          i.visitResult === "01" ||
          i.visitResult === "02" ||
          i.visitResult === "03" ||
          i.visitResult === "04" ||
          i.visitResult === "05" ||
          i.visitResult === "26" ||
          i.visitResult === "99" ||
          i.returnVisitResult == "1"
        ) {
          this.custResult++;
        }
      });
      this.findcust.forEach((i) => {
        if (i.visitType === "01") {
          this.visitType++;
        }
      });
      console.log(this.visitType, this.custResult);
    },
    // 表格样式
    cellclassstyle(v) {
      if (v.columnIndex === 0) {
        return "background:rgb(93,208,176);borderTop:4px solid #fff";
      }
      return "borderTop:4px solid #fff;background:rgb(171,225,219);";
    },
    // 查询客户借据信息列表
    async qnalysis() {
      const { data } = await qnalYsis(this.$route.query.id);
      this.qnaly = data;
      console.log(data, "fafa");
    },
    //查询客户核销借据列表
    async findWriteOff() {
      let { data } = await findWriteOff(this.$route.query.id);
      this.writeOff = data;
    },
  },
};
</script>

<style lang="scss" >
.clm {
  display: flex;
  flex-direction: column;
  button {
    margin: 10px 0;
  }
}
/* /deeep/样式穿透*/
/*1.取消原本展开的旋转动效*/
.el-table__expand-icon {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
/*2.展开按钮未点击的样式是加号带边框*/
.el-table__expand-icon .el-icon-arrow-right:before {
  content: "\e6d9";
  border: 1px solid #ccc;
  padding: 1px;
}
/*2.按钮已点击展开之后的样式是减号带边框*/
.el-table__expand-icon--expanded .el-icon-arrow-right:before {
  content: "\e6d8";
}
.h {
  width: 97%;
  height: 40px;
  background: rgb(248, 248, 248);
  margin: 40px 20px;
  color: rgb(51, 51, 51);
  line-height: 40px;
  font-weight: 900;
  font-size: 18px;
}
.spack {
  float: left;
  display: flex;
  flex-direction: column;
  width: 50%;
  p:nth-child(1) {
    color: rgb(112, 182, 3);
    font-size: 50px;
    margin: 40px 0 0 0;
  }
  p:nth-child(2) {
    font-weight: normal;
  }
  p:nth-child(3) {
    margin: 40px 0 0 0;
    padding: 5px 10px;
    border: 1px solid #000;
    font-weight: normal;
  }
}
.jucont {
  height: 260px;
  background-color: rgb(248, 248, 248);
  padding: 20px;
  color: rgb(51, 51, 51);
  font-weight: 800;
}
p {
  padding: 0;
  margin: 0;
}
.custfx {
  height: 260px;
  background-color: rgb(248, 248, 248);
  padding: 20px;
  display: flex;
}
.custfx > .left {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  p:nth-child(1) {
    height: 60px;
    font-size: 50px;
    color: rgb(112, 182, 3);
    font-weight: 600;
    text-align: center;
  }
  p:nth-child(2) {
    font-size: 24px;
  }
  border-right: 1px solid rgb(121, 121, 121);
}
.custfx > .rigth {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  margin-left: 30px;
  header {
    font-size: 18px;
    font-weight: 800;
    color: rgb(53, 53, 53);
    margin-top: 30px;
  }
}
.col-div {
  margin-top: 40px;
  height: 120px;
  background-color: rgb(34, 43, 69);
  border-radius: 6px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  i {
    background-color: rgb(51, 102, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0 20px;
    font-size: 30px;
  }
}
.col-div > div:nth-child(2) {
  flex: 1;
  height: 60px;
  color: rgb(134, 146, 172);
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div:nth-child(2) {
    color: rgb(255, 255, 255);
    font-size: 24px;
    font-weight: 900;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  }
}
.imgs {
  margin: 0 20px 0 30px;
}
.rawa {
  display: flex;
  height: 200px;
  align-items: center;
  font-size: 20px;
  color: rgb(51, 51, 51);
  ul {
    display: flex;
    flex-direction: column;
    height: 72%;

    justify-content: space-between;
    li {
      display: flex;
      div {
        width: 280px;
      }
    }
  }
}
.tabdata {
  height: 350px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  .b1 {
    width: 100px;
    height: 50px;
    border-radius: 10px;
    border: 0;
  }
}
.tabdata1 {
  height: 350px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  .b1 {
    width: 100px;
    height: 50px;
    border-radius: 10px;
    border: 0;
  }
}

.tabdata1 > div {
  flex: 1;
}

.tabdata > div:nth-child(2) {
  flex: 5;
}
.tabdata > div:nth-child(3) {
  flex: 4;
}

.cest {
  // margin-left: -40px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: rgb(152, 152, 152);
  li {
    display: flex;
    margin-top: 24px;
    div {
      width: 300px;
      display: flex;
      margin-right: 100px;
      span {
        display: inline-block;
        width: 100px;
      }
      a {
        display: inline-block;
        width: 180px;
      }
      .ls {
        width: 300px;
      }
    }
  }
}
.tabs1 {
  header {
    margin: 30px 0 5px 0;
    display: flex;
    align-items: center;
  }
}
ul,
li {
  list-style: none;
  margin: 0;
}
.cust {
  position: relative;
  .lod-cust {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.el-card {
  margin: 20px;
}
.custmore {
  padding-top: 10px;
  background-color: rgb(242, 242, 242);
}
.area {
  display: flex;
  img {
    background-color: rgb(243, 243, 243);
    width: 70px;
    height: 70px;
    padding: 15px;
  }
}
.area > ul {
  display: flex;
  flex-direction: column;
  color: rgb(152, 152, 152);
}
.area > ul > li:nth-child(1) {
  color: rgb(102, 102, 102);
  font-weight: bold;
  display: flex;

  div:nth-child(3) {
    position: absolute;
    right: 40px;
  }
}
.area > ul > li:nth-child(2),
.area > ul > li:nth-child(3) {
  margin-top: 15px;
  color: rgb(152, 152, 152);
  font-weight: 400;
  display: flex;
  font-size: 12px;
  div {
    width: 300px;
    margin-right: 10px;
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
.yello {
  font-size: 12px;
  font-weight: normal;
  color: #fff;
  margin: 0;
  padding: 0;
}
.yello > li {
  background-color: rgb(255, 170, 0);
  float: left;
  padding: 5px 10px;
  margin-left: 15px;
}
.yello > li:last-child {
  background-color: rgb(217, 0, 27);
}
.imgs {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dolodaing {
  display: flex;
  justify-content: center;
}
.dolodaing > div {
  color: rgb(22, 155, 213);
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.imgshow {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.rejcustmore {
  padding: 0 20px;
  header {
    font-weight: 800;
    color: rgb(102, 102, 102);
  }
}
.rejcustmore {
}
.green {
  background-color: rgb(93, 208, 176);
}
</style>
