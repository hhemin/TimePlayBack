<template>
  <div>
    <el-form
      :model="Form"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
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
    <!-- {{ $attrs.editorData.value }} -->
    <!-- <el-button type="" @click="srueFn">确定</el-button> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { editorformDataType } from "./editorForm";
import { validateVPassword } from "@/assets/ts/validate";

interface formData {
  Form: editorformDataType;
  rules: any;
  submitForm: () => void;
  resetForm: () => void;
  ruleForm: any;
}
export default defineComponent({
  setup(props: any, { emit, attrs }: { emit: any; attrs: any }): formData {
    const ruleForm: any = ref<HTMLElement | null>(null);
    const Form = reactive<editorformDataType>({
      password: "",
      checkPass: "",
    });
    const getForm = ref(Form); // 转换获取

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
    });

    // 提交
    const submitForm = () => {
      ruleForm.value.validate((valid: any) => {
        if (valid) {
          alert("submit!");
          emit("closeFn"); // 执行关闭窗口
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
