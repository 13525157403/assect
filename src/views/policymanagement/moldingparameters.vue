<template>
  <div class="cust">
    <el-row>
      <el-col :span="24">
        <header class="left-tit">入模参数</header>
        <header class="right-tit">参数库</header>
        <div class="cre">
          <el-button
            type="primary"
            @click="createmodel"
            :loading="createmodelLod"
            >完成模型</el-button
          >
          <el-button type="danger" @click="close">取消</el-button>
        </div>
        <div class="tables">
          <div class="left">
            <el-input
              v-model="suchmolding"
              placeholder="搜索参数名称"
              prefix-icon="el-icon-search"
              @input="suchmoldingleft"
            />

            <ul v-if="!suchleftlist" class="content">
              <li
                v-for="(i, m) in moldinglist"
                :key="i.id"
                :class="colorleft[m] ? 'a1' : ''"
                @click="listleft(m, i.id)"
              >
                {{ i.name }}
              </li>
            </ul>
            <ul v-else class="content">
              <li
                v-for="(i, m) in suchleftlist"
                :key="i.id"
                :class="colorleft[m] ? 'a1' : ''"
                @click="listleft(m, i.id)"
              >
                {{ i.name }}
              </li>
            </ul>
          </div>
          <div class="center">
            <img
              :src="require('@/assets/legend/u2122.svg')"
              alt=""
              @click="topaddmodel"
            />
            <img
              :src="require('@/assets/legend/u2123.svg')"
              alt=""
              @click="delmodel"
            />
          </div>
          <div class="right">
            <el-input
              v-model="suchparameterlibrary"
              prefix-icon="el-icon-search"
              placeholder="搜索参数名称"
              @input="suchparameterlibraryright"
            />
            <ul v-if="!suchlistright" class="content">
              <li
                v-for="(i, m) in parameterlibrarylist"
                :key="i.id"
                :style="i.clickselect"
                :class="colorright[m] ? 'a1' : ''"
                @click="rightlist(m, i.id)"
              >
                {{ i.name }}
              </li>
            </ul>
            <ul v-else class="content">
              <li
                v-for="(i, m) in suchlistright"
                :key="i.id"
                :style="i.clickselect"
                :class="colorright[m] ? 'a1' : ''"
                @click="rightlist(m, i.id)"
              >
                {{ i.name }}
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
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
import {
  parameterfindListByPage,
  addmodel,
  uploadFilesReq,
} from "@/api/policymanagement";

