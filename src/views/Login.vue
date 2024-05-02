<template>
  <div class="login">
    <el-form class="login-container" label-position="left" label-width="0px" :model="loginData">
      <h3 class="login_title">
        sm9密钥管理系统
        <el-button @click="toRegister()">去注册</el-button>
      </h3>
      <el-form-item label="">
        <el-input placeholder="账号或手机号" v-model="loginData.loginName" />
      </el-form-item>
      <el-form-item label="">
        <el-input placeholder="密码" v-model="loginData.loginPasswd" show-password />
      </el-form-item>
      <el-form-item style="width=100%">
        <el-button
          @click="subFun"
          style="width:100%;background:#505458;border:none"
          type="primary"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive } from "vue"
import { ElMessage } from "element-plus"
import router from '../router/index.js'
import { loginnn } from '../../api/api.js'
import { login1 } from '../../api/request.js'
export default {
  name: "Login",
  setup() {
    let loginData = reactive({
      loginName: "",
      loginPasswd: "",
    });
    let subFun =()=>{
      if (!loginData.loginName || !loginData.loginPasswd) {
        ElMessage.error("请填写账号和密码");
        return;
      }
      else{
        let loginForm = {
          telephone : loginData.loginName,
          password : loginData.loginPasswd,
        }
        login1(loginForm.telephone,loginForm.password).then(res=>{
           console.log('login',res)
           console.log(res.code)
           if(res.code === 200){
             ElMessage.success(res.msg)
             window.sessionStorage.setItem('token',res.data)
             router.push('/system/users')
           }
           else{
            ElMessage.error(res.msg)
          }
        })
      }
    }
    let toRegister=()=>{
      router.push('/Register')
    }
    return {
      loginData,
      subFun,
      toRegister
    };
  },
};
</script>

<style scoped>
.login {
background-position: center;
height: 100%;
  width: 100%;
  block-size: cover;
  position: fixed;
  margin: 0px;
  padding: 0px;
}
.login-container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title{
  margin: 0x auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
