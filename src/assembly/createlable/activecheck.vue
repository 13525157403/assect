<template>
  <div>
    <div class="act-btn" @click="clickchange" :class="active ? 'a2' : 'a1'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    clickchange() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
i,
span {
  margin: 0;
  padding: 0;
}
.act-btn {
  cursor: pointer;
  background-color: #fff;
  height: 32px;
  border-radius: 3px;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
}
.a1 {
  border: 1.5px solid rgb(223, 223, 223);
  color: rgb(127, 127, 127);
}
.a2 {
  border: 1.5px solid rgb(85, 217, 161);
  color: rgb(85, 217, 161);
}
</style>