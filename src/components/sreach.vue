<template>
  <el-input placeholder="请输入内容" v-model="sreach" class="input-with-select" clearable>
    <template #prepend>
      <el-select v-model="select" placeholder="请选择" style="width: 100px">
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="(item, index) in selectinput"
          :key="index"
        ></el-option>
      </el-select>
    </template>
    <template #append>
      <el-button icon="el-icon-search" @click="sreachFN"></el-button>
    </template>
  </el-input>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
interface sreachData {
  select: string;
  sreach: string;
  sreachFN: () => void;
}
export default defineComponent({
  props: {
    selectinput: {
      type: Array,
      required: true,
    },
  },
  setup(props: any, { emit }: { emit: any }): sreachData {
    const select = ref<string>(""); // 选择
    const sreach = ref<string>(""); // 搜索
    onMounted(() => {
      select.value = props.selectinput ? props.selectinput[0].value : "";
    });
    const sreachFN = () => {
      console.log(sreach.value);
      emit("Getsreach", sreach.value);
    };
    return {
      select: (select as unknown) as string,
      sreach: (sreach as unknown) as string,
      sreachFN,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-select .el-input {
  width: 130px;
}

// .input-with-select .el-input-group__prepend {
//   background-color: #fff;
// }
</style>
