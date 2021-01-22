<template>
<div>
  <el-pagination :page-size="pagesize" @current-change="handleSizeChange" background layout="prev, pager, next" :total="total">
  </el-pagination>
</div>
</template>

<script lang="ts">
/**
 * @name 页码
 * */
import {
  defineComponent
} from 'vue'

interface paginationData {
  handleSizeChange: () => void;
}
export default defineComponent({
  name: 'pagination',
  props: {
    // 数据条数
    pagesize: {
      type: Number,
      default: 20,
    },
    // 总数据条数
    total: {
      type: Number,
      required: true,
    }
  },
  setup(): paginationData {
    const handleSizeChange = () => {
      console.log(123)
    }
    return {
      handleSizeChange
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>
