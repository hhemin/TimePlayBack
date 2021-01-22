<template>
  <el-button type="primary" @click="addFN">添加</el-button>
  <FullAlter title="添加管理员用户" ref="AlterFull">
    <Form></Form>
  </FullAlter>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import FullAlter from "@/components/fullalter.vue";
import Form from "./form.vue";

export default defineComponent({
  components: {
    FullAlter,
    Form,
  },
  setup() {
    const AlterFull: any = ref<HTMLElement | null>(null);
    const addFN = () => {
      AlterFull.value.openFn();
    };
    return {
      addFN,
      AlterFull,
    };
  },
});
</script>
<style lang=""></style>
