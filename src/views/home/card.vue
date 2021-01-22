<template>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="clearfix">
        <span>{{ title }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
    </template>
    <slot name="main"></slot>
  </el-card>
</template>
<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped></style>
