<template>
  <el-menu
    class="index-layout-leftmenu"
    :default-active="$route.path"
    @select="handleSelect"
  >
    <header style="height: 60px; text-align: center; line-height: 60px; color: #ffffff">
      TimePlay {{ activeIndex }}
    </header>
    <el-menu-item :index="item.router" v-for="(item, index) in Menudata" :key="index">{{
      item.name
    }}</el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

interface menudata {
  activeIndex: string;
  handleSelect: (key: string) => void;
}

export default defineComponent({
  name: "menu",
  props: {
    /**
     * 数据格式：
     * [{
     *   name:'名称',
     *   router:'路由'
     * }]
     * */
    Menudata: {
      type: Object,
      required: true,
    },
  },
  setup(): menudata {
    const activeIndex = ref<string>("/");
    const router = useRouter();
    const handleSelect = (key: string) => {
      activeIndex.value = key;
      router.push(key);
    };
    return {
      handleSelect,
      activeIndex: (activeIndex as unknown) as string,
    };
  },
});
</script>

<style lang="scss" scoped></style>
