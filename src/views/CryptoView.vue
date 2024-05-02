<template>
    <el-container class="main-container">
        <el-header>SM9密码服务</el-header>
        <el-container>
            <SideBar />
            <el-main><router-view /></el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
.el-header {
    background-color: #d2dbe7;
    color: #333;
    line-height: 60px;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
}
</style>


<script setup lang="ts">
import SideBar from '@/components/Crypto/SideBar.vue';

</script>
