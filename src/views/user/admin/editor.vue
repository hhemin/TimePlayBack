<template>
  <FullAlter title="编辑信息" ref="AlterFull">
    <EditorForm @closeFn="closeFn" v-bind="$attrs"></EditorForm>
  </FullAlter>
</template>
<script lang="ts">
/**
 * @name 编辑
 * */
import { defineComponent, ref } from "vue";
import FullAlter from "@/components/fullalter.vue";
import EditorForm from "./editorForm.vue";
interface editorData {
  AlterFull: any;
  addFn: () => void;
  closeFn: () => void;
}
export default defineComponent({
  components: {
    FullAlter,
    EditorForm,
  },
  setup(): editorData {
    const AlterFull: any = ref<HTMLElement | null>(null);
    //  打开窗口
    const addFn = () => {
      AlterFull.value.openFn();
    };
    // 关闭窗口
    const closeFn = () => {
      AlterFull.value.closeFn();
    };
    return {
      addFn,
      AlterFull,
      closeFn,
    };
  },
});
</script>
<style lang=""></style>
