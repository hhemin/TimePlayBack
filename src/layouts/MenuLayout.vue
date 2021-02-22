<template>
  <el-container>
    <el-aside class="el-aside">
      <Menu :Menudata="menu"></Menu>
    </el-aside>
    <el-container>
      <el-header class="el-header">
        <el-popover placement="top-start" :width="200" trigger="hover">
          <template #reference>
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
          </template>
          <div class="myinfo">
            <div class="item">账号：{{ username }}</div>
            <div style="display: flex; padding: 10px">
              <el-button type="primary" size="mini" @click="fixpass">修改密码</el-button>
              <el-button type="danger" size="mini" @click="loginout">退出登录</el-button>
            </div>
          </div>
        </el-popover>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <Editor ref="editorDom" :editorData="editorData" currentPage=""></Editor>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Menu from "@/components/menu/menu.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import Editor from "@/components/password/editor.vue";
import { useRouter } from "vue-router";

interface MenuLayoutData {
  menu: any;
  loginout: () => void;
  editorDom: any;
  editorData: object;
  fixpass: () => void;
  username: string;
}

export default defineComponent({
  name: "menuLayout",
  components: {
    Menu,
    Editor,
  },
  setup(): MenuLayoutData {
    const username = <string>localStorage.getItem("username");
    const router = useRouter();
    const menu = reactive([
      {
        name: "首页",
        router: "/",
      },
      {
        name: "用户管理",
        router: "/customer",
      },
      {
        name: "管理员管理",
        router: "/admin",
      },
      // {
      //   name: "个人信息",
      //   router: "/myinfo",
      // },
    ]);

    const editorDom: any = ref<HTMLElement | null>(null);
    const editorData: object = reactive({});
    // 登出
    const loginout = () => {
      ElMessageBox.confirm("是否进行退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        ElMessage({
          type: "success",
          message: "退出成功!",
        });
        router.push("/login");
      });
    };
    const fixpass = () => {
      editorDom.value.addFn();
    };
    return {
      menu,
      loginout,
      editorDom,
      editorData,
      fixpass,
      username,
    };
  },
});
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
.el-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .myinfo {
    .item {
      padding: 20px;
      border-bottom: 1px solid;
    }
    .item:hover {
      background-color: yellow;
    }
  }
}
</style>
