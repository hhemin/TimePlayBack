<template>
  <div class="main">
    <h1 class="title">登录</h1>
    <el-form label-width="70px" :model="modelRef" :rules="rulesRef" ref="formRef">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="modelRef.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="modelRef.password"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <!-- <el-alert v-if="loginStatus === 'error' && !submitLoading" title="用户名或密码错误！" type="error" show-icon :closable="false"></el-alert> -->
    </el-form>
    <el-button
      type="primary"
      class="submit"
      @click="handleSubmit"
      :loading="submitLoading"
    >
      登 录
    </el-button>
  </div>
</template>

<script lang="ts">
/**
 * @name 注册页面
 * */
import { defineComponent, reactive, ref, computed } from "vue";
import { LoginParamsType } from "./data.d";
import { ElForm, ElMessage } from "element-plus";
import { Login } from "@/utils/api";
interface UserLoginSetupData {
  modelRef: LoginParamsType;
  formRef: typeof ElForm;
  rulesRef: any;
  handleSubmit: () => Promise<void>;
  submitLoading: boolean;
  loginStatus?: "ok" | "error";
}

export default defineComponent({
  name: "login",
  setup(): UserLoginSetupData {
    // 表单值
    const modelRef = reactive<LoginParamsType>({
      username: "",
      password: "",
    });
    // 表单验证
    const rulesRef = reactive({
      username: [
        {
          required: true,
          message: "请输入用户名",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
        },
      ],
    });
    // form
    const formRef = ref<typeof ElForm>();
    // 登录loading
    const submitLoading = ref<boolean>(false);
    // 提交
    const handleSubmit = async () => {
      submitLoading.value = true;
      const valid: boolean | undefined = await formRef.value?.validate();
      Login(modelRef)
        .then((res: any) => {
          console.log(res);
        })
        .catch(() => {
          submitLoading.value = false;
        });
      // try {
      //   // const valid: boolean | undefined = await formRef.value ? .validate();
      //   // if (valid === true) {
      //     // const res: boolean = await store.dispatch('userlogin/login',modelRef);
      //     // if (res === true) {
      //     //     ElMessage.success(t('page.user.login.form.login-success'));
      //     //     const { redirect, ...query } = currentRoute.value.query;
      //     //     router.replace({
      //     //         path: redirect as string || '/',
      //     //         query: {
      //     //             ...query
      //     //         }
      //     //     });
      //     // }
      //   }
      // } catch (error) {
      //   // console.log(error);
      //   ElMessage.warning('服务器出错');
      // }
      // submitLoading.value = false;
    };
    // 登录状态
    const loginStatus = computed<"ok" | "error" | undefined>(() => "error");

    return {
      modelRef,
      rulesRef,
      formRef: (formRef as unknown) as typeof ElForm,
      submitLoading: (submitLoading as unknown) as boolean,
      handleSubmit,
      loginStatus: (loginStatus as unknown) as "ok" | "error" | undefined,
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  flex: none;
  width: 350px;
  padding: 36px;
  margin: 0 auto;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  .title {
    font-size: 28px;
    margin-top: 0;
    margin-bottom: 30px;
    text-align: center;
    color: #ffffff;
  }
  .submit {
    width: 100%;
  }
}
</style>
