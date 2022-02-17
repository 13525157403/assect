<template>
  <div class="cust">
    <el-row>
      <el-col :span="24">
        <div class="dwk1 titel">
          <div class="left">
            <header>用户群画像</header>
            <div>
              <a>1</a> 用户群画像 使用 标签、用户行为、用户属性
              进行筛选，获得目标群体
            </div>
            <div><a>2</a>观察目标群体的 标签分布、用行为指标、和 用户构成</div>
            <div><a>3</a>将目标群体保存为 用户群标签、或 导出人群列表</div>
            <div>
              <el-button
                size="mini"
                class="green"
                @click="createportrait('usergroupportrait')"
                >创建用户群画像</el-button
              >
            </div>
          </div>
          <div class="right"></div>
        </div>
      </el-col>
    </el-row>
    <div class="table-tit">
      <div class="left">用户群画像列表 <span>共4个</span></div>
      <div class="right">
        <el-checkbox-group v-model="portraitlist.onlyCreated">
          <el-checkbox true-label="true" false-label="false" label="仅我创建" />
        </el-checkbox-group>
        <el-input
          v-model="portraitlist.founder"
          size="mini"
          placeholder="搜索名称"
          prefix-icon="el-icon-search"
          clearable
        />
        <el-button type="primary" size="mini" @click="getList">查询</el-button>
      </div>
    </div>
    <el-row>
      <el-col :span="24">
        <div
          v-if="lod"
          v-loading="true"
          class="el-portrait-list"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.7)"
        ></div>
        <div class="dwk2">
          <div class="table">
            <tables :valueArr="portraitListdata" :opitons="tableOpitons">
              <template slot="img" slot-scope="{ row }">
                <div class="oper">
                  <img
                    @click="deleteportrait(row)"
                    :src="require('@/assets/icon/u9400.svg')"
                    alt=""
                  />
                  <img
                    @click="createportrait('portraitdetails', row)"
                    :src="require('@/assets/lable/u2398.svg')"
                    alt=""
                  />
                </div>
              </template>
              <template slot="text" slot-scope="{ value }">
                <div style="color: rgb(71,203,149)">
                  {{ value }}
                </div>
              </template>
            </tables>
            <!-- <el-table
              :data="portraitListdata"
              height="210"
              stripe
              header-row-class-name="headerstyle"
              
              style="background: rgb(235, 236, 239)"
              :header-cell-style="sky"
              :cell-style="{
                'font-size': '12px',
                border: 'none',
                background: '#ebecef',
              }"
            >
              <el-table-column label="名称" width="400" prop="imageName" />
              <el-table-column
                label="创建者"
                align="center"
                prop="founder"
                width="200"
              />
              <el-table-column
                label="发布时间"
                prop="createTime"
                align="center"
              />
              <el-table-column label="操作" align="center">
                <template slot-scope="{ row }">
                  <div class="oper">
                    <img
                      @click="deleteportrait(row)"
                      :src="require('@/assets/icon/u9400.svg')"
                      alt=""
                    />
                    <img
                      @click="createportrait('portraitdetails', row)"
                      :src="require('@/assets/lable/u2398.svg')"
                      alt=""
                    />
                  </div>
                </template>
              </el-table-column>
            </el-table> -->
          </div>
          <div class="pag">
            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="portraitlist.page"
              :limit.sync="portraitlist.rows"
              :page-sizes="[3, 5, 10, 20]"
              @pagination="getList"
            />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import tables from "@/components/tables/index.vue";
