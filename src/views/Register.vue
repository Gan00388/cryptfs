<template>
  <div class="register">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="0px"
      label-position="left"
      class="register-container"
    >
      <h3 class="register_title">
        注册
        <el-button @click="toLogin()">去登录</el-button>
      </h3>
      <el-form-item label="" prop="loginName">
        <el-input v-model="ruleForm.loginName" placeholder="请输入用户名" prefix-icon="el-icon-user-solid" />
      </el-form-item>
      <el-form-item label="" prop="loginPhone">
        <el-input v-model="ruleForm.loginPhone" placeholder="请输入手机号" prefix-icon="el-icon-user-solid" />
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password/>
      </el-form-item>
      <el-form-item label="" prop="checkPass">
        <el-input
          v-model="ruleForm.checkPass"
          type="password"
          autocomplete="off"
          placeholder="请确认密码"
          prefix-icon="el-icon-lock"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="background:#505458;border:none" @click="submitForm(ruleFormRef)"
          >注册</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref} from "vue";
import { ElMessage } from "element-plus"
import type { FormInstance, FormRules } from "element-plus";
import router from '../router/index.js'
import api from "../../api/api.js";

const ruleFormRef = ref<FormInstance>();

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== ruleForm.password) {
    callback(new Error("两次输入不一致!"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  loginName: "",
  loginPhone: "",
  password: "",
  checkPass: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  loginName:[
    {required: true,message:"请输入账号",trigger:'blur'},
    {min:2 ,max:9,message:"长度2-9个字符",trigger:'blur'}
    ],
  loginPhone: [{min:11 ,max:11,message:"长度11个字符",trigger:'blur'}],
  password: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
        api.registerapi(ruleForm).then(res=>{
          if(res.code===1){
            ElMessage.success(res.msg)
            router.push('/')
          }
          else{
            ElMessage.error(res.msg)
          }
        })
    } else {
      ElMessage.error("请正确填写账号和密码");
    }
  })
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const toLogin=()=>{
  router.push('/')
};

</script>
<style scoped>
.register {
  background-position: center;
  height: 100%;
  width: 100%;
  block-size: cover;
  position: fixed;
  margin: 0px;
  padding: 0px;
}
.register-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.register_title {
  margin: 0x auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
