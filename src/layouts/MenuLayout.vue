<template>
<el-container>
  <el-aside width="200px" class="el-aside">
    <Menu :Menudata="menu"></Menu>
  </el-aside>
  <el-container>
    <el-header class="el-header">Header</el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</el-container>
</template>

<script lang="ts">
import Menu from '@/components/menu/menu.vue';
import {
  defineComponent,
  reactive
} from 'vue';

interface MenuLayoutData {
  menu: any;
}

export default defineComponent({
  name: 'menuLayout',
  components: {
    Menu
  },
  setup(): MenuLayoutData {
    const menu = reactive([{
      name: '首页',
      router: '/'
    },{
      name:'用户管理',
      router: '/customer'
    },{
      name:'超级管理员管理',
      router:'/admin'
    }])
    return {
      menu
    }
  }

})
</script>

<style lang="scss" scoped>
.el-aside {
  min-height: 100vh;
  background-color: #222934;
  box-shadow: 1px 12px 5px 2px #3c3c3c66;
  z-index: 1;
}

header {
  z-index: 1;
  background-color: #222934db;
  box-shadow: 4px 5px 5px 0px #3c3c3c66;
}

.el-main {
  background-color: #f0f3f4;
  div {
    background-color: #ffffff;
    box-sizing: border-box;
    border-radius: 5px;
    min-height: 100%;
  }
}
</style>
