<template>
    <el-aside width="220px" style="height:100vh">
        <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-submenu index="1">
            <template #title>
                <i class="el-icon-menu"></i>
                <span>密码服务</span>
            </template>
            <el-menu-item index="/Crypto/KeyRegist">
                <i class="el-icon-document"></i>
                <span>密钥注册</span>
            </el-menu-item>
            <el-menu-item index="/Crypto/SendFile">
                <i class="el-icon-upload2"></i>
                <span>文件发送</span>
            </el-menu-item>
            <el-menu-item index="/Crypto/RevFile">
                <i class="el-icon-download"></i>
                <span>文件接收</span>
            </el-menu-item>
            <el-menu-item index="/">
                <i class="el-icon-view"></i>
                <span>个人信息</span>
            </el-menu-item>
            <el-menu-item index="/">
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
            </el-menu-item>
            <el-menu-item index="/">
                <i class="el-icon-arrow-left"></i>
                <span>返回</span>
            </el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script lang="ts">
export default {
    name: 'SideBar',
};
</script>