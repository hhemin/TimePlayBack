<template>
  <el-form
    :model="Form"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="Form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="Form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="Form.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { formDataType } from "./form.d";
import { validateVPassword } from "@/assets/ts/validate";
import { AddUser } from "@/utils/api";
interface formData {
  Form: formDataType;
  rules: any;
  submitForm: () => void;
  resetForm: () => void;
  ruleForm: any;
}
export default defineComponent({
  setup(): formData {
    const ruleForm: any = ref<HTMLElement | null>(null);
    const Form = reactive<formDataType>({
      password: "",
      checkPass: "",
      username: "",
    });
    const getForm = ref(Form); // 转换获取

    const checkName = (rule: any, value: any, callback: any) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (validateVPassword(value)) {
          callback(new Error("密码不合法,密码长度为6-20的包含大小写字母和数字"));
        }
        callback();
      }
    };
    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== getForm.value.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 规则
    const rules = reactive({
      password: [
        {
          validator: validatePass,
          required: true,
        },
      ],
      checkPass: [
        {
          validator: validatePass2,
          required: true,
        },
      ],
      username: [
        {
          validator: checkName,
          required: true,
        },
        { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" },
      ],
    });
    // 提交
    const submitForm = async () => {
      const valid: boolean | undefined = await ruleForm.value?.validate();
      // const _data = {
      //   username: Form.value.username,
      //   password: Form.value.password,
      // };
      console.log(Form);
      AddUser(Form)
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
      // ruleForm.value.validate((valid: any) => {
      //   if (valid) {
      //     // console.log(Form);
      //     const _data = {
      //       username: Form.value.username,
      //       password: Form.value.password,
      //     };

      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    };
    // 重置
    const resetForm = () => {
      ruleForm.value.resetFields();
    };
    return {
      Form,
      ruleForm,
      submitForm,
      rules,
      resetForm,
    };
  },
});
</script>

<style lang="scss" scoped></style>