export default {
  data() {
    return {
      createmodelLod: false,
      datalist: [],
      lod: false,
      // 左侧搜素
      suchleftlist: null,
      suchmolding: "",
      // 左边列表
      moldinglist: [],
      colorleft: [],
      colorright: [],
      // 右侧搜索
      suchlistright: null,
      suchparameterlibrary: "",
      // 右边列表
      parameterlibrarylist: [],
      // 移到左侧的id
      rightsign: [],
      fromdata: {},
    };
  },
  created() {
    if (!this.$route.params.modelfrom) {
      this.$router.push({ name: "modelconfiguration" });
      this.$message.error("刷新页面后，模型文件已丢失，请重新创建模型");
      return;
    }
    this.fromdata = this.$route.params.modelfrom;
    this.parameterfindListByPage();
  },
  methods: {
    // 左侧搜索
    suchmoldingleft() {
      if (this.suchmolding) {
        this.suchleftlist = [];
        this.moldinglist.map((i) => {
          if (i.name.indexOf(this.suchmolding) != -1) {
            this.suchleftlist.push(i);
          }
        });
      } else {
        this.suchleftlist = null;
      }
    },
    // 右侧搜索
    suchparameterlibraryright() {
      if (this.suchparameterlibrary) {
        this.suchlistright = [];
        this.parameterlibrarylist.map((i) => {
          if (i.name.indexOf(this.suchparameterlibrary) != -1) {
            this.suchlistright.push(i);
          }
        });
      } else {
        this.suchlistright = null;
      }
    },
    // 右侧选中
    rightlist(v, id) {
      this.colorleft = [];
      this.$set(this.colorright, v, !this.colorright[v]);
      if (this.colorright[v]) {
        this.rightsign.push(id);
      } else {
        this.rightsign.forEach((item, m) => {
          if (item == id) {
            this.rightsign.splice(m, 1);
          }
        });
      }
    },
    // 左侧选中
    listleft(v, id) {
      this.colorright = [];
      this.$set(this.colorleft, v, !this.colorleft[v]);
      if (!this.colorleft[v]) {
        this.rightsign.push(id);
      } else {
        this.rightsign.forEach((item, m) => {
          if (item == id) {
            this.rightsign.splice(m, 1);
          }
        });
      }
    },
    // 上
    topaddmodel() {
      this.dataprocessing(this.rightsign);
      console.log("12333");
      this.suchparameterlibrary = null;
      this.suchleftlist = null;
      this.suchlistright = null;
      this.suchmolding = null;
    },
    // 下
    delmodel() {
      this.dataprocessing(this.rightsign);
      this.suchparameterlibrary = null;
      this.suchleftlist = null;
      this.suchlistright = null;
      this.suchmolding = null;
    },
    // 数据处理
    dataprocessing(leftid) {
      if (leftid) {
        const set = new Set(leftid);
        const arr = [...set];
        this.moldinglist = [];
        this.parameterlibrarylist = [];
        this.datalist.forEach((item, index) => {
          this.parameterlibrarylist.push({
            id: item.id,
            name: item.name,
            clickselect: {},
          });
          for (let i = 0; i < arr.length; i++) {
            if (item.id == arr[i]) {
              this.moldinglist.push(item);
              this.parameterlibrarylist[index] = {
                id: item.id,
                name: item.name,
                clickselect: {
                  "pointer-events": "none",
                  color: "rgb(215,215,215)",
                },
              };
            }
          }
        });
      } else {
        this.moldinglist = [];
        this.datalist.forEach((item) => {
          this.parameterlibrarylist.push({
            id: item.id,
            name: item.name,
            clickselect: {},
          });
        });
      }
      this.colorleft = [];
      this.colorright = [];
    },
    // 查询参数库
    async parameterfindListByPage() {
      this.lod = true;
      const res = await parameterfindListByPage({ rows: 999999, page: 1 });
      this.lod = false;
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.$message.success("参数库获取成功");
      this.datalist = res.data.records;
      this.dataprocessing();
    },
    async createmodel() {
      this.createmodelLod = true;
      const data = new FormData();
      this.fromdata.modelParam = [];
      this.moldinglist.forEach((i) => {
        this.fromdata.modelParamIds.push(i.id);
      });
      console.log(this.fromdata);
      const res = await addmodel(this.fromdata).catch(() => {
        this.createmodelLod = false;
      });
      this.createmodelLod = false;
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      if (this.fromdata.fells) {
        const from = new FormData();
        from.append("file", this.fromdata.fells);
        from.append("modelId", res.data.id);
        const req = await uploadFilesReq(from);
        if (req.code !== 200) {
          return this.$message.error(req.message);
        }
      }
      this.$message.success(res.message);
      this.$router.push({ name: "modelconfiguration" });
    },
    // 取消创建
    close() {
      this.$router.push({ name: "modelconfiguration" });
    },
  },
};
</script>

<style lang="scss" scoped>
.cust {
  padding: 20px;
  background-color: rgb(242, 242, 242);
}
.tables {
  height: 840px;
  background-color: #fff;

  padding: 50px 20px;
  display: flex;

  .left {
    flex: 5;
    border: 1px solid;
    border-radius: 20px;
  }
  .right {
    flex: 5;
    border: 1px solid;
    border-radius: 20px;
  }
  .center {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      margin: 20px 0;
      cursor: pointer;
      width: 76px;
      height: 40px;
    }
    img:last-child {
      transform: rotateZ(180deg);
    }
  }
}
.tables > div {
  padding: 20px;
  height: 90%;

  overflow: hidden;
}
.el-col {
  position: relative;
  header {
    position: absolute;
    font-size: 26px;
    font-weight: bold;
  }
  .left-tit {
    left: 16%;
    top: 2%;
  }
  .right-tit {
    right: 18%;
    top: 2%;
  }
}
.content {
  height: 90%;
  font-size: 20px;
  overflow-y: auto;
  margin-top: 15px;
  li:first-child {
    margin-top: 0;
  }
  li {
    width: 100%;
    cursor: pointer;
    margin: 15px 0;
  }
}
.a1 {
  background-color: rgb(2, 167, 240);
  color: #fff;
}
.cre {
  position: absolute;
  bottom: 5%;
  right: 5%;
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
</style>
