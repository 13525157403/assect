<template>
  <div>
    <button class="act-btn" :class="actclass" :style="{ height, width }">
      <i :class="icon"></i>
      <span>
        <slot></slot>
      </span>
      <img
        class="posicon"
        v-show="active"
        :src="require('@/assets/icon/u11648.svg')"
      />
      <img
        class="success"
        v-show="active"
        :src="require('@/assets/icon/u11649.svg')"
        alt=""
      />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "el-icon-s-data",
    },
    width: {
      type: String,
      default: "100px",
    },
    height: {
      type: String,
      default: "32px",
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    active() {
      if (this.active) {
        this.actclass = "a2";
      } else {
        this.actclass = "a1";
      }
    },
  },
  data() {
    return {
      actclass: "a1",
    };
  },
};
</script>

<style lang="scss" scoped>
button,
i,
span {
  margin: 0;
  padding: 0;
}
.act-btn {
  cursor: pointer;
  background-color: #fff;
  border-radius: 3px;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  i {
    margin: 5% 10%;
  }
}
.a1 {
  border: 1.5px solid rgb(127, 127, 127);
  color: rgb(127, 127, 127);
}
.a2 {
  border: 1.5px solid rgb(85, 217, 161);
  color: rgb(85, 217, 161);
  position: relative;
  .posicon {
    position: absolute;
    top: -1px;
    right: -1px;
  }
  .success {
    position: absolute;
    top: 5%;
    right: 1%;
  }
}
</style>