<template>
  <el-dialog :title="title" v-model="visible">
    <slot></slot>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  setup() {
    const visible = ref<boolean>(false);
    const closeFn = () => {
      visible.value = false;
    };
    const openFn = () => {
      visible.value = true;
    };

    return {
      visible,
      closeFn,
      openFn,
    };
  },
});
</script>
<style lang="scss" scoped></style>
