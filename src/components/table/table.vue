<template>
  <div>
    <!-- 
    @param tableData 父组件传值
    @param loading [Boolean] 加载提示
    @param border [Boolean] table边框
  -->
    <el-table
      ref="table"
      :data="tableData"
      v-loading="loading"
      element-loading-text="Loading"
      :border="border"
      fit
      highlight-current-row
      tooltip-effect="dark"
      style="width: 100%"
      @sort-change="handleSortChange"
      @selection-change="handleSelectionChange"
    >
      <!-- 
          @name 展开查看详情
          @param tableLabel 父组件传值
          @param label [string] 名称
          @param render 配置格式化数据
         -->
      <el-table-column type="expand">
        <template #default="props">
          <el-form class="table-expand">
            <el-form-item
              v-for="(item, index) in tableLabel"
              :key="index"
              :label="item.label"
            >
              <span v-if="item.render">
                {{ item.render(props.row) }}
              </span>
              <span v-else>{{ props.row[item.param] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!--
          @name 操作
          @param tableOption 父组件传值
          @param label [string] 名称
          @param width [string] 宽度
          @param options [array] 按钮数组
          @param type 按钮类型
          @param icon 按钮图标
          @param handleButton 按钮方法 
         -->
      <el-table-column
        v-if="tableOption.label"
        :width="tableOption.width"
        :label="tableOption.label"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="props">
          <el-button
            v-for="(item, index) in tableOption.options"
            :key="index"
            :type="item.type"
            :icon="item.icon"
            @click="handleButton(item.methods, props.row, props.$index)"
            size="mini"
          >
            {{ item.label }}
          </el-button>
        </template>
      </el-table-column>
      <!-- 
          @name 标题+表格数据显示
          @param tableLabel 父组件传值
          @param width 【string】宽度
          @param align 【string】对齐方式
          @param label [string] 名称
          @param sortable [Boolean] 排序
          @param render 配置格式化数据
        -->
      <div v-for="(item, index) in tableLabel" :key="index">
        <el-table-column
          v-if="item.show"
          :width="item.width ? item.width : ''"
          :align="item.align"
          :label="item.label"
          :prop="item.param"
          :sortable="item.sortable ? 'custom' : false"
        >
          <template #default="props">
            <span v-if="item.render">
              {{ item.render(props.row) }}
            </span>
            <span v-else>{{ props.row[item.param] }}</span>
          </template>
        </el-table-column>
      </div>
    </el-table>
  </div>
</template>

<script lang="ts">
/**
 * @name 表格封装
 * @export TableElement
 * @param loading [Boolean] 配置加载提示
 * @param tableData [Array] 数据
 * @param tableMain [Array] 数据详情
 * @param tableLabel [Array] 配置表格头部
 * @param tableOption [Object] 操作按钮
 * @param border [Boolean] 配置边框
 */
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableMain: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableLabel: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableOption: {
      type: Object,
      default: () => {
        return {};
      },
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: any, { emit }: { emit: any }) {
    //  // methods:按钮名称 row：同一行的数据 index：第几行（0开始）
    const handleButton = (methods: string, row: any, index: number) => {
      emit("handleButton", { methods: methods, row: row });
    };
    const handleSortChange = (val: any) => {
      // 排序
      emit("handleSortChange", val);
    };
    const handleSelectionChange = (val: any) => {
      emit("handleSelectionChange", val);
    };
    return {
      handleButton,
      handleSortChange,
      handleSelectionChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.table-expand {
  font-size: 0;
  display: flex;
  flex-wrap: wrap;
}

.table-expand label {
  width: 90px;
  color: #99a9bf;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
