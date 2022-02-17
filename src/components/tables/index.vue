<template>
  <div class="tables">
    <ul>
      <li class="header">
        <span v-if="choice" style="width: 100px; cursor: pointer"
          ><input
            type="checkbox"
            v-model="chooseWhole"
            :value="'000000'"
            @change="choose(true, chooseWhole)"
        /></span>
        <span
          :style="[
            { 'text-align': item.align },
            item.width ? { width: item.width } : { flex: 1 },
          ]"
          v-for="(item, index) in opitons"
          :key="index"
        >
          <a v-if="item.sort">
            <i class="el-icon-caret-top" @click="sort(true)"></i>
            <i class="el-icon-caret-bottom" @click="sort(false)"></i>
          </a>
          {{ item.header }}
        </span>
      </li>
      <li class="und" v-if="valueArr.length == 0">暂无数据</li>
      <li
        v-else
        class="main"
        :class="interLaced ? 'interLaced' : ''"
        v-for="(item, index) in valueArr"
        :key="index"
      >
        <span v-if="choice" style="width: 100px; cursor: pointer"
          ><input
            type="checkbox"
            v-model="item.choose"
            :value="index"
            @change="choose(false, item.choose, item, index)"
        /></span>
        <span
          :style="[
            { 'text-align': i.align },
            i.width ? { width: i.width } : { flex: 1 },
          ]"
          v-for="(i, m) in opitons"
          :key="m"
        >
          <slot
            v-if="i.slot"
            :name="i.slot"
            :row="item"
            :rowindex="index"
            :colindex="m"
            :col="i"
            :value="item[i.value]"
          ></slot>
          <a v-else>{{ item[i.value + ""] }}</a>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    this.valueArr.forEach((item) => {
      item["choose"] = false;
    });
  },
  props: {
    interLaced: {
      type: Boolean,
      default: false,
    },
    choice: {
      type: Boolean,
      default: false,
    },
    valueArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
    opitons: {
      type: Array,
      default: () => {
        return [
          // {
          //   header: "名称",
          //   value: "a",
          //   slot: "text",
          //   sort: true,
          //   width: "100px",
          //   align: "center",
          // },
        ];
      },
    },
  },
  data() {
    return {
      chooseArr: [],
      chooseWhole: false,
    };
  },
  watch: {
    valueArr() {
      this.valueArr.forEach((item) => {
        item["choose"] = false;
      });
    },
  },
  methods: {
    sort(val) {
      this.$emit("sortChange", val);
    },
    choose(all, ish, item, index) {
      if (all) {
        if (ish) {
          this.valueArr.forEach((item, index) => {
            this.$set(this.valueArr[index], "choose", true);
            this.chooseArr = [...this.valueArr];
          });
        } else {
          this.valueArr.forEach((item, index) => {
            this.$set(this.valueArr[index], "choose", false);
          });
          this.chooseArr = [];
        }
      } else {
        if (ish) {
          this.chooseArr[index] = item;
        } else {
          this.chooseArr.splice(index, 1);
        }
      }
      const choseArr = [];
      for (let i = 0; i < this.chooseArr.length; i++) {
        choseArr.push(this.chooseArr[i]);
      }
      this.$emit("choose", choseArr);
    },
  },
};
</script>

<style lang="scss" scoped>
.tables {
  width: 100%;
  display: flex;
  font-size: 14px;
  & > ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    .header {
      background: #ebecef;
      box-shadow: 5px 5px 5px #dbdbde, -5px -5px 5px #fbfdff;
      width: 100%;
      display: flex;
    }
    .und {
      width: 100%;
      text-align: center;
      font-size: 20px;
      font-weight: 100;
      padding: 30px;
    }
    li {
      span {
        display: inline-block;
        width: 100%;
        padding: 10px;
      }
    }
    .main {
      width: 100%;
      display: flex;
      font-size: 12px;
      color: #666666;
    }
  }
  .interLaced:nth-child(2n + 1) {
    background-color: rgb(229, 230, 234);
  }
}
</style>