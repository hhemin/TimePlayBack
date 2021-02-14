<template>
  <div>
    <el-pagination
      :page-size="pagesize"
      @current-change="handleSizeChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="currentPage"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
/**
 * @name 页码
 * */
import { defineComponent, toRefs } from "vue";

interface paginationData {
  handleSizeChange: (currentPage: number) => void;
}
export default defineComponent({
  name: "pagination",
  props: {
    // 每页显示条目个数
    pagesize: {
      type: Number,
      default: 20,
    },
    // 总数据条数
    total: {
      type: Number,
      required: true,
    },
    // 页码
    currentPage: {
      type: Number,
      // default: 1,
    },
    tvalue: {
      type: String,
    },
  },
  setup(props: any, { emit }: { emit: any }): paginationData {
    const handleSizeChange = (currentPage: number): void => {
      console.log(currentPage);
      // emit("update:currentPage", currentPage);
    };
    const changfn = (): void => {
      // props.tvalue = "12312312123";
      // emit("testfn", "11231231231213123");
    };
    return {
      // changfn,
      handleSizeChange,
    };
  },
});
</script>

<style lang="scss" scoped></style>