import { findListByPageportrait, deleteportrait } from "@/api/userportrait";
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination,
    tables,
  },
  data() {
    return {
      lod: false,
      total: 0,
      // 画像列表
      portraitlist: {
        founder: "",
        onlyCreated: "",
        pageCount: "",
        page: 1,
        rows: 3,
      },
      portraitListdata: [],
      tableOpitons: [
        {
          header: "名称",
          value: "imageName",
          slot:'text'
        },
        {
          header: "创建者",
          value: "founder",
        },
        {
          header: "发布时间",
          value: "createTime",
          align:'center'
        },
        {
          header: "操作",
          value: "",
          slot:'img',
          align:'center'
        },
        
      ],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    sky({ columnIndex }) {
      // let style={}
      // if(columnIndex==0){
      //   style={
      //     'box-shadow': 'inset 0px 15px 10px -15px #fff'
      //   }
      // }else if(columnIndex==3){
      //   style={
      //     'box-shadow': '-20px -20px 30px #ffffff'
      //   }
      // }
      // return {...style,'font-size': '12px',
      //   'font-weight': 'normal','box-shadow':'0px 0px 0px 10px #fff,0px 0px 0px 10px #fff,0px 0px 0px 10px #fff,0px 0px 0px 10px #fff'}
    },
    headerstyle(row) {
      return "headerstyle";
    },
    checkboxmi() {},
    async getList() {
      this.lod = true;
      let { records, total } = await findListByPageportrait(
        this.portraitlist
      ).catch((err) => {
        this.lod = false;
        const { response } = err;
        this.$message.error(response.data.message);
        return;
      });
      if (records.length == 0 && this.portraitlist.page > 1) {
        this.portraitlist.page--;
        this.getList();
        if (this.portraitlist.page <= 1 || records.length != 0) {
          return;
        }
      }
      this.lod = false;
      this.portraitListdata = records;
      this.total = total;
    },
    createportrait(name, row) {
      if (!row) {
        return this.$router.push({ name: name });
      }
      const { id, imageName, userGroupId } = row;
      this.$router.push({
        name: name,
        query: { id: id, name: imageName, userGroupId: userGroupId },
      });
    },
    //删除画像
    async deleteportrait({ id }) {
      let prompt = await this.$confirm("确认删除该画像吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => {});
      if (!prompt) return;
      this.lod = true;
      let res = await deleteportrait({ id: id }).catch((err) => {
        this.lod = false;
        const { response } = err;
        this.$message.error(response.data.message);
        return;
      });
      this.lod = false;
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.$message.success(res.message);
      console.log(this.portraitlist);

      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .headerstyle {
    .el-table__cell {
      background: #ebecef !important;
    }
  }
  th.el-table__cell.is-leaf,
  td.el-table__cell {
    border: none;
  }
}

.cust {
  background-color: rgb(235, 236, 239);
  padding: 20px;
}
.dwk1 {
  height: 200px;
  background-color: rgb(235, 236, 239);
}
.green {
  background-color: rgb(66, 191, 139);
  color: #fff;
}
.titel {
  display: flex;

  .left {
    flex: 3;
    padding: 30px;
    div {
      font-size: 13px;
      color: rgb(121, 121, 121);
      display: flex;
      margin: 10px 0;
      a {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 2px solid rgb(66, 191, 139);
        color: rgb(66, 191, 139);
        text-align: center;
        line-height: 15px;
        margin-right: 10px;
      }
    }
    header {
    }
  }
  .right {
    flex: 2;
    display: flex;
    justify-content: flex-end;
    img {
      height: 100%;
    }
  }
}
.el-row {
  padding-bottom: 20px;
}
.dwk2 {
  height: 300px;
  background-color: rgb(235, 236, 239);
  padding: 20px;
  position: relative;
  .table {
    min-height: 230px;
  }
}
.el-portrait-list {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}
.table-tit {
  display: flex;
  padding: 10px 20px;
  .left {
    color: rgb(98, 98, 98);
    font-weight: bold;
    span {
      font-size: 12px;
      font-weight: normal;
    }
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .el-input {
      margin: 0 10px;
      width: 140px;
    }
  }
}
.oper {
  img {
    margin: 0 10px;
    cursor: pointer;
  }
}
.pag {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
::v-deep {
  .pagination-container {
    margin: 0;
    padding: 0 16px;
    background-color: rgb(235, 236, 239);
  }
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
</style>
